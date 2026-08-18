import { createFileRoute } from "@tanstack/react-router";
import { BioPage } from "@/components/bio/page";

export const Route = createFileRoute("/bio")({
  component: BioPage,
  head: () => ({
    meta: [
      { title: "Matheus Scherer — @mtscfit" },
      {
        name: "description",
        content: "Rotina, treino e clareza. Conteúdo direto — sem teatro.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
      },
    ],
  }),
});
