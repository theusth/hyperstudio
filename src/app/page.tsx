import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Differentiators } from "@/components/sections/Differentiators";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Technologies } from "@/components/sections/Technologies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Cta } from "@/components/sections/Cta";
import { Contact } from "@/components/sections/Contact";
import {
  buildWhatsAppLinkFor,
  getActiveServices,
  getActiveTechnologies,
  getPublishedProjects,
  getPublishedTestimonials,
  getSiteSettings,
} from "@/lib/data";
import { WHATSAPP_DISPLAY } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, services, projects, technologyGroups, testimonials] = await Promise.all([
    getSiteSettings(),
    getActiveServices(),
    getPublishedProjects(),
    getActiveTechnologies(),
    getPublishedTestimonials(),
  ]);

  const whatsappLink = buildWhatsAppLinkFor(settings.whatsapp);
  const primaryButtonHref = settings.heroPrimaryButtonLink || whatsappLink;
  const whatsappDisplay =
    settings.whatsapp === "5535984057883" ? WHATSAPP_DISPLAY : formatWhatsAppDisplay(settings.whatsapp);

  return (
    <>
      <Header whatsappLink={whatsappLink} companyName={settings.companyName} logoUrl={settings.logoUrl} />
      <main>
        <Hero
          badge={settings.heroBadge}
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          imageUrl={settings.heroImageUrl}
          primaryButtonLabel={settings.heroPrimaryButtonLabel}
          primaryButtonHref={primaryButtonHref}
          secondaryButtonLabel={settings.heroSecondaryButtonLabel}
          secondaryButtonHref={settings.heroSecondaryButtonLink}
          highlights={[settings.heroHighlight1, settings.heroHighlight2, settings.heroHighlight3].filter(
            Boolean
          )}
        />
        <Services services={services} />
        <Portfolio projects={projects} whatsapp={settings.whatsapp} />
        <Differentiators />
        <Process />
        <About />
        <Technologies groups={technologyGroups} />
        <Testimonials testimonials={testimonials} />
        <Cta whatsappLink={whatsappLink} companyName={settings.companyName} />
        <Contact
          whatsapp={settings.whatsapp}
          whatsappDisplay={whatsappDisplay}
          whatsappLink={whatsappLink}
          companyName={settings.companyName}
        />
      </main>
      <Footer
        services={services}
        projects={projects}
        whatsappDisplay={whatsappDisplay}
        whatsappLink={whatsappLink}
        companyName={settings.companyName}
        logoUrl={settings.logoUrl}
      />
      <FloatingWhatsApp whatsappLink={whatsappLink} />
    </>
  );
}

function formatWhatsAppDisplay(digits: string) {
  const clean = digits.replace(/\D/g, "");
  if (clean.length !== 13) return `+${clean}`;
  return `+${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 9)}-${clean.slice(9)}`;
}
