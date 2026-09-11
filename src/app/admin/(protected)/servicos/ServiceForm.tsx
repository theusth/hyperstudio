"use client";

import { useActionState, useState } from "react";
import { Save } from "lucide-react";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/admin/fields";
import { ICON_NAMES, resolveIcon } from "@/lib/icon-map";
import type { ServiceFormState } from "@/server/actions/services";

type ServiceAction = (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;

export function ServiceForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: ServiceAction;
  defaultValues?: { title: string; description: string; icon: string; active: boolean };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<ServiceFormState, FormData>(action, null);
  const [icon, setIcon] = useState(defaultValues?.icon ?? ICON_NAMES[0]);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-xl">
      <TextField
        label="Nome do serviço"
        name="title"
        required
        defaultValue={defaultValues?.title}
        placeholder="Ex: Sites Institucionais"
      />
      <TextAreaField
        label="Descrição"
        name="description"
        required
        defaultValue={defaultValues?.description}
        placeholder="Uma frase curta explicando o serviço"
      />

      <SelectField label="Ícone" name="icon" value={icon} onChange={(e) => setIcon(e.target.value)}>
        {ICON_NAMES.map((name) => (
          <option key={name} value={name} className="bg-zinc-900">
            {name}
          </option>
        ))}
      </SelectField>

      <IconPreview icon={icon} />

      <CheckboxField
        label="Serviço ativo"
        name="active"
        hint="Serviços inativos não aparecem no site."
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

function IconPreview({ icon }: { icon?: string }) {
  // resolveIcon always returns a reference from the static ICON_LIBRARY map, never a newly
  // created component, so selecting it during render is safe despite the lint heuristic below.
  const Icon = resolveIcon(icon);
  return (
    <div className="flex items-center gap-2 text-xs text-zinc-500">
      <span>Pré-visualização:</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-violet-500/15 to-blue-500/15 text-violet-300">
        {/* eslint-disable-next-line react-hooks/static-components */}
        <Icon className="h-4 w-4" />
      </span>
    </div>
  );
}
