import { scrollToId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeroSparks } from "@/components/site/data-reel";

export function Hero() {
  return (
    <section id="topo" className="relative w-full overflow-x-clip bg-bg">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[#FF5C5C]/10 blur-[100px]" />
        <div className="absolute top-40 right-0 h-48 w-48 rounded-full bg-[#5B8CFF]/10 blur-[80px]" />
        <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-[#34D399]/10 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-xl px-5 pb-12 pt-12 sm:px-6 sm:pt-16">
        <p className="text-center text-[11px] tracking-[0.28em] text-muted uppercase">
          Python · custo operacional · remoto
        </p>

        <h1 className="font-display mt-5 text-center text-[2rem] font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl">
          Números que
          <span className="block bg-linear-to-r from-[#FF5C5C] via-[#FFB020] to-[#34D399] bg-clip-text text-transparent">
            mostram o vazamento
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-muted">
          Hora extra · estoque · no-show · retrabalho · rotas.
          Planilha entra. Diagnóstico sai.
        </p>

        <div className="mt-7 flex justify-center">
          <Button size="lg" onClick={() => scrollToId("diagnostico")}>
            Ver o rolo de dados
          </Button>
        </div>

        <HeroSparks />
      </div>
    </section>
  );
}
