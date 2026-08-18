import { createFileRoute } from "@tanstack/react-router";
import { CristaliPage } from "@/components/cristali/page";

export const Route = createFileRoute("/cristali")({
  component: CristaliPage,
  head: () => ({
    meta: [
      { title: "Cristali — Semi joias" },
      {
        name: "description",
        content: "Catálogo Cristali. Escolhe a peça e reserva agora.",
      },
      { name: "theme-color", content: "#f6f1ea" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap",
      },
    ],
  }),
});
