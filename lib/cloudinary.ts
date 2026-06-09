import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary configuration. Credentials are read from environment variables
 * and validated up front so misconfiguration fails loudly with a clear
 * message instead of a cryptic SDK error at upload time.
 *
 * Required env vars (server-side only — never exposed to the client):
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 * Optional:
 *   CLOUDINARY_UPLOAD_FOLDER  (defaults to "next-app-loan")
 */
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_UPLOAD_FOLDER ?? "next-app-loan";

/** True only when every required credential is present. */
export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD_NAME && API_KEY && API_SECRET);
}

/**
 * Returns a configured Cloudinary SDK instance. Throws a descriptive error
 * when credentials are missing so callers can surface a friendly message.
 */
export function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your environment.",
    );
  }

  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });

  return cloudinary;
}
