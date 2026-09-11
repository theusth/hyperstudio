import type { Metadata } from "next";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050508] px-6 py-16">
      <GlowBackground />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
      />

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-bold text-white shadow-[0_0_30px_-6px_rgba(139,92,246,0.8)]">
            H
          </span>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
            Painel Hyper Studio
          </h1>
          <p className="text-sm text-zinc-400">Entre com sua conta para gerenciar o site.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
