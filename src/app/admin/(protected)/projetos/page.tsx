import Link from "next/link";
import { ArrowDown, ArrowUp, ImageOff, Pencil, Plus, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { deleteProjectAction, moveProjectAction, togglePublishProjectAction } from "@/server/actions/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Projetos</h1>
          <p className="mt-1 text-sm text-zinc-400">Gerencie o portfólio exibido no site.</p>
        </div>
        <Link
          href="/admin/projetos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Novo projeto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-sm text-zinc-400">Nenhum projeto cadastrado ainda.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                  {project.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.coverImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ImageOff className="h-4 w-4 text-zinc-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{project.name}</p>
                    {project.featured && <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                  </div>
                  <p className="text-sm text-zinc-500">{project.category}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    project.published ? "bg-emerald-400/10 text-emerald-300" : "bg-zinc-500/10 text-zinc-400"
                  }`}
                >
                  {project.published ? "Publicado" : "Rascunho"}
                </span>

                <form action={moveProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white disabled:opacity-30"
                    aria-label="Mover para cima"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </form>
                <form action={moveProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={index === projects.length - 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white disabled:opacity-30"
                    aria-label="Mover para baixo"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </form>

                <form action={togglePublishProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.05]"
                  >
                    {project.published ? "Despublicar" : "Publicar"}
                  </button>
                </form>

                <Link
                  href={`/admin/projetos/${project.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                  aria-label="Editar"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>

                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <ConfirmSubmitButton
                    title="Excluir projeto?"
                    description={`O projeto "${project.name}" e suas imagens serão removidos permanentemente.`}
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
