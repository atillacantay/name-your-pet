import { getCookiesLocale } from "@/actions/get-locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getCookiesLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
