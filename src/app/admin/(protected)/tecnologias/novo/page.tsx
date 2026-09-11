import { TechnologyForm } from "../TechnologyForm";
import { createTechnologyAction } from "@/server/actions/technologies";

export default function NewTechnologyPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Nova tecnologia</h1>
        <p className="mt-1 text-sm text-zinc-400">Preencha os dados da nova tecnologia.</p>
      </div>
      <TechnologyForm action={createTechnologyAction} submitLabel="Criar tecnologia" />
    </div>
  );
}
