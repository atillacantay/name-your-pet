"use server";

import { PetNameResponse } from "@/app/types";
import { config } from "@/config";
import { generateNames } from "@/lib/generate-name";
import { validateFileSize, validateFileType } from "@/utils/file-utils";
import { getLocale, getTranslations } from "next-intl/server";
import { verifyRecaptcha } from "./recaptcha-actions";

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
