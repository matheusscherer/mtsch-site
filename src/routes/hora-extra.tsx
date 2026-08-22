import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientsChart, MotivesChart, NatureChart } from "@/components/site/dashboard-charts";
import { brand } from "@/lib/site";
import {
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
      {
        title:
          "Dashboard · Diagnóstico de Hora Extra | 4.110h · 55,5% falta de efetivo | MTSCH",
      },
      {
        name: "description",
        content:
          "Dashboard interativo de case real: 4.110 horas de hora extra analisadas com Python. 55,5% falta de efetivo, 42,7% das vagas fechadas sem exposição a extra.",
      },
    ],
  }),
});

function HoraExtraPage() {
  const vacancyInsight = `${VACANCY.zeroExposure.pct.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
  })}% das vagas fechadas saíram de exposição a extra no mesmo dia. ${VACANCY.open} ainda abertas no recorte.`;

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

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <Link
          to="/"
          hash="projetos"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Portfólio
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="text-micro text-muted uppercase">Operação de segurança · 30 dias · dados reais</p>
          <h1 className="font-display mt-4 text-display font-semibold text-fg">
            Diagnóstico de hora extra
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-fg-soft sm:text-base">
            256 lançamentos tratados manualmente e 100% categorizados. A conclusão não foi
            “cortar extra” — foi fechar o posto vago mais rápido. Números reais, contas por setor
            anonimizadas.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label="Total no ciclo" value={formatHours(TOTAL.hours)} hint={`${TOTAL.employees} colaboradores`} />
          <Kpi label="Tratadas à mão" value={formatHours(TREATED.hours)} hint={`${TREATED.launches} lançamentos`} />
          <Kpi label="Causa nº 1" value="55,5%" hint="Falta de efetivo" />
          <Kpi label="Vagas sem extra" value="42,7%" hint={`${VACANCY.zeroExposure.count} de ${VACANCY.closed} fechadas`} />
        </div>

        <section className="mt-6 grid gap-3 lg:grid-cols-5">
          <div className="rounded-xl border border-line bg-bg-elevated p-5 sm:p-6 lg:col-span-3">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-micro text-muted uppercase">Motivo da extra</p>
                <h2 className="font-display mt-2 text-lg font-semibold text-fg">Horas por causa</h2>
              </div>
              <p className="text-xs text-muted">Passe o mouse para detalhar</p>
            </div>
            <MotivesChart />
          </div>

          <div className="rounded-xl border border-line bg-bg-elevated p-5 sm:p-6 lg:col-span-2">
            <p className="text-micro text-muted uppercase">Natureza</p>
            <h2 className="font-display mt-2 text-lg font-semibold text-fg">Estrutura do custo</h2>
            <div className="mt-4">
              <NatureChart />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              58% é estrutural. Não se resolve com “cortar hora” — se resolve fechando o posto.
            </p>
          </div>
        </section>

        <section className="mt-3 rounded-xl border border-line bg-bg-elevated p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-micro text-muted uppercase">Concentração</p>
              <h2 className="font-display mt-2 text-lg font-semibold text-fg">Horas por setor</h2>
            </div>
            <p className="text-xs text-muted">Contas anonimizadas</p>
          </div>
          <ClientsChart />
        </section>

        <section className="mt-3 grid gap-3 sm:grid-cols-3">
          <Insight
            title="Tese"
            body="A maior parte da extra estrutural seguia padrão repetitivo de vacância. Prioridade: tempo de cobertura de vaga, não volume de extra."
          />
          <Insight title="Ação" body={vacancyInsight} />
          <Insight
            title="Método"
            body="Pandas + categorização manual auditável. Relatório legível para gestão. Código do pipeline no GitHub."
          />
        </section>

        <section className="mt-14 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-fg">Código e lógica abertos</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Quer o mesmo tipo de recorte na sua operação? É só chamar.
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
                GitHub
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

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg-elevated p-5">
      <p className="text-micro text-muted uppercase">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg-soft">{body}</p>
    </div>
  );
}
