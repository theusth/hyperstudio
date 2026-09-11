"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { createLeadAction } from "@/server/actions/leads";

const projectTypes = [
  "Site institucional",
  "Landing page",
  "E-commerce",
  "Sistema web",
  "Painel administrativo",
  "CRM",
  "Automação / Integração",
  "Outro",
];

type FormState = {
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
  tipoProjeto: string;
  mensagem: string;
};

const initialState: FormState = {
  nome: "",
  empresa: "",
  whatsapp: "",
  email: "",
  tipoProjeto: "",
  mensagem: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.nome.trim()) errors.nome = "Informe o seu nome.";
  if (!values.whatsapp.trim()) errors.whatsapp = "Informe um número de WhatsApp.";
  else if (values.whatsapp.replace(/\D/g, "").length < 10)
    errors.whatsapp = "Informe um WhatsApp válido com DDD.";
  if (!values.email.trim()) errors.email = "Informe o seu e-mail.";
  else if (!EMAIL_REGEX.test(values.email)) errors.email = "Informe um e-mail válido.";
  if (!values.tipoProjeto) errors.tipoProjeto = "Selecione o tipo de projeto.";
  if (!values.mensagem.trim()) errors.mensagem = "Conte um pouco sobre o seu projeto.";

  return errors;
}

function buildMessage(values: FormState, companyName: string) {
  const lines = [
    `Olá! Vim pelo site da ${companyName} e gostaria de solicitar um orçamento.`,
    "",
    `Nome: ${values.nome}`,
  ];
  if (values.empresa.trim()) lines.push(`Empresa: ${values.empresa}`);
  lines.push(`WhatsApp: ${values.whatsapp}`);
  lines.push(`E-mail: ${values.email}`);
  lines.push(`Tipo de projeto: ${values.tipoProjeto}`);
  lines.push("", `Mensagem: ${values.mensagem}`);
  return lines.join("\n");
}

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.05]";

export function Contact({
  whatsapp,
  whatsappDisplay,
  whatsappLink,
  companyName,
}: {
  whatsapp: string;
  whatsappDisplay: string;
  whatsappLink: string;
  companyName: string;
}) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitting(true);
    try {
      await createLeadAction({
        name: values.nome,
        company: values.empresa,
        whatsapp: values.whatsapp,
        email: values.email,
        projectType: values.tipoProjeto,
        message: values.mensagem,
      });
    } finally {
      setSubmitting(false);
    }

    const digits = whatsapp.replace(/\D/g, "");
    const link = `https://wa.me/${digits}?text=${encodeURIComponent(buildMessage(values, companyName))}`;
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Contato"
            title="Vamos conversar sobre o seu projeto"
            description="Preencha o formulário ou fale diretamente pelo WhatsApp — o que for mais rápido para você."
          />
          <Reveal delay={0.15}>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-zinc-200 transition-colors hover:border-violet-400/30 hover:bg-white/[0.05]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-white">Fale pelo WhatsApp</span>
                <span className="text-zinc-400">{whatsappDisplay}</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome" error={errors.nome}>
                <input
                  className={inputClasses}
                  value={values.nome}
                  onChange={(e) => update("nome", e.target.value)}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                />
              </Field>
              <Field label="Empresa" optional>
                <input
                  className={inputClasses}
                  value={values.empresa}
                  onChange={(e) => update("empresa", e.target.value)}
                  placeholder="Nome da sua empresa"
                  autoComplete="organization"
                />
              </Field>
              <Field label="WhatsApp" error={errors.whatsapp}>
                <input
                  className={inputClasses}
                  value={values.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="(35) 90000-0000"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </Field>
              <Field label="E-mail" error={errors.email}>
                <input
                  className={inputClasses}
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                />
              </Field>
            </div>

            <Field label="Tipo de projeto" error={errors.tipoProjeto}>
              <select
                className={inputClasses}
                value={values.tipoProjeto}
                onChange={(e) => update("tipoProjeto", e.target.value)}
              >
                <option value="" disabled className="bg-zinc-900">
                  Selecione uma opção
                </option>
                {projectTypes.map((type) => (
                  <option key={type} value={type} className="bg-zinc-900">
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Mensagem" error={errors.mensagem}>
              <textarea
                className={inputClasses}
                value={values.mensagem}
                onChange={(e) => update("mensagem", e.target.value)}
                placeholder="Conte um pouco sobre o seu projeto e objetivos"
                rows={5}
              />
            </Field>

            <Button type="submit" disabled={submitting} className="mt-2 w-full sm:w-fit">
              {submitting ? "Enviando..." : "Enviar mensagem"}
              <Send className="h-4 w-4" />
            </Button>

            {submitted && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Tudo certo! Abrimos o WhatsApp com a sua mensagem pronta para enviar.
              </div>
            )}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-300">
        {label}
        {optional && <span className="ml-1 text-zinc-500">(opcional)</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
