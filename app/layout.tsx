import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyper Studio | Criação de Sites e Sistemas",
  description: "A Hyper Studio desenvolve sites e sistemas modernos, personalizados e profissionais para empresas que querem crescer no digital.",
  metadataBase: new URL("https://hyperstudio.com.br"),
  openGraph: {
    title: "Hyper Studio | Criação de Sites e Sistemas",
    description: "Sites e sistemas premium para empresas que querem crescer no digital.",
    url: "https://hyperstudio.com.br",
    siteName: "Hyper Studio",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}