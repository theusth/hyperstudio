"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { TextField } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateHeroAction, type SettingsFormState } from "@/server/actions/settings";

export function HeroForm({
  defaultValues,
}: {
  defaultValues: {
    heroBadge: string | null;
    heroTitle: string | null;
    heroSubtitle: string | null;
    heroImageUrl: string | null;
    heroPrimaryButtonLabel: string | null;
    heroPrimaryButtonLink: string | null;
    heroSecondaryButtonLabel: string | null;
    heroSecondaryButtonLink: string | null;
    heroHighlight1: string | null;
    heroHighlight2: string | null;
    heroHighlight3: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(updateHeroAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-2xl">
      <TextField label="Badge" name="heroBadge" optional defaultValue={defaultValues.heroBadge ?? ""} />
      <TextField label="Título principal" name="heroTitle" required defaultValue={defaultValues.heroTitle ?? ""} />
      <TextField
        label="Subtítulo"
        name="heroSubtitle"
        required
        defaultValue={defaultValues.heroSubtitle ?? ""}
      />

      <ImageUploadField
        name="heroImageUrl"
        label="Imagem / visual do hero"
        folder="hero"
        defaultValue={defaultValues.heroImageUrl}
        aspect="aspect-video"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Texto do botão primário"
          name="heroPrimaryButtonLabel"
          optional
          defaultValue={defaultValues.heroPrimaryButtonLabel ?? ""}
        />
        <TextField
          label="Link do botão primário"
          name="heroPrimaryButtonLink"
          optional
          defaultValue={defaultValues.heroPrimaryButtonLink ?? ""}
          placeholder="Deixe em branco para usar o WhatsApp"
        />
        <TextField
          label="Texto do botão secundário"
          name="heroSecondaryButtonLabel"
          optional
          defaultValue={defaultValues.heroSecondaryButtonLabel ?? ""}
        />
        <TextField
          label="Link do botão secundário"
          name="heroSecondaryButtonLink"
          optional
          defaultValue={defaultValues.heroSecondaryButtonLink ?? ""}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <TextField label="Destaque 1" name="heroHighlight1" optional defaultValue={defaultValues.heroHighlight1 ?? ""} />
        <TextField label="Destaque 2" name="heroHighlight2" optional defaultValue={defaultValues.heroHighlight2 ?? ""} />
        <TextField label="Destaque 3" name="heroHighlight3" optional defaultValue={defaultValues.heroHighlight3 ?? ""} />
      </div>

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
        {pending ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}
