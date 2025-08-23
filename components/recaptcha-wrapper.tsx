"use client";

import { config } from "@/config";
import Script from "next/script";

export default function RecaptchaWrapper() {
  const siteKey = config.recaptchaSiteKey;

  if (!siteKey) {
    return null;
  }

  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="lazyOnload"
    />
  );
}

export const executeRecaptcha = async (
  action = "submit"
): Promise<string | null> => {
  const siteKey = config.recaptchaSiteKey;

  if (!siteKey || !window.grecaptcha) {
    return null;
  }

  try {
    return await window.grecaptcha.execute(siteKey, { action });
  } catch (error) {
    console.error("reCAPTCHA failed:", error);
    return null;
  }
};
