"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { TextField, SelectField } from "@/components/admin/fields";
import type { UserFormState } from "@/server/actions/users";

type UserAction = (state: UserFormState, formData: FormData) => Promise<UserFormState>;

export function UserForm({
  action,
  defaultValues,
  submitLabel,
  showPassword = false,
}: {
  action: UserAction;
  defaultValues?: { name: string; email: string; role: "ADMIN" | "EDITOR" };
  submitLabel: string;
  showPassword?: boolean;
}) {
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-md">
      <TextField label="Nome" name="name" required defaultValue={defaultValues?.name} />
      <TextField label="E-mail" name="email" type="email" required defaultValue={defaultValues?.email} />

      {showPassword && (
        <TextField
          label="Senha"
          name="password"
          type="password"
          required
          minLength={8}
          hint="Mínimo de 8 caracteres."
        />
      )}

      <SelectField label="Função" name="role" defaultValue={defaultValues?.role ?? "EDITOR"}>
        <option value="EDITOR" className="bg-zinc-900">
          Editor — gerencia conteúdo
        </option>
        <option value="ADMIN" className="bg-zinc-900">
          Admin — acesso total
        </option>
      </SelectField>

      {state?.error && (
        <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
      >
        <Save className="h-4 w-4" />
        {pending ? "Salvando..." : submitLabel}
      </button>
    </form>
  );
}
