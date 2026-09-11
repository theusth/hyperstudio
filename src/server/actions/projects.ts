"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/dal";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(new RegExp("[\u0300-\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const projectSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome do projeto."),
  slug: z.string().trim().optional().default(""),
  category: z.string().trim().min(1, "Informe a categoria."),
  shortDescription: z.string().trim().min(1, "Informe a descrição curta."),
  fullDescription: z.string().trim().min(1, "Informe a descrição completa."),
  coverImage: z.string().trim().optional().default(""),
  projectUrl: z.string().trim().optional().default(""),
  technologies: z.string().trim().optional().default(""),
  client: z.string().trim().optional().default(""),
  projectDate: z.string().trim().optional().default(""),
  featured: z.boolean(),
  published: z.boolean(),
});

function parseForm(formData: FormData) {
  return projectSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    shortDescription: formData.get("shortDescription"),
    fullDescription: formData.get("fullDescription"),
    coverImage: formData.get("coverImage"),
    projectUrl: formData.get("projectUrl"),
    technologies: formData.get("technologies"),
    client: formData.get("client"),
    projectDate: formData.get("projectDate"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  });
}

export type ProjectFormState = { error?: string } | null;

export async function createProjectAction(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAnyRole();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const { projectDate, slug, client, projectUrl, coverImage, ...rest } = parsed.data;
  const finalSlug = slugify(slug || rest.name);

  const existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
  if (existing) {
    return { error: "Já existe um projeto com esse slug. Escolha outro." };
  }

  const count = await prisma.project.count();

  const project = await prisma.project.create({
    data: {
      ...rest,
      slug: finalSlug,
      client: client || null,
      projectUrl: projectUrl || null,
      coverImage: coverImage || null,
      projectDate: projectDate ? new Date(projectDate) : null,
      order: count,
    },
  });

  revalidatePath("/admin/projetos");
  revalidatePath("/");
  redirect(`/admin/projetos/${project.id}?success=Projeto criado. Agora você pode adicionar imagens à galeria.`);
}

export async function updateProjectAction(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAnyRole();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const { projectDate, slug, client, projectUrl, coverImage, ...rest } = parsed.data;
  const finalSlug = slugify(slug || rest.name);

  const existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
  if (existing && existing.id !== id) {
    return { error: "Já existe um projeto com esse slug. Escolha outro." };
  }

  await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      slug: finalSlug,
      client: client || null,
      projectUrl: projectUrl || null,
      coverImage: coverImage || null,
      projectDate: projectDate ? new Date(projectDate) : null,
    },
  });

  revalidatePath("/admin/projetos");
  revalidatePath("/");
  redirect("/admin/projetos?success=Projeto atualizado com sucesso.");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projetos");
  revalidatePath("/");
  redirect("/admin/projetos?success=Projeto excluído.");
}

export async function togglePublishProjectAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const project = await prisma.project.findUniqueOrThrow({ where: { id } });
  await prisma.project.update({ where: { id }, data: { published: !project.published } });
  revalidatePath("/admin/projetos");
  revalidatePath("/");
}

export async function moveProjectAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const direction = String(formData.get("direction"));

  const items = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const index = items.findIndex((s) => s.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (index === -1 || targetIndex < 0 || targetIndex >= items.length) return;

  const current = items[index];
  const target = items[targetIndex];

  await prisma.$transaction([
    prisma.project.update({ where: { id: current.id }, data: { order: target.order } }),
    prisma.project.update({ where: { id: target.id }, data: { order: current.order } }),
  ]);

  revalidatePath("/admin/projetos");
  revalidatePath("/");
}

// Galeria de imagens

export async function addProjectImageAction(formData: FormData) {
  await requireAnyRole();
  const projectId = String(formData.get("projectId"));
  const url = String(formData.get("url"));
  if (!url) return;

  const count = await prisma.projectImage.count({ where: { projectId } });
  await prisma.projectImage.create({ data: { projectId, url, order: count } });

  revalidatePath(`/admin/projetos/${projectId}`);
  revalidatePath("/");
}

export async function removeProjectImageAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const projectId = String(formData.get("projectId"));
  await prisma.projectImage.delete({ where: { id } });
  revalidatePath(`/admin/projetos/${projectId}`);
  revalidatePath("/");
}

export async function setProjectCoverAction(formData: FormData) {
  await requireAnyRole();
  const projectId = String(formData.get("projectId"));
  const url = String(formData.get("url"));
  await prisma.project.update({ where: { id: projectId }, data: { coverImage: url } });
  revalidatePath(`/admin/projetos/${projectId}`);
  revalidatePath("/");
}
