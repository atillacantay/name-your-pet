"use client";

import { setCookiesLocale } from "@/actions/get-locale";
import { locales } from "@/i18n/config";
import { trackLocaleChange } from "@/utils/gtm-events";
import { ChevronDown, Globe } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function handleValueChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = event.target.value as Locale;

    startTransition(async () => {
      trackLocaleChange(locale, newLocale);
      await setCookiesLocale(newLocale);
      window.location.reload();
    });
  }

  return (
    <div className="relative inline-block">
      <label className="sr-only" htmlFor="locale-switcher">
        {t("selectLanguage")}
      </label>
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          id="locale-switcher"
          name="locale-switcher"
          onChange={handleValueChange}
          defaultValue={locale}
          disabled={isPending}
          className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm font-medium text-gray-700 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {locales.map((loc) => (
            <option key={loc} value={loc}>
              {t(loc)}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
      {isPending && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
