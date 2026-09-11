"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/dal";
import type { LeadStatus } from "@/generated/prisma/client";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Informe o seu nome."),
  company: z.string().trim().optional().default(""),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido."),
  email: z.string().trim().email("Informe um e-mail válido."),
  projectType: z.string().trim().min(1, "Selecione o tipo de projeto."),
  message: z.string().trim().min(1, "Conte um pouco sobre o seu projeto."),
});

export type CreateLeadInput = z.infer<typeof leadSchema>;

export async function createLeadAction(input: CreateLeadInput) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: parsed.error.issues[0]?.message };
  }

  const { name, company, whatsapp, email, projectType, message } = parsed.data;

  await prisma.lead.create({
    data: {
      name,
      company: company || null,
      whatsapp,
      email,
      projectType,
      message,
    },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");

  return { success: true as const };
}

export async function updateLeadStatusAction(id: string, status: LeadStatus) {
  await requireAnyRole();
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
