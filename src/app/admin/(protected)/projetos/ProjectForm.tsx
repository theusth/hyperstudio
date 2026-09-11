"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/fields";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { ProjectFormState } from "@/server/actions/projects";

type ProjectAction = (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;

export type ProjectDefaultValues = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string | null;
  projectUrl: string | null;
  technologies: string;
  client: string | null;
  projectDate: string;
  featured: boolean;
  published: boolean;
};

export function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: ProjectAction;
  defaultValues?: ProjectDefaultValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-2xl">
      <TextField label="Nome do projeto" name="name" required defaultValue={defaultValues?.name} />
      <TextField
        label="Slug"
        name="slug"
        optional
        defaultValue={defaultValues?.slug}
        placeholder="gerado automaticamente a partir do nome, se deixado em branco"
        hint="Usado como identificador único do projeto. Ex: sl-imports"
      />
      <TextField
        label="Categoria"
        name="category"
        required
        defaultValue={defaultValues?.category}
        placeholder="Ex: E-commerce"
      />
      <TextAreaField
        label="Descrição curta"
        name="shortDescription"
        required
        defaultValue={defaultValues?.shortDescription}
        hint="Exibida no card do projeto na página inicial."
      />
      <TextAreaField
        label="Descrição completa"
        name="fullDescription"
        required
        rows={6}
        defaultValue={defaultValues?.fullDescription}
      />

      <ImageUploadField
        name="coverImage"
        label="Imagem de capa"
        folder="projects"
        defaultValue={defaultValues?.coverImage}
      />

      <TextField
        label="URL do projeto"
        name="projectUrl"
        optional
        type="url"
        defaultValue={defaultValues?.projectUrl ?? ""}
        placeholder="https://..."
      />
      <TextField
        label="Tecnologias"
        name="technologies"
        optional
        defaultValue={defaultValues?.technologies}
        placeholder="Next.js, Tailwind CSS, Prisma"
        hint="Separe por vírgulas."
      />
      <TextField label="Cliente" name="client" optional defaultValue={defaultValues?.client ?? ""} />
      <TextField
        label="Data do projeto"
        name="projectDate"
        optional
        type="date"
        defaultValue={defaultValues?.projectDate}
      />

      <CheckboxField
        label="Projeto em destaque"
        name="featured"
        hint="Destaques podem receber posição especial no site."
        defaultChecked={defaultValues?.featured ?? false}
      />
      <CheckboxField
        label="Publicado"
        name="published"
        hint="Projetos não publicados ficam ocultos no site."
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
