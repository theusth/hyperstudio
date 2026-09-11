import { ImageIcon } from "lucide-react";

export function ProjectMockup({ label }: { label?: string }) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/40 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-green-400/60" />
        <div className="ml-3 h-4 flex-1 max-w-48 rounded-full bg-white/[0.06]" />
      </div>

      <div className="relative flex h-[calc(100%-2.5rem)] flex-col items-center justify-center gap-3 p-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300">
          <ImageIcon className="h-5 w-5" />
        </div>
        {label && <p className="text-xs text-zinc-500">{label}</p>}
      </div>
    </div>
  );
}
