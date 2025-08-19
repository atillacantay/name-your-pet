export const FILE_CONFIG = {
  MAX_SIZE_MB: parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || "10"),
  MAX_SIZE_BYTES:
    parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || "10") * 1024 * 1024,
  ALLOWED_TYPES: (
    process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES ||
    "image/jpeg,image/png,image/webp"
  ).split(","),
  ALLOWED_EXTENSIONS: (
    process.env.NEXT_PUBLIC_ALLOWED_FILE_EXTENSIONS || "PNG,JPG,JPEG,WEBP"
  ).split(","),
} as const;
