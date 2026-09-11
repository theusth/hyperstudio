import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UserForm } from "../UserForm";
import { PasswordForm } from "../PasswordForm";
import { updateUserAction, changePasswordAction } from "@/server/actions/users";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  const boundUpdate = updateUserAction.bind(null, id);
  const boundPassword = changePasswordAction.bind(null, id);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Editar usuário</h1>
        <p className="mt-1 text-sm text-zinc-400">{user.name}</p>
      </div>

      <UserForm
        action={boundUpdate}
        submitLabel="Salvar alterações"
        defaultValues={{ name: user.name, email: user.email, role: user.role }}
      />

      <div className="max-w-md border-t border-white/10 pt-8">
        <h2 className="font-display text-lg font-semibold text-white">Alterar senha</h2>
        <p className="mt-1 text-sm text-zinc-400">Defina uma nova senha para este usuário.</p>
        <div className="mt-5">
          <PasswordForm action={boundPassword} />
        </div>
      </div>
    </div>
  );
}
