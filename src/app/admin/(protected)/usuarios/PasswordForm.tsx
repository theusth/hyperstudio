"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";
import { TextField } from "@/components/admin/fields";
import type { UserFormState } from "@/server/actions/users";

type PasswordAction = (state: UserFormState, formData: FormData) => Promise<UserFormState>;

export function PasswordForm({ action }: { action: PasswordAction }) {
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-md">
      <TextField label="Nova senha" name="password" type="password" required minLength={8} />
      <TextField label="Confirmar nova senha" name="confirmPassword" type="password" required minLength={8} />

      {state?.error && (
        <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08] disabled:opacity-60"
      >
        <KeyRound className="h-4 w-4" />
        {pending ? "Alterando..." : "Alterar senha"}
      </button>
    </form>
  );
}
