import { TestimonialForm } from "../TestimonialForm";
import { createTestimonialAction } from "@/server/actions/testimonials";

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Novo depoimento</h1>
        <p className="mt-1 text-sm text-zinc-400">Preencha os dados do novo depoimento.</p>
      </div>
      <TestimonialForm action={createTestimonialAction} submitLabel="Criar depoimento" />
    </div>
  );
}
