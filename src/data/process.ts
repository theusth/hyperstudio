export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Briefing",
    description: "Entendemos o negócio e os objetivos.",
  },
  {
    number: "02",
    title: "Estratégia",
    description: "Definimos estrutura, funcionalidades e experiência.",
  },
  {
    number: "03",
    title: "Design",
    description: "Criamos uma interface moderna e personalizada.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Transformamos o projeto em uma aplicação funcional.",
  },
  {
    number: "05",
    title: "Testes",
    description: "Validamos responsividade, performance e funcionamento.",
  },
  {
    number: "06",
    title: "Entrega",
    description: "Publicamos o projeto e entregamos tudo funcionando.",
  },
];
