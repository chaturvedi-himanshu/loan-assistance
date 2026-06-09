import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ok, err } from "@/lib/apiHelper";
import { getCloudinary, isCloudinaryConfigured, CLOUDINARY_FOLDER } from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"];

/** Verify the admin JWT cookie (same scheme used by the admin middleware). */
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !process.env.JWT_SECRET) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return err("Unauthorized", 401);
  }

  if (!isCloudinaryConfigured()) {
    return err(
      "Image upload is not configured. Add your Cloudinary credentials to enable uploads, or paste an image URL instead.",
      503,
    );
  }

  let file: File | null = null;
  try {
    const formData = await req.formData();
    const value = formData.get("file");
    if (value instanceof File) file = value;
  } catch {
    return err("Invalid upload request.", 400);
  }

  if (!file) return err("No file provided.", 400);
  if (file.size === 0) return err("The selected file is empty.", 400);
  if (file.size > MAX_BYTES) return err("Image is too large. Maximum size is 8 MB.", 413);
  if (!ALLOWED_TYPES.includes(file.type)) {
    return err("Unsupported file type. Please upload a JPG, PNG, WEBP, GIF, AVIF or SVG image.", 415);
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const cld = getCloudinary();

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cld.uploader.upload_stream(
        { folder: CLOUDINARY_FOLDER, resource_type: "image" },
        (error, uploaded) => {
          if (error || !uploaded) return reject(error ?? new Error("Upload failed"));
          resolve(uploaded);
        },
      );
      stream.end(buffer);
    });

    return ok({ url: result.secure_url, publicId: result.public_id });
  } catch (e) {
    console.error("[upload] Cloudinary upload failed:", e);
    return err("Upload failed. Please try again.", 500);
  }
}
