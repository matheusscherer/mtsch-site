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
  }),
});
