import Link from "next/link";
import { ArrowDown, ArrowUp, Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { resolveIcon } from "@/lib/icon-map";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { deleteServiceAction, moveServiceAction, toggleServiceActiveAction } from "@/server/actions/services";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Serviços</h1>
          <p className="mt-1 text-sm text-zinc-400">Gerencie os serviços exibidos no site.</p>
        </div>
        <Link
          href="/admin/servicos/novo"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Novo serviço
        </Link>
      </div>

      {services.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {services.map((service, index) => {
            const Icon = resolveIcon(service.icon);
            return (
              <div
                key={service.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium text-white">{service.title}</p>
                    <p className="max-w-md text-sm text-zinc-500">{service.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      service.active
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {service.active ? "Ativo" : "Inativo"}
                  </span>

                  <form action={moveServiceAction}>
                    <input type="hidden" name="id" value={service.id} />
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
                  <form action={moveServiceAction}>
                    <input type="hidden" name="id" value={service.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={index === services.length - 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white disabled:opacity-30"
                      aria-label="Mover para baixo"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </form>

                  <form action={toggleServiceActiveAction}>
                    <input type="hidden" name="id" value={service.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/[0.05]"
                    >
                      {service.active ? "Desativar" : "Ativar"}
                    </button>
                  </form>

                  <Link
                    href={`/admin/servicos/${service.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                    aria-label="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>

                  <form action={deleteServiceAction}>
                    <input type="hidden" name="id" value={service.id} />
                    <ConfirmSubmitButton
                      title="Excluir serviço?"
                      description={`O serviço "${service.title}" será removido permanentemente.`}
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

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
      <p className="text-sm text-zinc-400">Nenhum serviço cadastrado ainda.</p>
      <Link
        href="/admin/servicos/novo"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-4 py-2 text-sm font-medium text-white hover:bg-white/[0.08]"
      >
        <Plus className="h-4 w-4" />
        Criar primeiro serviço
      </Link>
    </div>
  );
}
