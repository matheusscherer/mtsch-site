import { ArrowUpRight, Dumbbell, Flame, Timer } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { bioLinks, bioPrimary, bioProfile } from "@/lib/bio";

const stats = [
  { icon: Flame, label: "Foco", value: "Diário" },
  { icon: Dumbbell, label: "Treino", value: "Rotina" },
  { icon: Timer, label: "Resposta", value: "24h" },
];

export function BioPage() {
  return (
    <main className="font-bio min-h-svh w-full overflow-x-clip bg-bio px-4 py-8 text-fg">
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <header className="flex items-center gap-4">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-lime font-semibold text-bio"
            aria-hidden
          >
            MS
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">{bioProfile.name}</h1>
            <p className="text-sm text-lime">{bioProfile.handle}</p>
          </div>
        </header>

        <p className="mt-5 text-sm leading-relaxed text-bio-mist">{bioProfile.promise}</p>

        <a
          href={bioPrimary.href}
          className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-lime px-5 text-sm font-semibold text-bio"
        >
          {bioPrimary.label}
        </a>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-line bg-bio-card px-2 py-3 text-center"
            >
              <item.icon className="mx-auto size-4 text-lime" strokeWidth={1.75} />
              <p className="mt-2 text-xs font-semibold text-fg">{item.value}</p>
              <p className="text-[0.65rem] text-bio-mist">{item.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-bio-mist uppercase">
          Atalhos
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {bioLinks.map((item) => {
            const inner = (
              <>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-fg">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-bio-mist">{item.hint}</span>
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                  <ArrowUpRight className="size-4" />
                </span>
              </>
            );

            const className =
              "flex min-h-16 items-center justify-between gap-3 rounded-xl border border-line bg-bio-card px-4";

            return (
              <li key={item.title}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link to={item.href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-[0.65rem] tracking-[0.18em] text-bio-mist uppercase">
          mtscfit
        </p>
      </div>
    </main>
  );
}
