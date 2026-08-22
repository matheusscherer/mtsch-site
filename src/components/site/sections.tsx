import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Database, GitMerge, Workflow } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Automação de planilhas em Python",
    copy: "Script que lê Excel/CSV, aplica regra e devolve arquivo. Log quando precisa. Dry-run quando há envio. Tira trabalho repetido da mão.",
  },
  {
    icon: GitMerge,
    title: "Consolida o que já existe",
    copy: "CSV, Excel e o que a operação já exporta. Notion opcional. Relatório de vendas, estoque e operação sem trocar de sistema.",
  },
  {
    icon: Database,
    title: "Qualidade e validação de base",
    copy: "Duplicata, nulo, conta que não fecha, outliers. Relatório do que está errado — antes de qualquer automação ou decisão.",
  },
];

const cases = [
  {
    tag: "Comercial",
    title: "Relatório de vendas automatizado",
    copy: "Dois CSVs no mesmo schema (exemplo Shopify e Mercado Livre) viram um resumo com receita, ticket e volume. Notion só com flag.",
    metric: "CSV → CSV",
    metricLabel: "exemplo sintético, código aberto",
    href: "https://github.com/matheusscherer/sales-report-automation",
  },
  {
    tag: "Base",
    title: "Base parada vira lista de ação",
    copy: "Filtra quem parou, limpa telefone, gera lista revisável. Exemplo em clínica com dado fictício. Envio desligado por padrão.",
    metric: "dry-run",
    metricLabel: "nada dispara sem confirmação",
    href: "https://github.com/matheusscherer/mvp_clinicas",
  },
  {
    tag: "Auditoria",
    title: "Auditoria e limpeza de bases",
    copy: "Duplicatas, nulos, outliers, datas inválidas e qtd × unitário ≠ total. Relatório em Markdown e SQLite. Base sintético.",
    metric: "7 checks",
    metricLabel: "exemplo gerado pelo próprio código",
    href: "https://github.com/matheusscherer/validador_dados",
  },
];

const steps = [
  { n: "01", title: "Diagnóstico", copy: "Olho o processo real — não o organograma." },
  { n: "02", title: "Recorte", copy: "O menor script que tira trabalho da mão." },
  { n: "03", title: "Implementação", copy: "Python, arquivo, relatório. Sem teatro." },
  { n: "04", title: "Revisão", copy: "Você vê o resultado antes de qualquer envio." },
];

export function ProofBar() {
  return (
    <section className="border-y border-line bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Stat k="Python" v="automação que tu consegue abrir e entender" />
        <Stat k="Integração" v="usa o que a operação já tem" />
        <Stat k="Revisão" v="nada dispara sem o dono ver" />
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="px-6 py-8 sm:px-10">
      <p className="font-display text-2xl font-semibold tracking-tight text-fg">{k}</p>
      <p className="mt-2 max-w-xs text-sm text-muted">{v}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-bg px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Serviços"
          title="Tiro o repetido. Devolvo rodando."
          copy="Automação de planilhas, diagnóstico de custo operacional e qualidade de base. Se não sai trabalho da mão, não entra."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-line bg-bg-elevated p-6 transition-[border-color] duration-200 hover:border-line-strong sm:p-7"
            >
              <item.icon className="size-5 text-fg-soft" strokeWidth={1.5} />
              <h3 className="font-display mt-6 text-lg font-semibold text-fg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Method() {
  return (
    <section className="border-y border-line bg-bg-elevated px-5 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHead kicker="Método" title="Rápido. Claro. Sem teatro." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n}>
              <p className="font-display text-xs tracking-[0.2em] text-muted">{step.n}</p>
              <h3 className="mt-3 text-base font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cases() {
  return (
    <section id="projetos" className="scroll-mt-24 bg-bg px-5 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Projetos"
          title="Um case real. Três exemplos abertos."
          copy="O primeiro é recorte operacional de 30 dias — números reais de hora extra. Os outros três são sintéticos e código aberto."
        />

        <Link
          to="/hora-extra"
          className="group mt-12 flex flex-col rounded-xl border border-line bg-bg-elevated p-6 transition-[border-color] duration-200 hover:border-line-strong sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <div className="max-w-xl">
            <div className="flex items-center justify-between gap-3">
              <span className="text-micro text-muted uppercase">Diagnóstico de custo · 30 dias</span>
              <ArrowUpRight className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:hidden" />
            </div>
            <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              O extra não é abuso. É posto vago.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              4.110 h de hora extra tratadas à mão, 100% categorizadas. 55,5% falta de efetivo.
              Contas por setor, sem nome. Relatório no site + Pandas no GitHub.
            </p>
            <p className="mt-4 text-xs tracking-wide text-muted">
              github.com/matheusscherer/diagnostico-custo-hora-extra
            </p>
          </div>
          <div className="mt-8 border-t border-line pt-5 lg:mt-0 lg:border-t-0 lg:pt-0 lg:text-right">
            <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-fg">
              42,7%
            </p>
            <p className="mt-2 max-w-[14rem] text-xs tracking-wide text-muted lg:ml-auto">
              das vagas fechadas sem um dia de exposição a extra
            </p>
          </div>
        </Link>

        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {cases.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-xl border border-line bg-bg-elevated p-6 transition-[border-color] duration-200 hover:border-line-strong sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-micro text-muted uppercase">{item.tag}</span>
                <ArrowUpRight className="size-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold text-fg">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.copy}</p>
              <div className="mt-8 border-t border-line pt-5">
                <p className="font-display text-2xl font-semibold tabular-nums text-fg">
                  {item.metric}
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted">{item.metricLabel}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-micro text-muted uppercase">{kicker}</p>
      <h2 className="font-display mt-3 text-title font-semibold text-fg">{title}</h2>
      {copy ? <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{copy}</p> : null}
    </div>
  );
}
