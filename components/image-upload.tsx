"use client";

import { FILE_CONFIG } from "@/app/config/file";
import { validateFileSize, validateFileType } from "@/utils/file-utils";
import { Camera, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

interface ImageUploadProps {
  selectedImage: File | null;
  imagePreview: string | null;
  onImageSelect: (file: File) => void;
}

export default function ImageUpload({
  selectedImage,
  imagePreview,
  onImageSelect,
}: ImageUploadProps) {
  const t = useTranslations("ImageUpload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!validateFileType(file)) {
      alert(t("errors.invalidFileType"));
      return false;
    }

    if (!validateFileSize(file)) {
      alert(t("errors.fileTooLarge", { maxSize: FILE_CONFIG.MAX_SIZE_MB }));
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (validateFile(file)) {
      onImageSelect(file);
    }
  };

  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-4">
        <Camera className="inline-block w-5 h-5 mr-2" />
        {t("label")}
      </label>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragOver
            ? "border-purple-500 bg-purple-50 scale-105"
            : "border-gray-300 hover:border-purple-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt={t("label")}
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleClick}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              {t("changeButton")}
            </button>
          </div>
        ) : (
          <div onClick={handleClick} className="cursor-pointer space-y-4">
            <Upload
              className={`w-16 h-16 mx-auto transition-colors duration-200 ${
                isDragOver ? "text-purple-500" : "text-gray-400"
              }`}
            />
            <div>
              <p
                className={`text-lg font-medium transition-colors duration-200 ${
                  isDragOver ? "text-purple-700" : "text-gray-700"
                }`}
              >
                {isDragOver ? t("dropText") : t("clickText")}
              </p>
              <p className="text-sm text-gray-500">
                {t("fileInfo", {
                  extensions: FILE_CONFIG.ALLOWED_EXTENSIONS.join(", "),
                  maxSize: FILE_CONFIG.MAX_SIZE_MB,
                })}
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
