"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { TextField, TextAreaField, SelectField, CheckboxField } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { TestimonialFormState } from "@/server/actions/testimonials";

type TestimonialAction = (
  state: TestimonialFormState,
  formData: FormData
) => Promise<TestimonialFormState>;

export function TestimonialForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: TestimonialAction;
  defaultValues?: {
    name: string;
    company: string | null;
    photo: string | null;
    content: string;
    rating: number;
    published: boolean;
  };
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<TestimonialFormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-xl">
      <TextField label="Nome" name="name" required defaultValue={defaultValues?.name} />
      <TextField label="Empresa" name="company" optional defaultValue={defaultValues?.company ?? ""} />

      <ImageUploadField
        name="photo"
        label="Foto"
        folder="testimonials"
        defaultValue={defaultValues?.photo}
        aspect="aspect-square"
      />

      <TextAreaField label="Depoimento" name="content" required defaultValue={defaultValues?.content} />

      <SelectField label="Avaliação" name="rating" defaultValue={String(defaultValues?.rating ?? 5)}>
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n} className="bg-zinc-900">
            {n} {n === 1 ? "estrela" : "estrelas"}
          </option>
        ))}
      </SelectField>

      <CheckboxField
        label="Publicado"
        name="published"
        hint="Depoimentos não publicados ficam ocultos no site."
        defaultChecked={defaultValues?.published ?? false}
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
