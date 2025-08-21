"use server";

import { API_CONFIG } from "@/app/config/api";
import { FILE_CONFIG } from "@/app/config/file";
import { PetNameResponse } from "@/app/types";
import { validateFileSize, validateFileType } from "@/utils/file-utils";
import { getTranslations } from "next-intl/server";

export async function generatePetName(
  formData: FormData
): Promise<PetNameResponse> {
  const t = await getTranslations("PetNameForm.errors");
  const image = formData.get("image") as File;
  const recaptchaToken = formData.get("recaptchaToken") as string;

  if (!recaptchaToken) {
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("recaptchaFailed"),
    };
  }

  if (!image || image.size === 0) {
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("noImage"),
    };
  }

  if (!validateFileSize(image)) {
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("fileTooLarge", { maxSize: FILE_CONFIG.MAX_SIZE_MB }),
    };
  }

  if (!validateFileType(image)) {
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("invalidFileType"),
    };
  }

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/generate-name`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`);
    }

    const result: PetNameResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error generating pet name:", error);
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("generateFailed"),
    };
  }
}
