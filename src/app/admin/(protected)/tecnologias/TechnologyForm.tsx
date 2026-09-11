"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { TextField, CheckboxField } from "@/components/admin/fields";
import type { TechnologyFormState } from "@/server/actions/technologies";

type TechnologyAction = (state: TechnologyFormState, formData: FormData) => Promise<TechnologyFormState>;

export function TechnologyForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: TechnologyAction;
  defaultValues?: { name: string; category: string; icon: string | null; active: boolean };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<TechnologyFormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-xl">
      <TextField label="Nome" name="name" required defaultValue={defaultValues?.name} placeholder="Ex: Next.js" />
      <TextField
        label="Categoria"
        name="category"
        required
        defaultValue={defaultValues?.category}
        placeholder="Ex: Frontend"
        list="technology-categories"
      />
      <datalist id="technology-categories">
        <option value="Frontend" />
        <option value="Backend & Dados" />
        <option value="Integrações" />
      </datalist>
      <TextField
        label="Ícone (lucide-react)"
        name="icon"
        optional
        defaultValue={defaultValues?.icon ?? ""}
        placeholder="Ex: Code2"
        hint="Nome de um ícone da biblioteca lucide-react. Deixe em branco para usar o ícone padrão."
      />

      <CheckboxField
        label="Tecnologia ativa"
        name="active"
        hint="Tecnologias inativas não aparecem no site."
        defaultChecked={defaultValues?.active ?? true}
      />

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
