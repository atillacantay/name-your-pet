import { config } from "@/config";
import { ImageToTextResponse } from "@/types";
import { getFallbackNames } from "../utils/prompt-utils";

export class AiService {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = `${config.cloudflare.apiUrl}/${config.cloudflare.accountId}/ai/run`;
    this.headers = {
      Authorization: `Bearer ${config.cloudflare.apiToken}`,
      "Content-Type": "application/json",
    };
  }

  async analyzeImage(file: File): Promise<string> {
    try {
      const buffer = await file.arrayBuffer();
      const response = await fetch(
        `${this.baseUrl}/${config.models.imageToText}`,
        {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({
            image: [...new Uint8Array(buffer)],
            prompt: config.prompts.imageAnalysis,
            max_tokens: 500,
          }),
        }
      );

      const result = (await response.json()) as ImageToTextResponse;
      if (!result.success) {
        throw new Error(
          `Image analysis failed: ${
            result.errors?.[0]?.message || "Unknown error"
          })`
        );
      }

      return (
        result.result?.description ||
        result.result?.text ||
        config.fallbacks.description
      );
    } catch (error) {
      console.error("Image analysis failed:", error);
      return config.fallbacks.description;
    }
  }

  parseNames(text: string): string[] {
    // Clean up the text by removing markdown formatting and common prefixes
    const cleanText = text
      .replace(/\*\*/g, "") // Remove bold markdown
      .replace(/\*/g, "") // Remove italic markdown
      .replace(/`/g, "") // Remove backticks
      .replace(/^(OUTPUT:|Names:|Result:)/i, "") // Remove common prefixes
      .trim();

    // Split by newlines and take only the first line (remove explanations/notes)
    const firstLine = cleanText.split("\n")[0].trim();

    // Remove any parenthetical explanations or notes that might be on the same line
    const namesOnly = firstLine
      .replace(/\(.*?\)/g, "") // Remove anything in parentheses
      .replace(/\[.*?\]/g, "") // Remove anything in square brackets
      .replace(/\s*-\s*.*$/, "") // Remove everything after a dash
      .replace(/\s*:\s*.*$/, "") // Remove everything after a colon
      .replace(/\s*\.\s*.*$/, "") // Remove everything after a period followed by text
      .trim();

    return namesOnly
      .split(",")
      .map((name: string) => name.trim())
      .filter(
        (name: string) =>
          name.length > 1 &&
          name.length < 20 &&
          /^[a-zA-ZÀ-ÿ\u0100-\u017F\u4e00-\u9fff\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u1E00-\u1EFF]+$/.test(
            name
          )
      );
  }

  async generatePetNames(
    description: string,
    locale: string
  ): Promise<string[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${config.models.textGeneration}`,
        {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: config.prompts.nameGeneration(description, locale),
              },
            ],
            ...config.textGenerationParams,
          }),
        }
      );

      const result = await response.json();
      const text = result.result?.response || "";
      console.info(result.result);
      const names = this.parseNames(text);

      return names.length >= 2
        ? names.slice(0, config.namesPerGeneration)
        : getFallbackNames(locale);
    } catch (error) {
      console.error("Name generation failed:", error);
      return getFallbackNames(locale);
    }
  }

  async generateNamesFromImage(
    file: File,
    locale: string
  ): Promise<{ names: string[] }> {
    const description = await this.analyzeImage(file);
    const names = await this.generatePetNames(description, locale);
    return { names };
  }
}
