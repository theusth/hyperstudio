import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../ServiceForm";
import { updateServiceAction } from "@/server/actions/services";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const boundAction = updateServiceAction.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Editar serviço</h1>
        <p className="mt-1 text-sm text-zinc-400">{service.title}</p>
      </div>
      <ServiceForm
        action={boundAction}
        submitLabel="Salvar alterações"
        defaultValues={{
          title: service.title,
          description: service.description,
          icon: service.icon,
          active: service.active,
        }}
      />
    </div>
  );
}
