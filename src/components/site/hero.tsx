import { Button } from "@/components/ui/button";
import { DeviceStage } from "@/components/site/devices";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-bg pt-16 sm:pt-[4.5rem]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/hero-smoke.jpg"
          alt=""
          className="smoke-layer h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgb(255_255_255/0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/20 via-transparent to-bg" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-5 pt-10 pb-6 text-center sm:px-6 sm:pt-12 md:pb-[34%]">
        <p className="rise-in text-micro font-medium text-muted uppercase">
          — Soluções escaláveis em Python —
        </p>
        <h1 className="rise-in font-display mt-5 text-display font-semibold uppercase text-fg [animation-delay:80ms]">
          Automatize negócios.
          <br />
          Cresça agora.
        </h1>
        <p className="rise-in mt-5 max-w-xl text-sm leading-relaxed text-fg-soft sm:text-base [animation-delay:140ms]">
          Transformamos processos manuais e repetitivos em sistemas inteligentes que geram
          receita 24/7.
        </p>
        <div className="rise-in mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center [animation-delay:200ms]">
          <Button size="lg" onClick={() => scrollToId("contato")}>
            Consultoria Gratuita
          </Button>
          <Button size="lg" variant="quiet" onClick={() => scrollToId("projetos")}>
            Ver Portfólio de Cases
          </Button>
        </div>
        <div className="mt-8 w-full md:absolute md:inset-x-0 md:bottom-0 md:mt-0">
          <DeviceStage />
        </div>
      </div>
    </section>
  );
}
