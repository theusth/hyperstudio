import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import type { Role } from "@/generated/prisma/client";
import { decryptSession, getSessionToken, type SessionPayload } from "@/lib/session";

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = await getSessionToken();
  return decryptSession(token);
});

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export class ForbiddenError extends Error {
  constructor(message = "Você não tem permissão para realizar esta ação.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireRole(roles: Role[]): Promise<SessionPayload> {
  const session = await requireSession();
  if (!roles.includes(session.role)) {
    throw new ForbiddenError();
  }
  return session;
}

export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}

export async function requireAnyRole() {
  return requireRole(["ADMIN", "EDITOR"]);
}
