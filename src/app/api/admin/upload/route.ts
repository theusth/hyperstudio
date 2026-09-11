import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import { getSession } from "@/lib/dal";

const ALLOWED_FOLDERS = ["projects", "hero", "services", "testimonials", "settings"] as const;
type Folder = (typeof ALLOWED_FOLDERS)[number];

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_DIMENSION = 1920;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folderInput = String(formData.get("folder") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  if (!ALLOWED_FOLDERS.includes(folderInput as Folder)) {
    return NextResponse.json({ error: "Categoria de upload inválida." }, { status: 400 });
  }
  const folder = folderInput as Folder;

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Apenas imagens são permitidas." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Imagem maior que 8MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  let optimized: Buffer;
  try {
    optimized = await sharp(buffer)
      .rotate()
      .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Não foi possível processar essa imagem." }, { status: 400 });
  }

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.webp`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), optimized);

  return NextResponse.json({ url: `/uploads/${folder}/${filename}` });
}
