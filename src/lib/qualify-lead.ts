export type LeadTemperature = "quente" | "morno" | "frio";

export type LeadQualification = {
  score: number;
  temperature: LeadTemperature;
  reason: string;
  nextAction: string;
};

const KEYWORDS = [
  "financeiro",
  "fechamento",
  "whatsapp",
  "estoque",
  "erp",
  "crm",
  "planilha",
  "dashboard",
  "fiscal",
  "nfe",
  "nota fiscal",
  "relatorio",
  "relatório",
  "automacao",
  "automação",
  "integracao",
  "integração",
  "webhook",
  "fila",
  "bot",
  "pandas",
  "python",
  "shopify",
  "mercado livre",
] as const;

const FREE_EMAIL = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "me.com",
  "proton.me",
  "protonmail.com",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
]);

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function domainOf(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

export function qualifyLead(input: {
  email: string;
  company: string;
  message: string;
}): LeadQualification {
  const reasons: string[] = [];
  let score = 0;

  const company = input.company.trim();
  if (company.length >= 2) {
    score += 2;
    reasons.push("preencheu empresa");
  }

  const message = input.message.trim();
  if (message.length >= 160) {
    score += 3;
    reasons.push("mensagem longa");
  } else if (message.length >= 80) {
    score += 2;
    reasons.push("mensagem detalhada");
  }

  const haystack = normalize(`${company} ${message}`);
  const hits = KEYWORDS.filter((kw) => haystack.includes(normalize(kw)));
  const uniqueHits = [...new Set(hits)].slice(0, 3);
  if (uniqueHits.length > 0) {
    score += uniqueHits.length * 2;
    reasons.push(`sinais: ${uniqueHits.join(", ")}`);
  }

  const domain = domainOf(input.email);
  if (domain && !FREE_EMAIL.has(domain)) {
    score += 2;
    reasons.push("e-mail corporativo");
  }

  const temperature: LeadTemperature = score >= 6 ? "quente" : score >= 3 ? "morno" : "frio";

  const nextAction =
    temperature === "quente"
      ? "Cabe ainda hoje"
      : temperature === "morno"
        ? "Olhamos isso nesta semana"
        : "Sem pressa — se quiser conversar";

  return {
    score,
    temperature,
    reason: reasons.length > 0 ? reasons.join(" · ") : "poucos sinais comerciais",
    nextAction,
  };
}
