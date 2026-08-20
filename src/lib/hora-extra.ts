export const PERIOD = "16/07 a 15/08/2026";

export const TOTAL = {
  hours: 15_125.8,
  employees: 483,
} as const;

export const TREATED = {
  hours: 4_110.2,
  launches: 256,
} as const;

export const MOTIVES = [
  { label: "Falta de efetivo", hours: 2_281.0, pct: 55.5 },
  { label: "Extra contrato", hours: 1_301.0, pct: 31.7 },
  { label: "Atraso da rendição", hours: 101.6, pct: 2.5 },
  { label: "Solicitado pelo cliente", hours: 126.1, pct: 3.1 },
  { label: "Treinamento", hours: 113.5, pct: 2.8 },
  { label: "Reciclagem", hours: 180.5, pct: 4.4 },
  { label: "Não autorizado", hours: 6.6, pct: 0.2 },
] as const;

export const NATURE = [
  { label: "Estrutural", pct: 58.0 },
  { label: "Contratual", pct: 34.7 },
  { label: "Capacitação", pct: 7.2 },
  { label: "Não autorizado", pct: 0.2 },
] as const;

export const VACANCY = {
  treated: 99,
  closed: 82,
  open: 17,
  zeroExposure: { count: 35, pct: 42.7 },
} as const;

export const CLIENTS = [
  { name: "Saúde", hours: 373.6 },
  { name: "Indústria", hours: 341.9 },
  { name: "Logística", hours: 292.0 },
  { name: "Planta", hours: 280.5 },
  { name: "Varejo", hours: 216.5 },
  { name: "Porto", hours: 207.6 },
] as const;

export function formatHours(n: number) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
}
