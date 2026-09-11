import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

const baseInput =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.05]";

function FieldShell({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-300">
        {label}
        {optional && <span className="ml-1 text-zinc-500">(opcional)</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

export function TextField({
  label,
  hint,
  optional,
  className,
  ...props
}: {
  label: string;
  hint?: string;
  optional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell label={label} hint={hint} optional={optional}>
      <input className={clsx(baseInput, className)} {...props} />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  optional,
  className,
  ...props
}: {
  label: string;
  hint?: string;
  optional?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell label={label} hint={hint} optional={optional}>
      <textarea className={clsx(baseInput, "resize-y", className)} rows={4} {...props} />
    </FieldShell>
  );
}

export function SelectField({
  label,
  hint,
  optional,
  className,
  children,
  ...props
}: {
  label: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell label={label} hint={hint} optional={optional}>
      <select className={clsx(baseInput, className)} {...props}>
        {children}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({
  label,
  hint,
  ...props
}: {
  label: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400/50"
        {...props}
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-zinc-200">{label}</span>
        {hint && <span className="text-xs text-zinc-500">{hint}</span>}
      </span>
    </label>
  );
}

export { baseInput };
