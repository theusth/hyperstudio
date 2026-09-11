import { MessageCircle, ScanSearch, Scale, ShoppingBag } from "lucide-react";
import type { ProjectMockup as ProjectMockupType } from "@/data/projects";

const iconByMockup = {
  ecommerce: ShoppingBag,
  leads: MessageCircle,
  juridico: Scale,
} as const;

export function ProjectMockup({ type }: { type: ProjectMockupType }) {
  const Icon = iconByMockup[type];

  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/40 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
        <div className="ml-3 h-4 flex-1 max-w-48 rounded-full bg-white/[0.06]" />
      </div>

      <div className="relative flex h-[calc(100%-2.5rem)] flex-col justify-center gap-3 p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300">
            <Icon className="h-4 w-4" />
          </div>
          <div className="h-2.5 w-24 rounded-full bg-white/15" />
        </div>

        {type === "ecommerce" && (
          <div className="mt-2 grid grid-cols-3 gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                <div className="aspect-square w-full rounded-md bg-gradient-to-br from-violet-500/25 to-blue-500/10" />
                <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                <div className="h-1.5 w-1/2 rounded-full bg-emerald-400/40" />
              </div>
            ))}
          </div>
        )}

        {type === "leads" && (
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <div className="h-2.5 w-full rounded-full bg-white/15" />
              <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
              <div className="h-2.5 w-3/5 rounded-full bg-white/10" />
              <div className="mt-4 h-8 w-32 rounded-full bg-gradient-to-r from-violet-500/70 to-blue-500/70" />
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="h-6 w-full rounded-md bg-white/[0.06]" />
              <div className="h-6 w-full rounded-md bg-white/[0.06]" />
              <div className="h-6 w-full rounded-md bg-white/[0.06]" />
              <div className="h-6 w-full rounded-md bg-gradient-to-r from-emerald-500/40 to-emerald-400/20" />
            </div>
          </div>
        )}

        {type === "juridico" && (
          <div className="mt-2 space-y-3">
            <div className="h-3 w-2/3 rounded-full bg-white/20" />
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="h-2 w-5/6 rounded-full bg-white/10" />
            <div className="flex gap-2 pt-2">
              <ScanSearch className="h-4 w-4 text-violet-300" />
              <div className="h-2 w-40 rounded-full bg-white/10" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
