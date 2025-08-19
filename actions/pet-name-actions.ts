"use server";

import { API_CONFIG } from "@/app/config/api";
import { FILE_CONFIG } from "@/app/config/file";
import { PetNameResponse } from "@/app/types";
import { getTranslations } from "next-intl/server";
import { verifyRecaptcha } from "./recaptcha-actions";

export async function generatePetName(
  formData: FormData
): Promise<PetNameResponse> {
  const t = await getTranslations("PetNameForm.errors");
  const image = formData.get("image") as File;
  const recaptchaToken = formData.get("recaptchaToken") as string;

  // Verify reCAPTCHA
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
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

  // Check file size
  if (image.size > FILE_CONFIG.MAX_SIZE_BYTES) {
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("fileTooLarge", { maxSize: FILE_CONFIG.MAX_SIZE_MB }),
    };
  }

  // Check file type
  if (!FILE_CONFIG.ALLOWED_TYPES.includes(image.type)) {
    return {
      success: false,
      names: [],
      analysis: "",
      message: "",
      error: t("invalidFileType"),
    };
  }

  try {
    // Create FormData for backend request
    const backendFormData = new FormData();
    backendFormData.append("image", image);

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/generate-name`, {
      method: "POST",
      body: backendFormData,
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
