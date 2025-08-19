export const RECAPTCHA_CONFIG = {
  SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  ACTION_GENERATE: "generate_pet_name",
} as const;
