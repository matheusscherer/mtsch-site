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
  if (!isPlausibleEmail(payload.email)) return "E-mail inválido.";
  if (payload.phone && !parseBrMobile(payload.phone)) return "WhatsApp inválido — DDD + 9 dígitos.";
  if (payload.message.length < 2) return "Uma frase já serve.";
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
      toast.success("Recebi. Te retorno em breve.");
    } catch {
      toast.error("Não foi possível enviar. Tente de novo.");
    } finally {
      setPending(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void capture(e.currentTarget, false);
  }

  return (
    <section id="contato" className="scroll-mt-24 border-t border-line px-5 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs tracking-wide text-muted">Contato</p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Vaga, projeto ou operação
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">
            Porto Alegre · remoto · {" "}
            {hasWhatsapp() && directWa ? (
              <a className="text-fg-soft underline underline-offset-4 hover:text-fg" href={directWa} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            ) : null}
            {" · "}
            <a className="text-fg-soft underline underline-offset-4 hover:text-fg" href={`mailto:${brand.email}`}>
              E-mail
            </a>
          </p>
        </div>

        {result ? (
          <div className="mt-8 rounded-2xl border border-line bg-bg-elevated p-6 text-center">
            <p className="font-display text-lg font-semibold text-fg">Recebi.</p>
            <p className="mt-2 text-sm text-muted">Te retorno em breve.</p>
            {result.wa ? (
              <Button asChild className="mt-5">
                <a href={result.wa} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            ) : null}
            <Button type="button" variant="quiet" className="mt-3" onClick={() => setResult(null)}>
              Enviar outro
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-line bg-bg-elevated p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" htmlFor="name">
                <Input id="name" name="name" required autoComplete="name" placeholder="Seu nome" />
              </Field>
              <Field label="E-mail" htmlFor="email">
                <Input id="email" name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com" />
              </Field>
              <Field label="Empresa" htmlFor="company">
                <Input id="company" name="company" autoComplete="organization" placeholder="Opcional" />
              </Field>
              <Field label="WhatsApp" htmlFor="phone">
                <Input id="phone" name="phone" type="tel" inputMode="tel" placeholder="51 99999-9999" />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Mensagem" htmlFor="message">
                <Textarea id="message" name="message" required minLength={2} placeholder="O que precisa olhar." />
              </Field>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
                {pending ? "Enviando…" : "Enviar"}
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

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
