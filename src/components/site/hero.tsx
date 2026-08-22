import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section id="topo" className="relative w-full overflow-x-clip bg-bg">
      <div className="mx-auto max-w-3xl px-5 pb-14 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16">
        <p className="text-xs tracking-wide text-muted">
          Python · Pandas · Porto Alegre · Remoto
        </p>

        <h1 className="font-display mt-5 text-[1.75rem] font-semibold leading-tight tracking-tight text-fg sm:text-4xl sm:leading-[1.15]">
          Diagnóstico de custo com Python
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-[15px]">
          Planilha operacional vira número e prioridade: hora extra, estoque,
          no-show, retrabalho e rotas.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/hora-extra">
              Dashboard real
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="quiet" onClick={() => scrollToId("diagnostico")}>
            Escolher diagnóstico
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-3">
          <Metric value="4.110 h" label="Case real" />
          <Metric value="55,5%" label="Falta efetivo" />
          <Metric value="5" label="Diagnósticos" />
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg-elevated px-2 py-3 sm:px-4 sm:py-4">
      <p className="font-display text-lg font-semibold tabular-nums tracking-tight text-fg sm:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted sm:text-xs">{label}</p>
    </div>
  );
}
