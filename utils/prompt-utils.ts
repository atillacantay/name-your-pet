import { config } from "@/config";
import { getNormalizedLocale } from "./locale-utils";

export function getFallbackNames(
  locale: string = config.defaultLocale
): string[] {
  const normalizedLocale = getNormalizedLocale(locale);
  const fallbackNames =
    config.fallbacks.names[
      normalizedLocale as keyof typeof config.fallbacks.names
    ];

  return fallbackNames.slice(0, config.namesPerGeneration);
}
