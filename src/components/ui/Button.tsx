import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_30px_-8px_rgba(139,92,246,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_10px_40px_-6px_rgba(139,92,246,0.8)] hover:-translate-y-0.5",
  secondary:
    "border border-white/15 bg-white/[0.04] text-white backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/25 hover:-translate-y-0.5",
  ghost: "text-zinc-300 hover:text-white",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
  ...props
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: {
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
