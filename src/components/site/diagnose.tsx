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
import { examples } from "@/lib/diagnostic-examples";
import { whatsappUrl } from "@/lib/whatsapp";

const options = [
  {
    id: "hora-extra" as const,
    title: "Hora extra",
    href: "/hora-extra",
    external: false,
    icon: Timer,
    example: examples.horaExtra,
    msg: "Oi Matheus, quero um diagnóstico de hora extra na minha operação.",
  },
  {
    id: "estoque" as const,
    title: "Estoque",
    href: "https://github.com/matheusscherer/diagnostico-estoque",
    external: true,
    icon: Package,
    example: examples.estoque,
    msg: "Oi Matheus, quero um diagnóstico de estoque (excesso + ruptura).",
  },
  {
    id: "no-show" as const,
    title: "No-show",
    href: "https://github.com/matheusscherer/diagnostico-no-show",
    external: true,
    icon: UserX,
    example: examples.noShow,
    msg: "Oi Matheus, quero um diagnóstico de no-show na agenda.",
  },
  {
    id: "retrabalho" as const,
    title: "Retrabalho",
    href: "https://github.com/matheusscherer/diagnostico-retrabalho",
    external: true,
    icon: ClipboardList,
    example: examples.retrabalho,
    msg: "Oi Matheus, quero um diagnóstico de retrabalho / não-qualidade.",
  },
  {
    id: "rotas" as const,
    title: "Rotas",
    href: "https://github.com/matheusscherer/diagnostico-combustivel-rotas",
    external: true,
    icon: Fuel,
    example: examples.rotas,
    msg: "Oi Matheus, quero um diagnóstico de combustível e rotas.",
  },
];

export function Diagnose() {
  const [selected, setSelected] = useState<(typeof options)[number]["id"]>("hora-extra");
  const current = useMemo(
    () => options.find((o) => o.id === selected) ?? options[0],
    [selected],
  );
  const wa = whatsappUrl(current.msg);
  const ex = current.example;

  return (
    <section id="diagnostico" className="scroll-mt-24 border-t border-line px-5 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs tracking-wide text-muted">Diagnósticos</p>
          <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Escolha a dor
          </h2>
        </div>

        {/* Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {options.map((opt) => {
            const active = opt.id === selected;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? "border-fg bg-fg text-bg"
                    : "border-line text-fg-soft hover:border-line-strong hover:text-fg"
                }`}
              >
                <opt.icon className="size-3.5" strokeWidth={1.75} />
                {opt.title}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="mt-6 rounded-2xl border border-line bg-bg-elevated p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-wide text-muted uppercase">{ex.label}</p>
              <h3 className="font-display mt-1 text-xl font-semibold text-fg">{current.title}</h3>
            </div>
            <current.icon className="size-5 text-muted" strokeWidth={1.5} />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {ex.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-line bg-bg px-2.5 py-3">
                <p className="font-display text-base font-semibold tabular-nums text-fg sm:text-lg">
                  {m.value}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-muted sm:text-[11px]">{m.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-fg-soft">{ex.highlight}</p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            {wa ? (
              <Button asChild className="w-full sm:w-auto">
                <a href={wa} target="_blank" rel="noreferrer">
                  Pedir diagnóstico
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            ) : null}
            {current.external ? (
              <Button asChild variant="quiet" className="w-full sm:w-auto">
                <a href={current.href} target="_blank" rel="noreferrer">
                  Código
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            ) : (
              <Button asChild variant="quiet" className="w-full sm:w-auto">
                <Link to={current.href}>
                  Dashboard
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted">
          Hora extra = case real. Demais = outputs dos repositórios públicos.
        </p>
      </div>
    </section>
  );
}
