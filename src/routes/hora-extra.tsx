import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/site";
import {
  CLIENTS,
  MOTIVES,
  NATURE,
  PERIOD,
  TOTAL,
  TREATED,
  VACANCY,
  formatHours,
} from "@/lib/hora-extra";

export const Route = createFileRoute("/hora-extra")({
  component: HoraExtraPage,
  head: () => ({
    meta: [
      { title: "O extra não é abuso. É posto vago. — MTSCH" },
      {
        name: "description",
        content:
          "Case de 30 dias: 4.110 h tratadas à mão, 55,5% falta de efetivo, 42,7% das vagas fechadas sem exposição a extra.",
      },
    ],
  }),
});

const maxHours = Math.max(...MOTIVES.map((m) => m.hours));
const maxClient = Math.max(...CLIENTS.map((c) => c.hours));

function HoraExtraPage() {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-6">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-[0.22em] text-fg">
              {brand.name}
            </span>
            <span className="mt-1 text-[0.62rem] tracking-[0.22em] text-muted uppercase">
              Case · {PERIOD}
            </span>
          </Link>
          <Link
            to="/"
            hash="contato"
            className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-sm text-fg hover:bg-fg hover:text-bg"
          >
            Contato
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16">
        <Link
          to="/"
          hash="projetos"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Projetos
        </Link>

        <p className="text-micro mt-8 text-muted uppercase">Operação de segurança · 30 dias</p>
        <h1 className="font-display mt-4 max-w-3xl text-display font-semibold uppercase text-fg">
          O extra não é abuso.
          <br />
          É posto vago.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-fg-soft sm:text-base">
          256 lançamentos tratados à mão. 100% categorizados. A ação não foi cortar extra —
          foi fechar o posto mais rápido. Números reais. Contas por setor, sem nome.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label="Horas extras" value={formatHours(TOTAL.hours)} hint={`${TOTAL.employees} colaboradores`} />
          <Kpi label="Tratadas à mão" value={formatHours(TREATED.hours)} hint={`${TREATED.launches} lançamentos`} />
          <Kpi label="Causa nº 1" value="55,5%" hint="Falta de efetivo" />
          <Kpi label="Vagas sem exposição" value="42,7%" hint={`${VACANCY.zeroExposure.count} de ${VACANCY.closed} fechadas`} />
        </div>

        <section className="mt-14 grid gap-3 lg:grid-cols-5">
          <div className="rounded-xl border border-line bg-bg-elevated p-6 sm:p-8 lg:col-span-3">
            <p className="text-micro text-muted uppercase">Motivo da extra</p>
            <h2 className="font-display mt-3 text-xl font-semibold text-fg">Onde foi a hora</h2>
            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-bg">
              {NATURE.map((n) => (
                <span
                  key={n.label}
                  className="h-full bg-fg first:opacity-100 even:opacity-55 last:opacity-25 nth-[3]:opacity-40"
                  style={{ width: `${n.pct}%` }}
                />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              {NATURE.map((n) => (
                <li key={n.label}>
                  {n.label} {n.pct.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3">
              {MOTIVES.map((m) => (
                <div key={m.label}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-fg-soft">{m.label}</span>
                    <span className="tabular-nums text-muted">
                      {formatHours(m.hours)} h · {m.pct.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-bg">
                    <div
                      className="h-full rounded-full bg-fg"
                      style={{ width: `${(m.hours / maxHours) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-bg-elevated p-6 sm:p-8 lg:col-span-2">
            <p className="text-micro text-muted uppercase">Vacância</p>
            <p className="font-display mt-4 text-5xl font-semibold tabular-nums tracking-tight text-fg">
              42,7%
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              das {VACANCY.closed} vagas fechadas saíram de exposição a extra no mesmo dia.
              {VACANCY.open} ainda abertas.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-fg-soft">
              58% da hora tratada é estrutural. Não se corta — se fecha o posto.
            </p>
          </div>
        </section>

        <section className="mt-3 rounded-xl border border-line bg-bg-elevated p-6 sm:p-8">
          <p className="text-micro text-muted uppercase">Contas por setor</p>
          <h2 className="font-display mt-3 text-xl font-semibold text-fg">Onde concentrou</h2>
          <div className="mt-8 space-y-3">
            {CLIENTS.map((c) => (
              <div key={c.name}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-fg-soft">{c.name}</span>
                  <span className="tabular-nums text-muted">{formatHours(c.hours)} h</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-bg">
                  <div
                    className="h-full rounded-full bg-fg"
                    style={{ width: `${(c.hours / maxClient) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Recorte sujeito a aprovação manual. Nomes de cliente omitidos. O total de{" "}
            {formatHours(TOTAL.hours)} h inclui lançamentos automáticos de escala; a análise de motivo
            vale para as {formatHours(TREATED.hours)} h tratadas à mão.
          </p>
        </section>

        <section className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-fg">O recorte e o código estão abertos.</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Recrutamento ou operação: é só chamar.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/" hash="contato">
                Contato
              </Link>
            </Button>
            <Button asChild size="lg" variant="quiet">
              <a
                href="https://github.com/matheusscherer/diagnostico-custo-hora-extra"
                target="_blank"
                rel="noreferrer"
              >
                Código
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg-elevated p-4 sm:p-5">
      <p className="text-micro text-muted uppercase">{label}</p>
      <p className="font-display mt-2 text-2xl font-semibold tabular-nums tracking-tight text-fg sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
