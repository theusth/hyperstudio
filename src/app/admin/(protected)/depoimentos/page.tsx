import Link from "next/link";
import { Pencil, Plus, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { deleteTestimonialAction, togglePublishTestimonialAction } from "@/server/actions/testimonials";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Depoimentos</h1>
          <p className="mt-1 text-sm text-zinc-400">Gerencie os depoimentos exibidos no site.</p>
        </div>
        <Link
          href="/admin/depoimentos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Novo depoimento
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-sm text-zinc-400">Nenhum depoimento cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-3">
                {testimonial.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={testimonial.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  {testimonial.company && <p className="text-xs text-zinc-500">{testimonial.company}</p>}
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`}
                  />
                ))}
              </div>

              <p className="line-clamp-3 text-sm text-zinc-400">{testimonial.content}</p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    testimonial.published
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-zinc-500/10 text-zinc-400"
                  }`}
                >
                  {testimonial.published ? "Publicado" : "Rascunho"}
                </span>

                <form action={togglePublishTestimonialAction}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.05]"
                  >
                    {testimonial.published ? "Despublicar" : "Publicar"}
                  </button>
                </form>

                <Link
                  href={`/admin/depoimentos/${testimonial.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                  aria-label="Editar"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>

                <form action={deleteTestimonialAction}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <ConfirmSubmitButton
                    title="Excluir depoimento?"
                    description={`O depoimento de "${testimonial.name}" será removido permanentemente.`}
                    className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-400/10"
                  >
                    Excluir
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
