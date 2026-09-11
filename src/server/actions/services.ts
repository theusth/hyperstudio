"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/dal";
import { ICON_NAMES } from "@/lib/icon-map";

const serviceSchema = z.object({
  title: z.string().trim().min(1, "Informe o nome do serviço."),
  description: z.string().trim().min(1, "Informe a descrição."),
  icon: z.enum(ICON_NAMES as [string, ...string[]]),
  active: z.boolean(),
});

function parseServiceForm(formData: FormData) {
  return serviceSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    active: formData.get("active") === "on",
  });
}

export type ServiceFormState = { error?: string } | null;

export async function createServiceAction(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAnyRole();
  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const count = await prisma.service.count();
  await prisma.service.create({ data: { ...parsed.data, order: count } });

  revalidatePath("/admin/servicos");
  revalidatePath("/");
  redirect("/admin/servicos?success=Serviço criado com sucesso.");
}

export async function updateServiceAction(
  id: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAnyRole();
  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.service.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/servicos");
  revalidatePath("/");
  redirect("/admin/servicos?success=Serviço atualizado com sucesso.");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/servicos");
  revalidatePath("/");
  redirect("/admin/servicos?success=Serviço excluído.");
}

export async function toggleServiceActiveAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const service = await prisma.service.findUniqueOrThrow({ where: { id } });
  await prisma.service.update({ where: { id }, data: { active: !service.active } });
  revalidatePath("/admin/servicos");
  revalidatePath("/");
}

export async function moveServiceAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const index = services.findIndex((s) => s.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || targetIndex < 0 || targetIndex >= services.length) return;

  const current = services[index];
  const target = services[targetIndex];

  await prisma.$transaction([
    prisma.service.update({ where: { id: current.id }, data: { order: target.order } }),
    prisma.service.update({ where: { id: target.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/admin/servicos");
  revalidatePath("/");
}
