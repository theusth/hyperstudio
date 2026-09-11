"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { TextField } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { updateSettingsAction, type SettingsFormState } from "@/server/actions/settings";

export function SettingsForm({
  defaultValues,
}: {
  defaultValues: {
    companyName: string;
    logoUrl: string | null;
    faviconUrl: string | null;
    whatsapp: string;
    email: string | null;
    instagram: string | null;
    facebook: string | null;
    linkedin: string | null;
    address: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
  };
}) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(
    updateSettingsAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-8 max-w-2xl">
      <section className="flex flex-col gap-5">
        <h2 className="font-display text-lg font-semibold text-white">Empresa</h2>
        <TextField label="Nome da empresa" name="companyName" required defaultValue={defaultValues.companyName} />
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUploadField name="logoUrl" label="Logo" folder="settings" defaultValue={defaultValues.logoUrl} aspect="aspect-square" />
          <ImageUploadField name="faviconUrl" label="Favicon" folder="settings" defaultValue={defaultValues.faviconUrl} aspect="aspect-square" />
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-white/10 pt-8">
        <h2 className="font-display text-lg font-semibold text-white">Contato</h2>
        <TextField label="WhatsApp" name="whatsapp" required defaultValue={defaultValues.whatsapp} hint="Somente números, com DDI e DDD. Ex: 5535984057883" />
        <TextField label="E-mail" name="email" optional type="email" defaultValue={defaultValues.email ?? ""} />
        <TextField label="Endereço" name="address" optional defaultValue={defaultValues.address ?? ""} />
      </section>

      <section className="flex flex-col gap-5 border-t border-white/10 pt-8">
        <h2 className="font-display text-lg font-semibold text-white">Redes sociais</h2>
        <TextField label="Instagram" name="instagram" optional defaultValue={defaultValues.instagram ?? ""} placeholder="https://instagram.com/..." />
        <TextField label="Facebook" name="facebook" optional defaultValue={defaultValues.facebook ?? ""} placeholder="https://facebook.com/..." />
        <TextField label="LinkedIn" name="linkedin" optional defaultValue={defaultValues.linkedin ?? ""} placeholder="https://linkedin.com/..." />
      </section>

      <section className="flex flex-col gap-5 border-t border-white/10 pt-8">
        <h2 className="font-display text-lg font-semibold text-white">SEO</h2>
        <TextField label="Título (SEO)" name="seoTitle" optional defaultValue={defaultValues.seoTitle ?? ""} />
        <TextField label="Descrição (SEO)" name="seoDescription" optional defaultValue={defaultValues.seoDescription ?? ""} />
      </section>

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
        {pending ? "Salvando..." : "Salvar configurações"}
      </button>
    </form>
  );
}
