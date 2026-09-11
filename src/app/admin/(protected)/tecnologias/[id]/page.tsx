import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TechnologyForm } from "../TechnologyForm";
import { updateTechnologyAction } from "@/server/actions/technologies";

export default async function EditTechnologyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const technology = await prisma.technology.findUnique({ where: { id } });
  if (!technology) notFound();

  const boundAction = updateTechnologyAction.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Editar tecnologia</h1>
        <p className="mt-1 text-sm text-zinc-400">{technology.name}</p>
      </div>
      <TechnologyForm
        action={boundAction}
        submitLabel="Salvar alterações"
        defaultValues={{
          name: technology.name,
          category: technology.category,
          icon: technology.icon,
          active: technology.active,
        }}
      />
    </div>
  );
}
