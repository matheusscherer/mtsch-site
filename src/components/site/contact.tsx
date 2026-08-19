import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead, type LeadTemperature } from "@/lib/leads";
import { brand } from "@/lib/site";

export function Contact() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{
    temperature: LeadTemperature;
    nextAction: string;
  } | null>(null);

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
    if (!payload.email.includes("@")) {
      toast.error("E-mail inválido.");
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
      setResult({ temperature: res.temperature, nextAction: res.nextAction });
      toast.success(`Lead ${res.temperature}. ${res.nextAction}.`);
    } catch (err) {
      const raw = err instanceof Error ? err.message : "";
      const friendly = raw.includes("automatizar")
        ? "Conta o que automatizar — uma frase já serve."
        : raw.includes("E-mail")
          ? "E-mail inválido."
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
            Conte o processo que está te custando tempo. Respondemos com um recorte honesto: o que
            automatizar primeiro, o que deixar quieto.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-fg-soft">
            <li>Resposta em até 1 dia útil</li>
            <li>Porto Alegre · remoto no Brasil</li>
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
            <Button type="button" className="mt-8" onClick={() => setResult(null)}>
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
            <Button type="submit" className="mt-7 w-full sm:w-auto" disabled={pending}>
              {pending ? "Enviando…" : "Agendar reunião"}
            </Button>
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
