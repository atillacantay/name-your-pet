import { config } from "@/config";
import { getNormalizedLocale } from "./locale-utils";

export function getFallbackNames(
  locale: string = config.defaultLocale
): string[] {
  const normalizedLocale = getNormalizedLocale(locale);
  return config.fallbacks.names[
    normalizedLocale as keyof typeof config.fallbacks.names
  ];
}
