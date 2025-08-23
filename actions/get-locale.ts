"use server";

import { config } from "@/config";
import { type Locale } from "next-intl";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getCookiesLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || config.defaultLocale;
}

export async function setCookiesLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
