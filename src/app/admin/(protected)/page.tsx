import Link from "next/link";
import { FolderKanban, FileCheck2, FileClock, Sparkles, Users, MessageSquareQuote } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  const [
    totalProjects,
    publishedProjects,
    draftProjects,
    totalServices,
    totalTestimonials,
    totalLeads,
    newLeads,
    recentLeads,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.project.count({ where: { published: false } }),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NOVO" } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return {
    totalProjects,
    publishedProjects,
    draftProjects,
    totalServices,
    totalTestimonials,
    totalLeads,
    newLeads,
    recentLeads,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total de projetos", value: stats.totalProjects, icon: FolderKanban },
    { label: "Projetos publicados", value: stats.publishedProjects, icon: FileCheck2 },
    { label: "Projetos em rascunho", value: stats.draftProjects, icon: FileClock },
    { label: "Serviços cadastrados", value: stats.totalServices, icon: Sparkles },
    { label: "Depoimentos", value: stats.totalTestimonials, icon: MessageSquareQuote },
    { label: "Leads recebidos", value: stats.totalLeads, icon: Users },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">Visão geral do conteúdo e dos leads do site.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-xs text-zinc-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {stats.newLeads > 0 && (
        <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-5">
          <p className="text-sm text-violet-200">
            Você tem <strong>{stats.newLeads}</strong>{" "}
            {stats.newLeads === 1 ? "lead novo" : "leads novos"} aguardando contato.{" "}
            <Link href="/admin/leads" className="font-semibold underline underline-offset-2">
              Ver leads
            </Link>
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Leads recentes</h2>
          <Link href="/admin/leads" className="text-xs font-medium text-violet-300 hover:text-violet-200">
            Ver todos
          </Link>
        </div>

        {stats.recentLeads.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum lead recebido ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
                  <th className="pb-3 pr-4 font-medium">Nome</th>
                  <th className="pb-3 pr-4 font-medium">Tipo de projeto</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="py-3 pr-4 text-zinc-200">{lead.name}</td>
                    <td className="py-3 pr-4 text-zinc-400">{lead.projectType}</td>
                    <td className="py-3 pr-4 text-zinc-400">{lead.status}</td>
                    <td className="py-3 text-zinc-500">
                      {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(lead.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
