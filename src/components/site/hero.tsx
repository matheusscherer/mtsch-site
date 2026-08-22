import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceStage } from "@/components/site/devices";
import { scrollToId } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate w-full max-w-full overflow-x-clip bg-bg md:flex md:min-h-[calc(100svh-4.5rem)] md:flex-col"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/hero-smoke.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgb(255_255_255/0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/40 via-bg/20 to-bg" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-8 pb-16 text-center sm:px-6 sm:pt-12 sm:pb-20 md:flex-1 md:pb-40">
        <p className="rise-in text-micro font-medium text-muted uppercase">
          Python Data Analyst · Porto Alegre · Remoto
        </p>
        <h1 className="rise-in font-display mt-5 max-w-3xl text-display font-semibold text-fg [animation-delay:80ms]">
          Diagnóstico de custo operacional com Python
        </h1>
        <p className="rise-in mt-5 max-w-2xl text-sm leading-relaxed text-fg-soft sm:mt-6 sm:text-base [animation-delay:140ms]">
          Transformo planilhas operacionais em visão clara de onde o dinheiro está vazando —
          hora extra, estoque, no-show, retrabalho e rotas — e o que atacar primeiro.
        </p>
        <div className="rise-in mt-8 flex w-full max-w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center [animation-delay:200ms]">
          <Button asChild size="lg">
            <Link to="/hora-extra">
              Ver dashboard real
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="quiet" onClick={() => scrollToId("projetos")}>
            Todos os diagnósticos
          </Button>
        </div>
        <div className="mt-10 w-full max-w-sm overflow-x-clip sm:mt-12 sm:max-w-xl md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:max-w-none">
          <DeviceStage />
        </div>
      </div>
    </section>
  );
}
