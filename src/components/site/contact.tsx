import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/leads";
import { isPlausibleEmail } from "@/lib/email";
import { parseBrMobile } from "@/lib/phone";
import { brand } from "@/lib/site";
import { hasWhatsapp, whatsappFromLead, whatsappIntro, whatsappUrl } from "@/lib/whatsapp";

type Payload = {
  name: string;
  email: string;
  company: string;
  message: string;
  phone: string;
};

type Result = { wa?: string };

function readPayload(form: HTMLFormElement): Payload {
  const fd = new FormData(form);
  return {
    name: String(fd.get("name") ?? "").trim(),
    email: String(fd.get("email") ?? "").trim(),
    company: String(fd.get("company") ?? "").trim(),
    message: String(fd.get("message") ?? "").trim(),
    phone: String(fd.get("phone") ?? "").trim(),
  };
}

function validate(payload: Payload): string | null {
  if (payload.name.length < 2) return "Coloca teu nome.";
  if (!isPlausibleEmail(payload.email)) return "E-mail inválido — usa um endereço real.";
  if (payload.phone && !parseBrMobile(payload.phone)) return "WhatsApp inválido — DDD + 9 dígitos.";
  if (payload.message.length < 2) return "Conta o que automatizar — uma frase já serve.";
  return null;
}

export function Contact() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const directWa = whatsappUrl(whatsappIntro());

  async function capture(form: HTMLFormElement, openWa: boolean) {
    const payload = readPayload(form);
    const error = validate(payload);
    if (error) {
      toast.error(error);
      return;
    }

    setPending(true);
    try {
      await submitLead({ data: payload });
      const wa =
        whatsappUrl(
          whatsappFromLead({
            name: payload.name,
            company: payload.company,
            message: payload.message,
          }),
        ) ?? undefined;
      if (openWa && wa) window.open(wa, "_blank", "noopener,noreferrer");
      form.reset();
      setResult({ wa });
      toast.success("Recebi. A gente analisa e responde.");
    } catch (err) {
      const raw = err instanceof Error ? err.message : "";
      const friendly = raw.includes("WhatsApp")
        ? "WhatsApp inválido — DDD + 9 dígitos."
        : raw.includes("automatizar")
          ? "Conta o que automatizar — uma frase já serve."
          : raw.includes("E-mail")
            ? "E-mail inválido — usa um endereço real."
            : raw.includes("Nome")
              ? "Coloca teu nome."
              : "Não foi possível enviar. Tente de novo em instantes.";
      toast.error(friendly);
    } finally {
      setPending(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void capture(e.currentTarget, false);
  }

  return (
    <section id="contato" className="scroll-mt-24 border-t border-line bg-bg px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-micro text-muted uppercase">Contato</p>
          <h2 className="font-display mt-3 text-title font-semibold text-fg">
            Consultoria gratuita. Sem pitch de 40 slides.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Conte o processo que está te custando tempo. A gente analisa e responde com um recorte
            honesto: o que automatizar primeiro, o que deixar quieto.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-fg-soft">
            <li>A gente olha o processo e te diz o primeiro corte.</li>
            <li>Porto Alegre · remoto no Brasil</li>
            {hasWhatsapp() && directWa ? (
              <li>
                <a
                  className="underline decoration-line underline-offset-4 hover:text-fg"
                  href={directWa}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>
              <a
                className="underline decoration-line underline-offset-4 hover:text-fg"
                href={`mailto:${brand.email}`}
              >
                {brand.email}
              </a>
            </li>
          </ul>
        </div>

        {result ? (
          <div className="rounded-xl border border-line bg-bg-elevated p-6 sm:p-8">
            <p className="text-micro text-muted uppercase">Pedido recebido</p>
            <h3 className="font-display mt-3 text-xl font-semibold text-fg">Recebi.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A gente analisa e te responde. Se quiser, já chama no WhatsApp.
            </p>
            {result.wa ? (
              <Button asChild className="mt-8 w-full sm:w-auto">
                <a href={result.wa} target="_blank" rel="noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            ) : null}
            <Button type="button" variant="quiet" className="mt-6" onClick={() => setResult(null)}>
              Enviar outro
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="rounded-xl border border-line bg-bg-elevated p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome" htmlFor="name">
                <Input id="name" name="name" required autoComplete="name" placeholder="Seu nome" />
              </Field>
              <Field label="E-mail" htmlFor="email">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="voce@empresa.com"
                />
              </Field>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Empresa" htmlFor="company">
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Opcional"
                />
              </Field>
              <Field label="WhatsApp" htmlFor="phone">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="51 99999-9999"
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="O que automatizar" htmlFor="message">
                <Textarea
                  id="message"
                  name="message"
                  required
                  minLength={2}
                  placeholder="Ex.: fechamento financeiro, leads do WhatsApp, estoque…"
                />
              </Field>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-muted">
              Primeira conversa: o que automatizar e o que deixar quieto.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
                {pending ? "Enviando…" : "Enviar pedido"}
              </Button>
              <Button
                type="button"
                variant="quiet"
                className="w-full sm:w-auto"
                disabled={pending}
                onClick={(e) => {
                  const form = e.currentTarget.form;
                  if (form) void capture(form, true);
                }}
              >
                WhatsApp
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
