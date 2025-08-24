"use server";

import { config } from "@/config";
import { generateNames } from "@/lib/generate-name";
import { checkRateLimit } from "@/lib/rate-limit";
import { PetNameResponse } from "@/types";
import { validateFileSize, validateFileType } from "@/utils/file-utils";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getLocale, getTranslations } from "next-intl/server";
import { verifyRecaptcha } from "./recaptcha-actions";

let ratelimit: Ratelimit;

if (config.rateLimit.enabled) {
  const redis = Redis.fromEnv();

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      config.rateLimit.maxRequests,
      `${config.rateLimit.windowMs}ms`
    ),
    analytics: true,
    enableProtection: true,
    ephemeralCache: new Map(),
    prefix: "server-action-ratelimit",
  });
}

export async function generatePetName(
  formData: FormData
): Promise<PetNameResponse> {
  const t = await getTranslations("PetNameForm");
  const image = formData.get("image") as File;
  const recaptchaToken = formData.get("recaptchaToken") as string;
  const locale = await getLocale();

  if (!recaptchaToken) {
    return {
      success: false,
      names: [],
      message: "",
      error: t("errors.recaptchaFailed"),
    };
  }

  const recaptchaVerified = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaVerified) {
    return {
      success: false,
      names: [],
      message: "",
      error: t("errors.recaptchaFailed"),
    };
  }

  if (!image || image.size === 0) {
    return {
      success: false,
      names: [],
      message: "",
      error: t("errors.noImage"),
    };
  }

  if (!validateFileSize(image)) {
    return {
      success: false,
      names: [],
      message: "",
      error: t("errors.fileTooLarge", { maxSize: config.maxFileSizeInMB }),
    };
  }

  if (!validateFileType(image)) {
    return {
      success: false,
      names: [],
      message: "",
      error: t("errors.invalidFileType"),
    };
  }

  try {
    if (config.rateLimit.enabled) {
      const { success } = await checkRateLimit(ratelimit);
      if (!success) {
        return {
          success: false,
          names: [],
          message: "",
          error: t("errors.rateLimited"),
        };
      }
    }

    const backendFormData = new FormData();
    backendFormData.append("image", image);
    const names = await generateNames(image, locale);

    if (names.length === 0) {
      return {
        success: false,
        names: [],
        message: "",
        error: t("errors.generateFailed"),
      };
    }

    return {
      success: true,
      names,
      message: t("successMessage"),
      error: "",
    };
  } catch (error) {
    console.error("Error generating pet name:", error);
    return {
      success: false,
      names: [],
      message: "",
      error: t("errors.generateFailed"),
    };
  }
}
