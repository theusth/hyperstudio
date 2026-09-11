"use client";

import { useRef, useState, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

export function ConfirmSubmitButton({
  children,
  title = "Tem certeza?",
  description = "Essa ação não pode ser desfeita.",
  className,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={buttonRef} type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{description}</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/[0.08]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.closest("form")?.requestSubmit();
                }}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
