import clsx from "clsx";

export function GlowBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="absolute left-0 bottom-0 h-[24rem] w-[24rem] -translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/10 blur-[100px]" />
    </div>
  );
}
