import { getSiteSettings } from "@/lib/data";
import { HeroForm } from "./HeroForm";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Hero do site</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Edite a primeira dobra da página inicial: título, subtítulo, botões e destaques.
        </p>
      </div>
      <HeroForm defaultValues={settings} />
    </div>
  );
}
