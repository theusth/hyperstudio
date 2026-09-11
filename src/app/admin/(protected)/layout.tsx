import type { Metadata } from "next";
import { Suspense } from "react";
import { requireSession } from "@/lib/dal";
import { AdminShell } from "@/components/admin/AdminShell";
import { FlashToast } from "@/components/admin/FlashToast";

export const metadata: Metadata = {
  title: {
    default: "Painel",
    template: "%s | Painel Hyper Studio",
  },
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <AdminShell user={{ name: session.name, email: session.email, role: session.role }}>
      <Suspense fallback={null}>
        <FlashToast />
      </Suspense>
      {children}
    </AdminShell>
  );
}
