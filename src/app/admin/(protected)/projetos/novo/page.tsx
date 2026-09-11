import { ProjectForm } from "../ProjectForm";
import { createProjectAction } from "@/server/actions/projects";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Novo projeto</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Após salvar, você poderá adicionar imagens à galeria do projeto.
        </p>
      </div>
      <ProjectForm action={createProjectAction} submitLabel="Criar projeto" />
    </div>
  );
}
