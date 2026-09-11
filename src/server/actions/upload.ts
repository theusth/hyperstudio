"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { requireAnyRole } from "@/lib/dal";

export async function deleteUploadedFileAction(url: string | null | undefined) {
  await requireAnyRole();
  if (!url || !url.startsWith("/uploads/")) return;

  try {
    const filePath = path.join(process.cwd(), "public", url);
    await unlink(filePath);
  } catch {
    // Arquivo já pode não existir — não é crítico.
  }
}
