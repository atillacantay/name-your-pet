"use server";

import { defaultLocale } from "@/i18n/config";
import { type Locale } from "next-intl";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getCookiesLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setCookiesLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
