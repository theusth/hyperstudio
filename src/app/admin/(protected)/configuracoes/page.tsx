import { requireAdmin } from "@/lib/dal";
import { getSiteSettings } from "@/lib/data";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Configurações</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Dados institucionais, contato, redes sociais e SEO do site.
        </p>
      </div>
      <SettingsForm defaultValues={settings} />
    </div>
  );
}
