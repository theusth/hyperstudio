"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/dal";

const technologySchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da tecnologia."),
  category: z.string().trim().min(1, "Informe a categoria."),
  icon: z.string().trim().optional().default(""),
  active: z.boolean(),
});

function parseForm(formData: FormData) {
  return technologySchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    icon: formData.get("icon"),
    active: formData.get("active") === "on",
  });
}

export type TechnologyFormState = { error?: string } | null;

export async function createTechnologyAction(
  _prevState: TechnologyFormState,
  formData: FormData
): Promise<TechnologyFormState> {
  await requireAnyRole();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const count = await prisma.technology.count();
  await prisma.technology.create({
    data: { ...parsed.data, icon: parsed.data.icon || null, order: count },
  });

  revalidatePath("/admin/tecnologias");
  revalidatePath("/");
  redirect("/admin/tecnologias?success=Tecnologia criada com sucesso.");
}

export async function updateTechnologyAction(
  id: string,
  _prevState: TechnologyFormState,
  formData: FormData
): Promise<TechnologyFormState> {
  await requireAnyRole();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  await prisma.technology.update({
    where: { id },
    data: { ...parsed.data, icon: parsed.data.icon || null },
  });

  revalidatePath("/admin/tecnologias");
  revalidatePath("/");
  redirect("/admin/tecnologias?success=Tecnologia atualizada com sucesso.");
}

export async function deleteTechnologyAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  await prisma.technology.delete({ where: { id } });
  revalidatePath("/admin/tecnologias");
  revalidatePath("/");
  redirect("/admin/tecnologias?success=Tecnologia excluída.");
}

export async function toggleTechnologyActiveAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const tech = await prisma.technology.findUniqueOrThrow({ where: { id } });
  await prisma.technology.update({ where: { id }, data: { active: !tech.active } });
  revalidatePath("/admin/tecnologias");
  revalidatePath("/");
}

export async function moveTechnologyAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const items = await prisma.technology.findMany({ orderBy: { order: "asc" } });
  const index = items.findIndex((s) => s.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || targetIndex < 0 || targetIndex >= items.length) return;

  const current = items[index];
  const target = items[targetIndex];

  await prisma.$transaction([
    prisma.technology.update({ where: { id: current.id }, data: { order: target.order } }),
    prisma.technology.update({ where: { id: target.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/admin/tecnologias");
  revalidatePath("/");
}
