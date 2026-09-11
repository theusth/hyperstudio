"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Gauge, Fingerprint, Circle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { GlowBackground } from "@/components/ui/GlowBackground";

const indicatorIcons = [Sparkles, Gauge, Fingerprint];

export function Hero({
  badge,
  title,
  subtitle,
  imageUrl,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
  highlights,
}: {
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  highlights: string[];
}) {
  return (
    <section id="inicio" className="relative overflow-hidden pb-24 pt-40 sm:pt-48 lg:pb-32 lg:pt-56">
      <GlowBackground />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="flex flex-col items-start gap-8">
          {badge && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-violet-300/90"
            >
              {badge}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <HighlightedTitle title={title} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-pretty max-w-xl text-lg leading-relaxed text-zinc-400"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <ButtonLink href={primaryButtonHref} target="_blank" rel="noopener noreferrer">
              {primaryButtonLabel}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={secondaryButtonHref} variant="secondary">
              {secondaryButtonLabel}
            </ButtonLink>
          </motion.div>

          {highlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
            >
              {highlights.map((label, index) => {
                const Icon = indicatorIcons[index % indicatorIcons.length];
                return (
                  <div key={label} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon className="h-4 w-4 text-violet-400" />
                    {label}
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto hidden aspect-square w-full max-w-lg sm:block lg:max-w-none"
        >
          {imageUrl ? (
            <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            </div>
          ) : (
            <HeroComposition />
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function HighlightedTitle({ title }: { title: string }) {
  const words = title.trim().split(" ");
  if (words.length <= 2) return <>{title}</>;

  const splitIndex = Math.max(1, words.length - 2);
  const start = words.slice(0, splitIndex).join(" ");
  const end = words.slice(splitIndex).join(" ");

  return (
    <>
      {start}{" "}
      <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
        {end}
      </span>
    </>
  );
}

function HeroComposition() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
          <p className="text-violet-400">
            const <span className="text-blue-300">hyperStudio</span> = {"{"}
          </p>
          <p className="pl-4 text-zinc-400">
            design: <span className="text-emerald-300">&quot;premium&quot;</span>,
          </p>
          <p className="pl-4 text-zinc-400">
            performance: <span className="text-emerald-300">&quot;alta&quot;</span>,
          </p>
          <p className="pl-4 text-zinc-400">
            resultado: <span className="text-emerald-300">&quot;crescimento&quot;</span>,
          </p>
          <p className="text-violet-400">{"}"}</p>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-8 w-48 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] backdrop-blur-xl sm:-left-8"
      >
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-blue-300" />
          <span className="text-xs font-semibold text-white">Performance</span>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 w-[92%] rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-2 top-1/3 w-44 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)] backdrop-blur-xl sm:-right-6"
      >
        <div className="flex items-center gap-2">
          <Circle className="h-3 w-3 fill-emerald-400 text-emerald-400" />
          <span className="text-xs font-semibold text-white">Sistema online</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
          Painel administrativo sincronizado
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 left-1/4 w-40 rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)] backdrop-blur-xl"
      >
        <div className="flex -space-x-2">
          <div className="h-7 w-7 rounded-full border-2 border-black bg-gradient-to-br from-violet-400 to-blue-400" />
          <div className="h-7 w-7 rounded-full border-2 border-black bg-gradient-to-br from-blue-400 to-emerald-400" />
          <div className="h-7 w-7 rounded-full border-2 border-black bg-gradient-to-br from-fuchsia-400 to-violet-400" />
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">UI moderna e responsiva</p>
      </motion.div>
    </div>
  );
}
