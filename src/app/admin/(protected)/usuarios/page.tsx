import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/dal";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { deleteUserAction } from "@/server/actions/users";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Usuários</h1>
          <p className="mt-1 text-sm text-zinc-400">Gerencie quem tem acesso ao painel administrativo.</p>
        </div>
        <Link
          href="/admin/usuarios/novo"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Novo usuário
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-white">
                  {user.name} {user.id === session.userId && <span className="text-xs text-zinc-500">(você)</span>}
                </p>
                <p className="text-sm text-zinc-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  user.role === "ADMIN" ? "bg-violet-400/10 text-violet-300" : "bg-blue-400/10 text-blue-300"
                }`}
              >
                {user.role === "ADMIN" ? "Administrador" : "Editor"}
              </span>

              <Link
                href={`/admin/usuarios/${user.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
                aria-label="Editar"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Link>

              <form action={deleteUserAction}>
                <input type="hidden" name="id" value={user.id} />
                <ConfirmSubmitButton
                  title="Excluir usuário?"
                  description={`O acesso de "${user.name}" será removido permanentemente.`}
                  className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-400/10 disabled:opacity-30"
                >
                  Excluir
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
