"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ImageOff, Loader2, Star, Trash2, Upload } from "lucide-react";
import {
  addProjectImageAction,
  removeProjectImageAction,
  setProjectCoverAction,
} from "@/server/actions/projects";

type GalleryImage = { id: string; url: string; alt: string | null };

export function GalleryManager({
  projectId,
  images,
  coverImage,
}: {
  projectId: string;
  images: GalleryImage[];
  coverImage: string | null;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set("folder", "projects");

      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Falha ao enviar a imagem.");
        return;
      }

      const fd = new FormData();
      fd.set("projectId", projectId);
      fd.set("url", data.url);
      await addProjectImageAction(fd);
      startTransition(() => router.refresh());
    } catch {
      setError("Falha ao enviar a imagem.");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove(id: string) {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("projectId", projectId);
    await removeProjectImageAction(fd);
    startTransition(() => router.refresh());
  }

  async function handleSetCover(url: string) {
    const fd = new FormData();
    fd.set("projectId", projectId);
    fd.set("url", url);
    await setProjectCoverAction(fd);
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.url} alt={image.alt ?? ""} className="h-full w-full object-cover" />

            {coverImage === image.url && (
              <span className="absolute left-2 top-2 rounded-full bg-violet-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                Capa
              </span>
            )}

            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              {coverImage !== image.url && (
                <button
                  type="button"
                  onClick={() => handleSetCover(image.url)}
                  disabled={isPending}
                  aria-label="Definir como capa"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <Star className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleRemove(image.id)}
                disabled={isPending}
                aria-label="Remover imagem"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/80 text-white hover:bg-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="col-span-full flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/15 text-zinc-500">
            <div className="flex flex-col items-center gap-2">
              <ImageOff className="h-6 w-6" />
              <span className="text-xs">Nenhuma imagem na galeria</span>
            </div>
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
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.08] disabled:opacity-50"
      >
        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        {uploading ? "Enviando..." : "Adicionar imagem à galeria"}
      </button>

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
