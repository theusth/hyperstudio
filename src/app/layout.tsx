import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seoTitle;
  const description = settings.seoDescription;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${settings.companyName}`,
    },
    description,
    keywords: [
      settings.companyName,
      "agência de desenvolvimento digital",
      "criação de sites",
      "sistemas web",
      "e-commerce",
      "painéis administrativos",
      "automações",
      "landing pages",
    ],
    authors: [{ name: settings.companyName }],
    creator: settings.companyName,
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: SITE_URL,
      siteName: settings.companyName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport = {
  themeColor: "#050508",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-[var(--color-bg)] font-sans text-[var(--color-fg)] antialiased selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
