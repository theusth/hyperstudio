import Link from "next/link";
import { ArrowDown, ArrowUp, Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { resolveIcon } from "@/lib/icon-map";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import {
  deleteTechnologyAction,
  moveTechnologyAction,
  toggleTechnologyActiveAction,
} from "@/server/actions/technologies";

export const dynamic = "force-dynamic";

export default async function AdminTechnologiesPage() {
  const technologies = await prisma.technology.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Tecnologias</h1>
          <p className="mt-1 text-sm text-zinc-400">Gerencie as tecnologias exibidas no site.</p>
        </div>
        <Link
          href="/admin/tecnologias/novo"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Nova tecnologia
        </Link>
      </div>

      {technologies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-sm text-zinc-400">Nenhuma tecnologia cadastrada ainda.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {technologies.map((tech, index) => {
            const Icon = resolveIcon(tech.icon);
            return (
              <div
                key={tech.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-white">{tech.name}</p>
                    <p className="text-sm text-zinc-500">{tech.category}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      tech.active ? "bg-emerald-400/10 text-emerald-300" : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {tech.active ? "Ativa" : "Inativa"}
                  </span>

                  <form action={moveTechnologyAction}>
                    <input type="hidden" name="id" value={tech.id} />
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
                  <form action={moveTechnologyAction}>
                    <input type="hidden" name="id" value={tech.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={index === technologies.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white disabled:opacity-30"
                      aria-label="Mover para baixo"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </form>

                  <form action={toggleTechnologyActiveAction}>
                    <input type="hidden" name="id" value={tech.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.05]"
                    >
                      {tech.active ? "Desativar" : "Ativar"}
                    </button>
                  </form>

                  <Link
                    href={`/admin/tecnologias/${tech.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                    aria-label="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  <form action={deleteTechnologyAction}>
                    <input type="hidden" name="id" value={tech.id} />
                    <ConfirmSubmitButton
                      title="Excluir tecnologia?"
                      description={`"${tech.name}" será removida permanentemente.`}
                      className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-400/10"
                    >
                      Excluir
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
