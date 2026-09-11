"use client";

import { useRef, useState } from "react";
import { ImageOff, Loader2, Upload } from "lucide-react";

export function ImageUploadField({
  name,
  label,
  folder,
  defaultValue,
  aspect = "aspect-video",
}: {
  name: string;
  label: string;
  folder: "projects" | "hero" | "services" | "testimonials" | "settings";
  defaultValue?: string | null;
  aspect?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      formData.set("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Falha ao enviar a imagem.");
        setPreview(url);
        return;
      }

      setUrl(data.url);
      setPreview(data.url);
    } catch {
      setError("Falha ao enviar a imagem.");
      setPreview(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input type="hidden" name={name} value={url} />

      <div
        className={`relative flex ${aspect} w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-white/[0.02]`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <ImageOff className="h-6 w-6" />
            <span className="text-xs">Nenhuma imagem</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08] disabled:opacity-50"
      >
        <Upload className="h-3.5 w-3.5" />
        {preview ? "Trocar imagem" : "Enviar imagem"}
      </button>

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
