import { AiService } from "./ai-service";

export const generateNames = async (
  image: File,
  locale: string
): Promise<string[]> => {
  if (!image || !locale) {
    throw new Error("Image and locale are required");
  }

  const aiService = new AiService();

  try {
    const { names } = await aiService.generateNamesFromImage(image, locale);
    return names;
  } catch (error) {
    throw new Error(
      `Failed to generate names: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
