"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { RECAPTCHA_CONFIG } from "../app/config/recaptcha";
import { GeneratedResult } from "../app/types";
import ErrorDisplay from "./error-display";
import ImageUpload from "./image-upload";
import RecaptchaWrapper, { executeRecaptcha } from "./recaptcha-wrapper";
import SubmitButton from "./submit-button";

interface PetNameFormProps {
  onResult: (result: GeneratedResult) => void;
}

export default function PetNameForm({ onResult }: PetNameFormProps) {
  const t = useTranslations("PetNameForm");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedImage) {
      setError(t("errors.noImage"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await executeRecaptcha(RECAPTCHA_CONFIG.ACTION_GENERATE);

      const formData = new FormData();
      formData.append("image", selectedImage);
      if (token) {
        formData.append("recaptchaToken", token);
      }

      // Call the API route directly
      const response = await fetch("/api/generate-name", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        onResult({
          names: result.names,
          analysis: result.analysis,
          message: result.message,
        });
      } else {
        const errorMessage = result.error || t("errors.generateFailed");
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("errors.unexpectedError");
      setError(errorMessage);
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload
          selectedImage={selectedImage}
          imagePreview={imagePreview}
          onImageSelect={handleImageSelect}
        />

        <RecaptchaWrapper />

        <ErrorDisplay error={error} />

        <SubmitButton
          isLoading={isLoading}
          disabled={!selectedImage || isLoading}
        />
      </form>
    </div>
  );
}
