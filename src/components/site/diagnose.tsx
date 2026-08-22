import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Fuel,
  Package,
  Timer,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";

const options = [
  {
    id: "hora-extra",
    title: "Hora extra",
    pain: "Extra alta sem saber se é demanda ou falta de gente",
    deliver: "Causa, custo puro vs faturável e prioridade de ação",
    proof: "Case real: 4.110 h · 55,5% falta de efetivo",
    href: "/hora-extra",
    external: false,
    icon: Timer,
    msg: "Oi Matheus, quero um diagnóstico de hora extra na minha operação.",
  },
  {
    id: "estoque",
    title: "Estoque",
    pain: "Capital parado e ruptura ao mesmo tempo",
    deliver: "Excesso em R$, SKUs críticos e ruptura com demanda",
    proof: "Pipeline aberto em Python + Pandas",
    href: "https://github.com/matheusscherer/diagnostico-estoque",
    external: true,
    icon: Package,
    msg: "Oi Matheus, quero um diagnóstico de estoque (excesso + ruptura).",
  },
  {
    id: "no-show",
    title: "No-show",
    pain: "Agenda fura e a receita não entra",
    deliver: "Receita perdida, ociosidade e onde recuperar",
    proof: "Ranking por horário, canal e profissional",
    href: "https://github.com/matheusscherer/diagnostico-no-show",
    external: true,
    icon: UserX,
    msg: "Oi Matheus, quero um diagnóstico de no-show na agenda.",
  },
  {
    id: "retrabalho",
    title: "Retrabalho",
    pain: "Produz duas vezes e o faturamento não acompanha",
    deliver: "Custo direto, oportunidade, FPY e causa-raiz",
    proof: "Rankings por processo, produto e turno",
    href: "https://github.com/matheusscherer/diagnostico-retrabalho",
    external: true,
    icon: ClipboardList,
    msg: "Oi Matheus, quero um diagnóstico de retrabalho / não-qualidade.",
  },
  {
    id: "rotas",
    title: "Combustível e rotas",
    pain: "Frota roda demais e fica parada sem entregar",
    deliver: "Km extras, custo do desvio e ociosidade",
    proof: "Concentração por veículo, motorista e região",
    href: "https://github.com/matheusscherer/diagnostico-combustivel-rotas",
    external: true,
    icon: Fuel,
    msg: "Oi Matheus, quero um diagnóstico de combustível e rotas.",
  },
] as const;

export function Diagnose() {
  const [selected, setSelected] = useState<(typeof options)[number]["id"]>("hora-extra");
  const current = useMemo(
    () => options.find((o) => o.id === selected) ?? options[0],
    [selected],
  );
  const wa = whatsappUrl(current.msg);

  return (
    <section id="diagnostico" className="scroll-mt-24 border-y border-line bg-bg-elevated px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-micro text-muted uppercase">Oferta</p>
          <h2 className="font-display mt-3 text-title font-semibold text-fg">
            Faça seu diagnóstico
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Escolha a dor. Eu peço a planilha que a operação já tem, devolvo relatório
            com dinheiro e prioridade — e o script em Python quando fizer sentido.
          </p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          {/* Selector */}
          <div className="flex flex-col gap-2 lg:col-span-5">
            {options.map((opt) => {
              const active = opt.id === selected;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                    active
                      ? "border-line-strong bg-bg"
                      : "border-line bg-transparent hover:border-line-strong"
                  }`}
                >
                  <opt.icon
                    className={`mt-0.5 size-4 shrink-0 ${active ? "text-fg" : "text-muted"}`}
                    strokeWidth={1.5}
                  />
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${active ? "text-fg" : "text-fg-soft"}`}>
                      {opt.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{opt.pain}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="flex flex-col rounded-xl border border-line bg-bg p-6 sm:p-8 lg:col-span-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-micro text-muted uppercase">O que você recebe</p>
              <current.icon className="size-5 text-muted" strokeWidth={1.5} />
            </div>
            <h3 className="font-display mt-4 text-2xl font-semibold text-fg">{current.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-soft">{current.deliver}</p>

            <div className="mt-6 rounded-lg border border-line bg-bg-elevated p-4">
              <p className="text-micro text-muted uppercase">Prova</p>
              <p className="mt-2 text-sm text-fg">{current.proof}</p>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-fg">1.</span>
                Você envia a planilha (CSV/Excel) ou um recorte anonimizado
              </li>
              <li className="flex gap-2">
                <span className="text-fg">2.</span>
                Eu devolvo diagnóstico com números e lista de ação
              </li>
              <li className="flex gap-2">
                <span className="text-fg">3.</span>
                Se fizer sentido, automatizo o relatório com Python
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {wa ? (
                <Button asChild size="lg">
                  <a href={wa} target="_blank" rel="noreferrer">
                    Pedir este diagnóstico
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              ) : null}
              {current.external ? (
                <Button asChild size="lg" variant="quiet">
                  <a href={current.href} target="_blank" rel="noreferrer">
                    Ver código
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" variant="quiet">
                  <Link to={current.href}>
                    Ver dashboard do case
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Cases strip */}
        <div className="mt-14">
          <p className="text-micro text-muted uppercase">Cases e diagnósticos</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {options.map((opt) =>
              opt.external ? (
                <a
                  key={opt.id}
                  href={opt.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-line bg-bg p-4 transition-colors hover:border-line-strong"
                >
                  <opt.icon className="size-4 text-muted" strokeWidth={1.5} />
                  <p className="mt-3 text-sm font-medium text-fg">{opt.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{opt.proof}</p>
                </a>
              ) : (
                <Link
                  key={opt.id}
                  to={opt.href}
                  className="group rounded-xl border border-line bg-bg p-4 transition-colors hover:border-line-strong"
                >
                  <opt.icon className="size-4 text-muted" strokeWidth={1.5} />
                  <p className="mt-3 text-sm font-medium text-fg">{opt.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{opt.proof}</p>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
