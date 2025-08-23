import { config } from "@/config";

export const validateFileType = (file: File): boolean => {
  return config.allowedMimeTypes.includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  return file.size <= config.maxFileSize;
};
