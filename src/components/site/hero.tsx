import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceStage } from "@/components/site/devices";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate w-full max-w-full overflow-x-clip bg-bg pt-20 sm:pt-24 md:flex md:min-h-svh md:flex-col"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/hero-smoke.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgb(255_255_255/0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/30 via-transparent to-bg" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-4 pb-28 text-center sm:px-6 sm:pt-8 md:flex-1 md:pb-40">
        <p className="rise-in text-micro font-medium text-muted uppercase">
          — Soluções escaláveis em Python —
        </p>
        <h1 className="rise-in font-display mt-4 text-display font-semibold uppercase text-fg [animation-delay:80ms]">
          Automatize negócios.
          <br />
          Cresça agora.
        </h1>
        <p className="rise-in mt-4 max-w-xl text-sm leading-relaxed text-fg-soft sm:mt-5 sm:text-base [animation-delay:140ms]">
          Transformamos processos manuais e repetitivos em sistemas inteligentes que geram
          receita 24/7.
        </p>
        <div className="rise-in mt-6 flex w-full max-w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center [animation-delay:200ms]">
          <Button size="lg" onClick={() => scrollToId("contato")}>
            Consultoria Gratuita
            <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="quiet" onClick={() => scrollToId("projetos")}>
            Ver Portfólio de Cases
          </Button>
        </div>
        <div className="mt-6 w-full max-w-sm overflow-x-clip sm:mt-8 sm:max-w-xl md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:max-w-none">
          <DeviceStage />
        </div>
      </div>
    </section>
  );
}
