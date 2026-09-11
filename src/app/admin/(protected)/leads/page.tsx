import { prisma } from "@/lib/prisma";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { deleteLeadAction } from "@/server/actions/leads";
import { LeadStatusSelect } from "./LeadStatusSelect";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Leads</h1>
        <p className="mt-1 text-sm text-zinc-400">Contatos recebidos pelo formulário do site.</p>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-sm text-zinc-400">Nenhum lead recebido ainda.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{lead.name}</p>
                  {lead.company && <p className="text-sm text-zinc-500">{lead.company}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <LeadStatusSelect id={lead.id} status={lead.status} />
                  <form action={deleteLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <ConfirmSubmitButton
                      title="Excluir lead?"
                      description={`O lead de "${lead.name}" será removido permanentemente.`}
                      className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-400/10"
                    >
                      Excluir
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-zinc-400 sm:grid-cols-2">
                <p>
                  <span className="text-zinc-500">WhatsApp:</span>{" "}
                  <a
                    href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 hover:text-violet-300"
                  >
                    {lead.whatsapp}
                  </a>
                </p>
                <p>
                  <span className="text-zinc-500">E-mail:</span>{" "}
                  <a href={`mailto:${lead.email}`} className="text-zinc-200 hover:text-violet-300">
                    {lead.email}
                  </a>
                </p>
                <p>
                  <span className="text-zinc-500">Tipo de projeto:</span>{" "}
                  <span className="text-zinc-200">{lead.projectType}</span>
                </p>
                <p>
                  <span className="text-zinc-500">Recebido em:</span>{" "}
                  <span className="text-zinc-200">{dateFormatter.format(lead.createdAt)}</span>
                </p>
              </div>

              <p className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-zinc-300">
                {lead.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
