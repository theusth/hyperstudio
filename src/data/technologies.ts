export type TechGroup = {
  category: string;
  items: string[];
};

// Tecnologias que podem ser utilizadas conforme a necessidade de cada projeto.
export const technologyGroups: TechGroup[] = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend & Dados", items: ["Node.js", "PostgreSQL", "Prisma"] },
  { category: "Integrações", items: ["APIs", "Automações", "Cloud / Deploy"] },
];
