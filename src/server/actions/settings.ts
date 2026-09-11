"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireAnyRole } from "@/lib/dal";

const heroSchema = z.object({
  heroBadge: z.string().trim().optional().default(""),
  heroTitle: z.string().trim().min(1, "Informe o título principal."),
  heroSubtitle: z.string().trim().min(1, "Informe o subtítulo."),
  heroImageUrl: z.string().trim().optional().default(""),
  heroPrimaryButtonLabel: z.string().trim().optional().default(""),
  heroPrimaryButtonLink: z.string().trim().optional().default(""),
  heroSecondaryButtonLabel: z.string().trim().optional().default(""),
  heroSecondaryButtonLink: z.string().trim().optional().default(""),
  heroHighlight1: z.string().trim().optional().default(""),
  heroHighlight2: z.string().trim().optional().default(""),
  heroHighlight3: z.string().trim().optional().default(""),
});

export type SettingsFormState = { error?: string } | null;

export async function updateHeroAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAnyRole();
  const parsed = heroSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: parsed.data,
    create: { id: "settings", ...parsed.data },
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
  redirect("/admin/hero?success=Hero atualizado com sucesso.");
}

const settingsSchema = z.object({
  companyName: z.string().trim().min(1, "Informe o nome da empresa."),
  logoUrl: z.string().trim().optional().default(""),
  faviconUrl: z.string().trim().optional().default(""),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido."),
  email: z.string().trim().optional().default(""),
  instagram: z.string().trim().optional().default(""),
  facebook: z.string().trim().optional().default(""),
  linkedin: z.string().trim().optional().default(""),
  address: z.string().trim().optional().default(""),
  seoTitle: z.string().trim().optional().default(""),
  seoDescription: z.string().trim().optional().default(""),
});

export async function updateSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: parsed.data,
    create: { id: "settings", ...parsed.data },
  });

  revalidatePath("/admin/configuracoes");
  revalidatePath("/");
  redirect("/admin/configuracoes?success=Configurações atualizadas com sucesso.");
}
