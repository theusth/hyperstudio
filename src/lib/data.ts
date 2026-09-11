import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { DEFAULT_WHATSAPP_MESSAGE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const getSiteSettings = cache(async () => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "settings" } });

  return {
    companyName: settings?.companyName ?? SITE_NAME,
    logoUrl: settings?.logoUrl ?? null,
    faviconUrl: settings?.faviconUrl ?? null,
    whatsapp: settings?.whatsapp ?? "5535984057883",
    email: settings?.email ?? null,
    instagram: settings?.instagram ?? null,
    facebook: settings?.facebook ?? null,
    linkedin: settings?.linkedin ?? null,
    address: settings?.address ?? null,
    seoTitle: settings?.seoTitle ?? `${SITE_NAME} — Agência de Desenvolvimento Digital`,
    seoDescription: settings?.seoDescription ?? SITE_DESCRIPTION,
    heroBadge: settings?.heroBadge ?? "Agência de Desenvolvimento Digital",
    heroTitle: settings?.heroTitle ?? "Transformamos ideias em experiências digitais.",
    heroSubtitle:
      settings?.heroSubtitle ??
      "Sites, sistemas e soluções digitais desenvolvidos para empresas que querem crescer, vender mais e se destacar.",
    heroImageUrl: settings?.heroImageUrl ?? null,
    heroPrimaryButtonLabel: settings?.heroPrimaryButtonLabel || "Quero meu projeto",
    heroPrimaryButtonLink: settings?.heroPrimaryButtonLink || "",
    heroSecondaryButtonLabel: settings?.heroSecondaryButtonLabel || "Ver projetos",
    heroSecondaryButtonLink: settings?.heroSecondaryButtonLink || "#projetos",
    heroHighlight1: settings?.heroHighlight1 || "Design premium",
    heroHighlight2: settings?.heroHighlight2 || "Alta performance",
    heroHighlight3: settings?.heroHighlight3 || "Experiência personalizada",
  };
});

export function buildWhatsAppLinkFor(number: string, message: string = DEFAULT_WHATSAPP_MESSAGE) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const getActiveServices = cache(async () => {
  return prisma.service.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
});

export const getPublishedProjects = cache(async () => {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
});

export const getActiveTechnologies = cache(async () => {
  const items = await prisma.technology.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const groups = new Map<string, typeof items>();
  for (const item of items) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }

  return Array.from(groups.entries()).map(([category, technologies]) => ({
    category,
    technologies,
  }));
});

export const getPublishedTestimonials = cache(async () => {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
});
