import { ServiceForm } from "../ServiceForm";
import { createServiceAction } from "@/server/actions/services";

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Novo serviço</h1>
        <p className="mt-1 text-sm text-zinc-400">Preencha os dados do novo serviço.</p>
      </div>
      <ServiceForm action={createServiceAction} submitLabel="Criar serviço" />
    </div>
  );
}
