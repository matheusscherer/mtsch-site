export const brand = {
  name: "MTSCH",
  line: "Dados & Automação",
  lockup: "MTSCH / Dados & Automação",
  city: "Porto Alegre",
};

export const navItems = [
  { href: "#projetos", id: "projetos", label: "Projetos" },
  { href: "#servicos", id: "servicos", label: "Serviços" },
  { href: "#contato", id: "contato", label: "Contato" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/matheusscherer", kind: "github" as const },
  { label: "LinkedIn", href: "https://www.linkedin.com", kind: "linkedin" as const },
  { label: "X", href: "https://x.com/mattschererr", kind: "x" as const },
];
