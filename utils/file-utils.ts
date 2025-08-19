import { FILE_CONFIG } from "@/app/config/file";

export const validateFileType = (file: File): boolean => {
  return FILE_CONFIG.ALLOWED_TYPES.includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  return file.size <= FILE_CONFIG.MAX_SIZE_BYTES;
};
