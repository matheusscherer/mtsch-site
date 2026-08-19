export const brand = {
  name: "MTSCH",
  line: "Dados & Automação",
  lockup: "MTSCH / Dados & Automação",
  city: "Porto Alegre",
  email: "contatomatheusscherer@gmail.com",
  /** E.164 sem +. */
  whatsapp: "5551999709357",
};

export const navItems = [
  { href: "#projetos", id: "projetos", label: "Projetos" },
  { href: "#servicos", id: "servicos", label: "Serviços" },
  { href: "#contato", id: "contato", label: "Contato" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/matheusscherer", kind: "github" as const },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/scherermatheus",
    kind: "linkedin" as const,
  },
  { label: "X", href: "https://x.com/mattschererr", kind: "x" as const },
];
