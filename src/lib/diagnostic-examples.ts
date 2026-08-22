/** Dados dos outputs dos repositórios + case real. */

export type ChartPoint = { label: string; value: number };

export type DiagnosticCard = {
  id: string;
  title: string;
  kind: "real" | "exemplo";
  color: string;
  colorSoft: string;
  href: string;
  external: boolean;
  headline: string;
  unit: string;
  metrics: { label: string; value: string }[];
  bars: ChartPoint[];
  highlight: string;
  msg: string;
};

export const diagnostics: DiagnosticCard[] = [
  {
    id: "hora-extra",
    title: "Hora extra",
    kind: "real",
    color: "#FF5C5C",
    colorSoft: "rgba(255,92,92,0.15)",
    href: "/hora-extra",
    external: false,
    headline: "4.110",
    unit: "h tratadas",
    metrics: [
      { label: "Efetivo", value: "55,5%" },
      { label: "Sem extra", value: "42,7%" },
      { label: "Estrutural", value: "58%" },
    ],
    bars: [
      { label: "Efetivo", value: 55.5 },
      { label: "Contrato", value: 31.7 },
      { label: "Capacit.", value: 7.2 },
      { label: "Outros", value: 5.6 },
    ],
    highlight: "Case real · falta de efetivo dominou o custo",
    msg: "Oi Matheus, quero um diagnóstico de hora extra na minha operação.",
  },
  {
    id: "estoque",
    title: "Estoque",
    kind: "exemplo",
    color: "#5B8CFF",
    colorSoft: "rgba(91,140,255,0.15)",
    href: "https://github.com/matheusscherer/diagnostico-estoque",
    external: true,
    headline: "31.3k",
    unit: "R$ em excesso",
    metrics: [
      { label: "SKUs excesso", value: "72%" },
      { label: "Ruptura", value: "3 SKUs" },
      { label: "Venda perdida", value: "R$ 1.089" },
    ],
    bars: [
      { label: "Excesso", value: 72 },
      { label: "Saudável", value: 16 },
      { label: "Ruptura", value: 12 },
    ],
    highlight: "25 SKUs · capital parado + ruptura juntos",
    msg: "Oi Matheus, quero um diagnóstico de estoque (excesso + ruptura).",
  },
  {
    id: "no-show",
    title: "No-show",
    kind: "exemplo",
    color: "#FFB020",
    colorSoft: "rgba(255,176,32,0.15)",
    href: "https://github.com/matheusscherer/diagnostico-no-show",
    external: true,
    headline: "29,1%",
    unit: "taxa no-show",
    metrics: [
      { label: "Receita perdida", value: "R$ 2.460" },
      { label: "Impacto", value: "R$ 3.935" },
      { label: "Pior faixa", value: "16h 73%" },
    ],
    bars: [
      { label: "16h", value: 73.3 },
      { label: "11h", value: 43.8 },
      { label: "10h", value: 33.3 },
      { label: "15h", value: 6.2 },
    ],
    highlight: "112 agendamentos · Instagram concentra falha",
    msg: "Oi Matheus, quero um diagnóstico de no-show na agenda.",
  },
  {
    id: "retrabalho",
    title: "Retrabalho",
    kind: "exemplo",
    color: "#C084FC",
    colorSoft: "rgba(192,132,252,0.15)",
    href: "https://github.com/matheusscherer/diagnostico-retrabalho",
    external: true,
    headline: "12.2k",
    unit: "R$ não-qualidade",
    metrics: [
      { label: "FPY", value: "93,2%" },
      { label: "Taxa RT", value: "60%" },
      { label: "Horas RT", value: "82 h" },
    ],
    bars: [
      { label: "Solda", value: 30.4 },
      { label: "Pintura", value: 24.7 },
      { label: "Montagem", value: 23.6 },
      { label: "Usinagem", value: 21.3 },
    ],
    highlight: "60 ordens · porosidade é a causa nº 1",
    msg: "Oi Matheus, quero um diagnóstico de retrabalho / não-qualidade.",
  },
  {
    id: "rotas",
    title: "Rotas",
    kind: "exemplo",
    color: "#34D399",
    colorSoft: "rgba(52,211,153,0.15)",
    href: "https://github.com/matheusscherer/diagnostico-combustivel-rotas",
    external: true,
    headline: "554",
    unit: "km extras",
    metrics: [
      { label: "Desvio", value: "18,2%" },
      { label: "Críticas", value: "53%" },
      { label: "Impacto", value: "R$ 1.846" },
    ],
    bars: [
      { label: "ABC1", value: 43 },
      { label: "JKL4", value: 35 },
      { label: "DEF2", value: 18 },
      { label: "GHI3", value: 4 },
    ],
    highlight: "30 rotas · um veículo concentra o desvio",
    msg: "Oi Matheus, quero um diagnóstico de combustível e rotas.",
  },
];

export const tickerItems = [
  "4.110 h tratadas",
  "55,5% falta de efetivo",
  "R$ 31.308 capital parado",
  "29,1% no-show",
  "R$ 12.192 não-qualidade",
  "554 km extras",
  "42,7% vagas sem extra",
  "FPY 93,2%",
  "72% SKUs em excesso",
  "impacto rotas R$ 1.846",
];
