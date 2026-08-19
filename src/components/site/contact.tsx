import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead, type LeadTemperature } from "@/lib/leads";
import { isPlausibleEmail } from "@/lib/email";
import { brand } from "@/lib/site";
import { hasWhatsapp, whatsappFromLead, whatsappIntro, whatsappUrl } from "@/lib/whatsapp";

type Result = {
  leadId: string;
  temperature: LeadTemperature;
  nextAction: string;
  wa?: string;
};

export function Contact() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const directWa = whatsappUrl(whatsappIntro());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (payload.name.length < 2) {
      toast.error("Coloca teu nome.");
      return;
    }
    if (!isPlausibleEmail(payload.email)) {
      toast.error("E-mail inválido — usa um endereço real.");
      return;
    }
    if (payload.message.length < 2) {
      toast.error("Conta o que automatizar — uma frase já serve.");
      return;
    }

    setPending(true);
    try {
      const res = await submitLead({ data: payload });
      form.reset();
      setResult({
        leadId: res.leadId,
        temperature: res.temperature,
        nextAction: res.nextAction,
        wa:
          whatsappUrl(
            whatsappFromLead({
              name: payload.name,
              company: payload.company,
              message: payload.message,
            }),
          ) ?? undefined,
      });
      toast.success("Recebi. A gente analisa e responde.");
    } catch (err) {
      const raw = err instanceof Error ? err.message : "";
      const friendly = raw.includes("automatizar")
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
            <h3 className="font-display mt-3 text-xl font-semibold text-fg">
              Classificado como {result.temperature}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{result.nextAction}.</p>
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
            <div className="mt-5">
              <Field label="Empresa" htmlFor="company">
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Opcional"
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
              {directWa ? (
                <Button asChild variant="quiet" className="w-full sm:w-auto">
                  <a href={directWa} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </Button>
              ) : null}
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
