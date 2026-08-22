/** Números extraídos dos outputs gerados pelos repositórios públicos. */

export const examples = {
  horaExtra: {
    kind: "real" as const,
    label: "Case real · 30 dias",
    metrics: [
      { label: "Horas tratadas", value: "4.110 h" },
      { label: "Falta de efetivo", value: "55,5%" },
      { label: "Vagas sem extra", value: "42,7%" },
    ],
    highlight: "55,5% da extra era falta de efetivo — custo puro da empresa",
  },
  estoque: {
    kind: "exemplo" as const,
    label: "Exemplo rodado · 25 SKUs",
    metrics: [
      { label: "Capital em excesso", value: "R$ 31.308" },
      { label: "SKUs em excesso", value: "18 (72%)" },
      { label: "Venda perdida 7d", value: "R$ 1.089" },
    ],
    highlight: "R$ 31,3 mil parados em excesso + 3 SKUs em ruptura com demanda",
  },
  noShow: {
    kind: "exemplo" as const,
    label: "Exemplo rodado · 112 agendamentos",
    metrics: [
      { label: "Taxa no-show", value: "29,1%" },
      { label: "Receita perdida", value: "R$ 2.460" },
      { label: "Impacto total", value: "R$ 3.935" },
    ],
    highlight: "Instagram 65,6% de no-show · faixa 16h com 73,3%",
  },
  retrabalho: {
    kind: "exemplo" as const,
    label: "Exemplo rodado · 60 ordens",
    metrics: [
      { label: "Custo total NQ", value: "R$ 12.192" },
      { label: "FPY", value: "93,2%" },
      { label: "Taxa retrabalho", value: "60%" },
    ],
    highlight: "Solda lidera o custo · porosidade é a causa nº 1",
  },
  rotas: {
    kind: "exemplo" as const,
    label: "Exemplo rodado · 30 rotas",
    metrics: [
      { label: "Km extras", value: "554 (18,2%)" },
      { label: "Custo do desvio", value: "R$ 548" },
      { label: "Impacto total", value: "R$ 1.846" },
    ],
    highlight: "53% das rotas críticas · veículo ABC1A11 concentra o desvio",
  },
} as const;
