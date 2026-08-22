import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ClipboardList,
  Database,
  Fuel,
  Package,
  Timer,
  UserX,
  Workflow,
} from "lucide-react";
import { examples } from "@/lib/diagnostic-examples";

const services = [
  {
    icon: Workflow,
    title: "Automação de planilhas",
    copy: "Scripts em Python que leem Excel/CSV, aplicam regras de negócio e devolvem arquivo revisável. Dry-run por padrão quando há envio.",
  },
  {
    icon: Timer,
    title: "Diagnóstico de custo operacional",
    copy: "Hora extra, estoque, no-show, retrabalho e rotas. Cada diagnóstico mostra dinheiro parado, perdido ou consumido duas vezes.",
  },
  {
    icon: Database,
    title: "Qualidade de base",
    copy: "Duplicatas, nulos, contas que não fecham, outliers e inconsistências. Relatório do erro antes de qualquer automação.",
  },
];

const diagnostics = [
  {
    tag: examples.horaExtra.label,
    title: "Hora extra",
    problem: "Volume alto de extra sem clareza de causa",
    metric: examples.horaExtra.metrics[0].value,
    metricLabel: examples.horaExtra.metrics[0].label,
    result: examples.horaExtra.highlight,
    href: "/hora-extra",
    external: false,
    icon: Timer,
  },
  {
    tag: examples.estoque.label,
    title: "Estoque",
    problem: "Capital parado + ruptura de venda",
    metric: examples.estoque.metrics[0].value,
    metricLabel: examples.estoque.metrics[0].label,
    result: examples.estoque.highlight,
    href: "https://github.com/matheusscherer/diagnostico-estoque",
    external: true,
    icon: Package,
  },
  {
    tag: examples.noShow.label,
    title: "No-show",
    problem: "Receita perdida + agenda ociosa",
    metric: examples.noShow.metrics[0].value,
    metricLabel: examples.noShow.metrics[0].label,
    result: examples.noShow.highlight,
    href: "https://github.com/matheusscherer/diagnostico-no-show",
    external: true,
    icon: UserX,
  },
  {
    tag: examples.retrabalho.label,
    title: "Retrabalho",
    problem: "Custo de não-qualidade + capacidade consumida duas vezes",
    metric: examples.retrabalho.metrics[0].value,
    metricLabel: examples.retrabalho.metrics[0].label,
    result: examples.retrabalho.highlight,
    href: "https://github.com/matheusscherer/diagnostico-retrabalho",
    external: true,
    icon: ClipboardList,
  },
  {
    tag: examples.rotas.label,
    title: "Combustível e rotas",
    problem: "Km extras + ociosidade de frota",
    metric: examples.rotas.metrics[0].value,
    metricLabel: examples.rotas.metrics[0].label,
    result: examples.rotas.highlight,
    href: "https://github.com/matheusscherer/diagnostico-combustivel-rotas",
    external: true,
    icon: Fuel,
  },
];

const tools = [
  {
    title: "Validador de bases",
    copy: "7 checks: duplicata, nulo, outlier, data inválida, conta que não fecha.",
    href: "https://github.com/matheusscherer/validador_dados",
  },
  {
    title: "Relatório de vendas",
    copy: "Dois CSVs no mesmo schema viram resumo de receita, ticket e volume.",
    href: "https://github.com/matheusscherer/sales-report-automation",
  },
  {
    title: "Base → lista de ação",
    copy: "Filtra quem parou, limpa telefone, gera lista. Dry-run por padrão.",
    href: "https://github.com/matheusscherer/mvp_clinicas",
  },
];

const steps = [
  { n: "01", title: "Diagnóstico", copy: "Mapeio o processo real e a planilha que a operação já usa." },
  { n: "02", title: "Recorte", copy: "Defino o menor entregável que gera decisão clara." },
  { n: "03", title: "Implementação", copy: "Python + Pandas. Script legível, relatório e testes." },
  { n: "04", title: "Revisão", copy: "Você valida o resultado antes de qualquer ação automática." },
];

export function ProofBar() {
  return (
    <section className="border-y border-line bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Stat k="Código aberto" v="Scripts legíveis, com testes e dry-run" />
        <Stat k="Foco em dinheiro" v="Não entrego gráfico. Entrego custo e prioridade" />
        <Stat k="Operação real" v="Case com 4.110 h de hora extra categorizadas" />
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="px-6 py-8 sm:px-10">
      <p className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">{k}</p>
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
          title="O que eu entrego"
          copy="Três frentes. Cada uma termina em relatório acionável ou script que a operação consegue manter."
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
        <SectionHead kicker="Método" title="Do dado bruto à decisão" />
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
          kicker="Portfólio"
          title="Diagnósticos com números"
          copy="Um case operacional real. Quatro exemplos gerados pelos scripts abertos — os mesmos que você pode clonar e rodar."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {diagnostics.map((item) => {
            const CardInner = (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-micro text-muted uppercase">{item.tag}</span>
                  <item.icon className="size-4 text-muted" strokeWidth={1.5} />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-fg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.problem}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-display text-2xl font-semibold tabular-nums text-fg">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-xs text-muted">{item.metricLabel}</p>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-soft">{item.result}</p>
                <div className="mt-5 flex items-center gap-1 text-xs text-muted group-hover:text-fg">
                  {item.external ? "Ver código" : "Abrir dashboard"}
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </>
            );

            if (item.external) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col rounded-xl border border-line bg-bg-elevated p-6 transition-[border-color] duration-200 hover:border-line-strong sm:p-7"
                >
                  {CardInner}
                </a>
              );
            }

            return (
              <Link
                key={item.title}
                to={item.href}
                className="group flex flex-col rounded-xl border border-line bg-bg-elevated p-6 transition-[border-color] duration-200 hover:border-line-strong sm:p-7"
              >
                {CardInner}
              </Link>
            );
          })}
        </div>

        <div className="mt-10">
          <p className="text-micro text-muted uppercase">Ferramentas de apoio</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {tools.map((t) => (
              <a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-line bg-bg p-5 transition-[border-color] hover:border-line-strong"
              >
                <p className="font-medium text-fg">{t.title}</p>
                <p className="mt-2 text-sm text-muted">{t.copy}</p>
              </a>
            ))}
          </div>
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
