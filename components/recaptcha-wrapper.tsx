"use client";

import { RECAPTCHA_CONFIG } from "@/app/config/recaptcha";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export default function RecaptchaWrapper() {
  const siteKey = RECAPTCHA_CONFIG.SITE_KEY;

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
  action = RECAPTCHA_CONFIG.ACTION_GENERATE
): Promise<string | null> => {
  const siteKey = RECAPTCHA_CONFIG.SITE_KEY;

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
