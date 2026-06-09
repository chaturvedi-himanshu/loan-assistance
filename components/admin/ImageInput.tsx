"use client";

import { useRef, useState, useCallback } from "react";

interface ImageInputProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1.5px solid #cceffa",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

/**
 * Image field offering two ways to set an image: upload a file to Cloudinary
 * (via /api/admin/upload) or paste an existing URL / path. Used by the admin
 * forms wherever an image is accepted.
 */
export default function ImageInput({ value, onChange, placeholder }: ImageInputProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      try {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.success) {
          throw new Error(json?.message ?? `Upload failed (HTTP ${res.status})`);
        }
        onChange(json.data.url as string);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "/images/example.png or https://..."}
        style={INPUT_STYLE}
      />

      {/* Upload drop zone / button */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload an image to Cloudinary"
        onClick={() => !uploading && fileRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !uploading) {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!uploading) handleFiles(e.dataTransfer.files);
        }}
        style={{
          marginTop: 8,
          padding: "12px 14px",
          border: `1.5px dashed ${dragOver ? "#2cbbdf" : "#cceffa"}`,
          borderRadius: 8,
          background: dragOver ? "rgba(44,187,223,0.08)" : "#f8fdff",
          cursor: uploading ? "wait" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          transition: "border-color 150ms ease, background 150ms ease",
          opacity: uploading ? 0.7 : 1,
        }}
      >
        <span
          style={{
            width: 34,
            height: 34,
            flexShrink: 0,
            borderRadius: 8,
            background: "rgba(44,187,223,0.12)",
            color: "#2cbbdf",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          <i className={uploading ? "icofont-spinner" : "icofont-cloud-upload"} aria-hidden="true" />
        </span>
        <span style={{ fontSize: 13, color: "#5a6b78", lineHeight: 1.4 }}>
          {uploading ? (
            "Uploading…"
          ) : (
            <>
              <strong style={{ color: "#2cbbdf" }}>Upload an image</strong> or drag &amp; drop
              <br />
              <span style={{ color: "#9aa9b3", fontSize: 12 }}>JPG, PNG, WEBP, GIF or SVG · max 8 MB</span>
            </>
          )}
        </span>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#e53935" }} role="alert">
          {error}
        </div>
      )}

      {value && (
        <div style={{ marginTop: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="preview"
            style={{ maxWidth: 180, maxHeight: 120, borderRadius: 8, border: "1px solid #eef", objectFit: "cover" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}
