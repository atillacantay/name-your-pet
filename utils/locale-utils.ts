import { config } from "@/config";

export function isValidLocale(locale: string): boolean {
  return config.supportedLocales.includes(locale);
}

export function getNormalizedLocale(locale: string): string {
  return isValidLocale(locale) ? locale : config.defaultLocale;
}
