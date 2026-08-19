import { ArrowUpRight, Database, GitMerge, Workflow } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Automação em Python",
    copy: "Bots, filas e rotinas que substituem planilha, e-mail e retrabalho — com logs, alertas e dono claro.",
  },
  {
    icon: GitMerge,
    title: "Integração de sistemas",
    copy: "ERP, CRM, fiscal, pagamentos e planilhas falando a mesma língua. Menos cola manual, mais fluxo.",
  },
  {
    icon: Database,
    title: "Dados e dashboards",
    copy: "A operação em um painel sóbrio: receita, filas, falhas e o que precisa de decisão hoje.",
  },
];

const cases = [
  {
    tag: "Comercial",
    title: "Relatório de vendas automatizado",
    copy: "Shopify + Mercado Livre consolidados, métricas calculadas e resumo diário publicado no Notion — sem planilha manual.",
    metric: "1 clique",
    metricLabel: "em vez de horas de consolidação",
    href: "https://github.com/matheusscherer/sales-report-automation",
  },
  {
    tag: "Clínicas",
    title: "Reativação de pacientes elegíveis",
    copy: "Filtra quem fez o procedimento há X dias e ainda não retornou, normaliza telefone e gera lista pronta para WhatsApp.",
    metric: "dry-run",
    metricLabel: "seguro por padrão, envio só com confirmação",
    href: "https://github.com/matheusscherer/mvp_clinicas",
  },
  {
    tag: "Dados",
    title: "Auditoria automática de bases",
    copy: "Duplicatas, nulos, outliers, datas inválidas e erros de cálculo — relatório em Markdown e achados no SQLite.",
    metric: "7 checks",
    metricLabel: "por execução, sem caça manual",
    href: "https://github.com/matheusscherer/validador_dados",
  },
];

const steps = [
  { n: "01", title: "Diagnóstico", copy: "Mapeamos o processo real — não o organograma." },
  { n: "02", title: "Arquitetura", copy: "Desenhamos o menor sistema que resolve o gargalo." },
  { n: "03", title: "Implementação", copy: "Python, APIs e painéis. Sem teatro de slides." },
  { n: "04", title: "Escala", copy: "Monitoramos, medimos e só então expandimos." },
];

export function ProofBar() {
  return (
    <section className="border-y border-line bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Stat k="24/7" v="sistemas no ar, sem plantão humano" />
        <Stat k="Python" v="automação robusta, observável e sua" />
        <Stat k="Receita" v="menos custo operacional, mais ciclo fechado" />
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
          title="Do processo sujo ao sistema que fatura."
          copy="Três frentes. Um critério: se não reduz trabalho repetido ou não aumenta receita, não entra."
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
          title="Cases reais, código aberto."
          copy="Três automações que já existem no GitHub — do comercial à reativação de pacientes e auditoria de dados."
        />
        <div className="mt-12 grid gap-3 lg:grid-cols-3">
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
