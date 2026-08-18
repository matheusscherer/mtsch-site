import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-fg-soft" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={1.5} />
      </span>
      <h1 className="font-display text-lg font-semibold">Algo deu errado</h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "Erro inesperado. Recarregue a página."}
      </p>
    </main>
  );
}
