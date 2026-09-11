"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatusAction } from "@/server/actions/leads";
import type { LeadStatus } from "@/generated/prisma/client";

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "NOVO", label: "Novo" },
  { value: "EM_CONTATO", label: "Em contato" },
  { value: "NEGOCIACAO", label: "Negociação" },
  { value: "FECHADO", label: "Fechado" },
  { value: "PERDIDO", label: "Perdido" },
];

const STATUS_COLORS: Record<LeadStatus, string> = {
  NOVO: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  EM_CONTATO: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  NEGOCIACAO: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  FECHADO: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  PERDIDO: "border-red-400/30 bg-red-400/10 text-red-300",
};

export function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      value={value}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        setValue(next);
        startTransition(async () => {
          await updateLeadStatusAction(id, next);
          router.refresh();
        });
      }}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium outline-none ${STATUS_COLORS[value]}`}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value} className="bg-zinc-900 text-zinc-200">
          {option.label}
        </option>
      ))}
    </select>
  );
}
