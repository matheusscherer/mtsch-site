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
    title: "Pipeline que não dorme",
    copy: "Leads do WhatsApp entram no CRM, recebem follow-up e só sobem para o time quando estão quentes.",
    metric: "3,2×",
    metricLabel: "respostas no prazo",
  },
  {
    tag: "Financeiro",
    title: "Fechamento sem caça ao arquivo",
    copy: "Conciliação, notas e relatórios gerados de madrugada. O time começa o dia com o número certo.",
    metric: "18h",
    metricLabel: "liberadas / mês",
  },
  {
    tag: "Operações",
    title: "Fábrica com pulso 24/7",
    copy: "Estoque, pedidos e exceções em um fluxo só. Quando algo quebra, o alerta chega antes do cliente.",
    metric: "99.9%",
    metricLabel: "jobs no SLA",
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
      <p className="mt-2 text-sm text-muted">{v}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-bg px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Serviços"
          title="Do processo sujo ao sistema que fatura."
          copy="Três frentes. Um critério: se não reduz trabalho repetido ou não aumenta receita, não entra."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-line bg-bg-elevated p-6 sm:p-7"
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
    <section className="border-y border-line bg-bg-elevated px-5 py-20 sm:px-6">
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
    <section id="projetos" className="scroll-mt-24 bg-bg px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Projetos"
          title="Cases que pagam o próprio projeto."
          copy="Recortes reais do tipo de operação que construímos — do comercial ao chão de fábrica."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-xl border border-line bg-bg-elevated p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                  {item.tag}
                </span>
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
            </article>
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
      <p className="text-[0.68rem] tracking-[0.24em] text-muted uppercase">{kicker}</p>
      <h2 className="font-display mt-3 text-title font-semibold text-fg">{title}</h2>
      {copy ? <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{copy}</p> : null}
    </div>
  );
}
