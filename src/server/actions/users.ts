"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { hashPassword } from "@/lib/password";

const roleEnum = z.enum(["ADMIN", "EDITOR"]);

const createUserSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome."),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  role: roleEnum,
});

const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome."),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido."),
  role: roleEnum,
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type UserFormState = { error?: string } | null;

export async function createUserAction(
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireAdmin();
  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: "Já existe um usuário com esse e-mail." };

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      passwordHash,
    },
  });

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios?success=Usuário criado com sucesso.");
}

export async function updateUserAction(
  id: string,
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await requireAdmin();
  const parsed = updateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing && existing.id !== id) return { error: "Já existe um usuário com esse e-mail." };

  if (session.userId === id && parsed.data.role !== "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      return { error: "Você não pode remover o próprio acesso de administrador (é o único admin)." };
    }
  }

  await prisma.user.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios?success=Usuário atualizado com sucesso.");
}

export async function changePasswordAction(
  id: string,
  _prevState: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  await requireAdmin();
  const parsed = passwordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.update({ where: { id }, data: { passwordHash } });

  redirect("/admin/usuarios?success=Senha alterada com sucesso.");
}

export async function deleteUserAction(formData: FormData) {
  const session = await requireAdmin();
  const id = String(formData.get("id"));

  if (session.userId === id) {
    redirect("/admin/usuarios?error=Você não pode excluir a própria conta.");
  }

  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "ADMIN") {
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) {
      redirect("/admin/usuarios?error=Não é possível excluir o único administrador.");
    }
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios?success=Usuário excluído.");
}
