import { UserForm } from "../UserForm";
import { createUserAction } from "@/server/actions/users";

export default function NewUserPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Novo usuário</h1>
        <p className="mt-1 text-sm text-zinc-400">Crie um novo acesso ao painel administrativo.</p>
      </div>
      <UserForm action={createUserAction} submitLabel="Criar usuário" showPassword />
    </div>
  );
}
