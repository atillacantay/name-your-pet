import { ImageToTextResponse } from "@/app/types";
import { config } from "@/config";
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
            max_tokens: 150,
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
    return text
      .split(",")
      .map((name: string) => name.trim())
      .filter((name: string) => name.length > 1 && name.length < 20);
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

      const result = (await response.json()) as any;
      const text = result.result?.response || "";

      const names = this.parseNames(text);

      return names.length >= 3 ? names.slice(0, 3) : getFallbackNames(locale);
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
