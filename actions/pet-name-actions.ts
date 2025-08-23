"use server";

import { API_CONFIG } from "@/app/config/api";
import { FILE_CONFIG } from "@/app/config/file";
import { PetNameResponse } from "@/app/types";
import { validateFileSize, validateFileType } from "@/utils/file-utils";
import { getLocale, getTranslations } from "next-intl/server";

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
      error: t("errors.fileTooLarge", { maxSize: FILE_CONFIG.MAX_SIZE_MB }),
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
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/api/generate-name?locale=${locale}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return {
          success: false,
          names: [],
          message: "",
          error: t("errors.rateLimited"),
        };
      }
      throw new Error(`Backend request failed: ${response.status}`);
    }

    const result: PetNameResponse = await response.json();
    return { ...result, message: t("successMessage") };
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
