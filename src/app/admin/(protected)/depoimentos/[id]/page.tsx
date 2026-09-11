import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonialAction } from "@/server/actions/testimonials";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const boundAction = updateTestimonialAction.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Editar depoimento</h1>
        <p className="mt-1 text-sm text-zinc-400">{testimonial.name}</p>
      </div>
      <TestimonialForm action={boundAction} submitLabel="Salvar alterações" defaultValues={testimonial} />
    </div>
  );
}
