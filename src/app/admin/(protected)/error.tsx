"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function AdminErrorBoundary({ error }: { error: Error & { digest?: string } }) {
  const isForbidden = error.name === "ForbiddenError";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <ShieldAlert className="h-7 w-7" />
      </span>
      <h1 className="font-display text-xl font-semibold text-white">
        {isForbidden ? "Acesso restrito" : "Algo deu errado"}
      </h1>
      <p className="max-w-sm text-sm text-zinc-400">
        {isForbidden
          ? "Você não tem permissão para acessar esta área. Fale com um administrador se precisar de acesso."
          : "Ocorreu um erro inesperado ao carregar esta página."}
      </p>
      <Link
        href="/admin"
        className="mt-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white hover:bg-white/[0.08]"
      >
        Voltar ao dashboard
      </Link>
    </div>
  );
}
