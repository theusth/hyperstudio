import "dotenv/config";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      companyName: "Hyper Studio",
      whatsapp: "5535984057883",
      seoTitle: "Hyper Studio — Agência de Desenvolvimento Digital",
      seoDescription:
        "A Hyper Studio é uma agência de desenvolvimento digital especializada em sites modernos, sistemas web, e-commerce, painéis administrativos, automações e soluções digitais personalizadas.",
      heroBadge: "Agência de Desenvolvimento Digital",
      heroTitle: "Transformamos ideias em experiências digitais.",
      heroSubtitle:
        "Sites, sistemas e soluções digitais desenvolvidos para empresas que querem crescer, vender mais e se destacar.",
      heroPrimaryButtonLabel: "Quero meu projeto",
      heroPrimaryButtonLink: "",
      heroSecondaryButtonLabel: "Ver projetos",
      heroSecondaryButtonLink: "#projetos",
      heroHighlight1: "Design premium",
      heroHighlight2: "Alta performance",
      heroHighlight3: "Experiência personalizada",
    },
  });

  const services = [
    {
      title: "Sites Institucionais",
      icon: "Globe",
      description:
        "Presença digital sólida e profissional, transmitindo credibilidade e autoridade para o seu negócio.",
    },
    {
      title: "Landing Pages",
      icon: "Rocket",
      description:
        "Páginas de alta conversão, criadas para captar leads e transformar visitantes em clientes.",
    },
    {
      title: "E-commerce",
      icon: "ShoppingCart",
      description:
        "Lojas virtuais completas, rápidas e seguras, preparadas para vender todos os dias.",
    },
    {
      title: "Sistemas Web",
      icon: "MonitorSmartphone",
      description:
        "Aplicações sob medida para automatizar processos e resolver as necessidades reais do seu negócio.",
    },
    {
      title: "Painéis Administrativos",
      icon: "LayoutDashboard",
      description:
        "Dashboards intuitivos para gerenciar dados, conteúdos e operações com total controle.",
    },
    {
      title: "CRM",
      icon: "Users",
      description:
        "Ferramentas personalizadas para organizar contatos, funis de vendas e relacionamento com clientes.",
    },
    {
      title: "Automações",
      icon: "Workflow",
      description:
        "Fluxos automatizados que eliminam tarefas repetitivas e aumentam a eficiência da operação.",
    },
    {
      title: "Integrações / API",
      icon: "Plug",
      description:
        "Conexão entre sistemas, plataformas e serviços para que tudo funcione de forma integrada.",
    },
  ];

  for (const [index, service] of services.entries()) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (existing) continue;
    await prisma.service.create({ data: { ...service, order: index } });
  }

  const technologies: { name: string; category: string }[] = [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend & Dados" },
    { name: "PostgreSQL", category: "Backend & Dados" },
    { name: "Prisma", category: "Backend & Dados" },
    { name: "APIs", category: "Integrações" },
    { name: "Automações", category: "Integrações" },
    { name: "Cloud / Deploy", category: "Integrações" },
  ];

  for (const [index, tech] of technologies.entries()) {
    const existing = await prisma.technology.findFirst({ where: { name: tech.name } });
    if (existing) continue;
    await prisma.technology.create({ data: { ...tech, order: index } });
  }

  const projects = [
    {
      name: "SL Imports",
      slug: "sl-imports",
      category: "E-commerce",
      shortDescription:
        "E-commerce premium para venda de iPhones, seminovos, acessórios e captação de clientes pelo WhatsApp.",
      fullDescription:
        "E-commerce premium para venda de iPhones, seminovos, acessórios e captação de clientes pelo WhatsApp.",
    },
    {
      name: "Revê DPVAT Prev",
      slug: "reve-dpvat-prev",
      category: "Institucional & Captação de Leads",
      shortDescription:
        "Plataforma digital com site institucional, captação de leads, WhatsApp e painel administrativo.",
      fullDescription:
        "Plataforma digital com site institucional, captação de leads, WhatsApp e painel administrativo.",
    },
    {
      name: "Site Jurídico",
      slug: "site-juridico",
      category: "Jurídico",
      shortDescription:
        "Experiência digital premium para escritório/empresa jurídica, com foco em credibilidade e geração de contatos.",
      fullDescription:
        "Experiência digital premium para escritório/empresa jurídica, com foco em credibilidade e geração de contatos.",
    },
  ];

  for (const [index, project] of projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: { ...project, published: true, featured: index === 0, order: index },
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "matheuscpff@gmail.com";
  const adminName = process.env.ADMIN_NAME ?? "Matheus";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const generatedPassword = process.env.ADMIN_PASSWORD ?? crypto.randomBytes(9).toString("base64url");
    const passwordHash = await bcrypt.hash(generatedPassword, 12);

    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });

    console.log("\n=====================================================");
    console.log("Usuário administrador criado:");
    console.log(`  E-mail: ${adminEmail}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.log(`  Senha gerada: ${generatedPassword}`);
      console.log("  Guarde essa senha agora — ela não será mostrada novamente.");
      console.log("  Troque-a assim que fizer o primeiro login.");
    } else {
      console.log("  Senha: definida via variável de ambiente ADMIN_PASSWORD.");
    }
    console.log("=====================================================\n");
  } else {
    console.log(`Usuário administrador já existe (${adminEmail}), nada a fazer.`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
