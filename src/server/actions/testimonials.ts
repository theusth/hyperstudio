"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/dal";

const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome."),
  company: z.string().trim().optional().default(""),
  photo: z.string().trim().optional().default(""),
  content: z.string().trim().min(1, "Informe o depoimento."),
  rating: z.coerce.number().int().min(1).max(5),
  published: z.boolean(),
});

function parseForm(formData: FormData) {
  return testimonialSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    photo: formData.get("photo"),
    content: formData.get("content"),
    rating: formData.get("rating"),
    published: formData.get("published") === "on",
  });
}

export type TestimonialFormState = { error?: string } | null;

export async function createTestimonialAction(
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAnyRole();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const count = await prisma.testimonial.count();
  await prisma.testimonial.create({
    data: {
      ...parsed.data,
      company: parsed.data.company || null,
      photo: parsed.data.photo || null,
      order: count,
    },
  });

  revalidatePath("/admin/depoimentos");
  revalidatePath("/");
  redirect("/admin/depoimentos?success=Depoimento criado com sucesso.");
}

export async function updateTestimonialAction(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAnyRole();
  const parsed = parseForm(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  await prisma.testimonial.update({
    where: { id },
    data: {
      ...parsed.data,
      company: parsed.data.company || null,
      photo: parsed.data.photo || null,
    },
  });

  revalidatePath("/admin/depoimentos");
  revalidatePath("/");
  redirect("/admin/depoimentos?success=Depoimento atualizado com sucesso.");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/");
  redirect("/admin/depoimentos?success=Depoimento excluído.");
}

export async function togglePublishTestimonialAction(formData: FormData) {
  await requireAnyRole();
  const id = String(formData.get("id"));
  const testimonial = await prisma.testimonial.findUniqueOrThrow({ where: { id } });
  await prisma.testimonial.update({ where: { id }, data: { published: !testimonial.published } });
  revalidatePath("/admin/depoimentos");
  revalidatePath("/");
}
