"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CheckCircle2, X, XCircle } from "lucide-react";

export function FlashToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const message = success ?? error;

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => dismiss(), 4000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  function dismiss() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("success");
    params.delete("error");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  if (!message) return null;

  const isError = Boolean(error);

  return (
    <div className="fixed right-4 top-4 z-[100] flex max-w-sm items-start gap-3 rounded-xl border border-white/10 bg-zinc-900/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:right-6 sm:top-6">
      {isError ? (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
      )}
      <p className="flex-1 text-sm text-zinc-200">{message}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Fechar"
        className="text-zinc-500 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
