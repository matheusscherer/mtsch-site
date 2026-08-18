import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { bioLinks, bioPrimary, bioProfile } from "@/lib/bio";

export function BioPage() {
  return (
    <main className="relative isolate min-h-svh w-full overflow-x-clip bg-bg px-5 py-10 text-fg">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img src="/bio-bg.jpg" alt="" className="h-full w-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-linear-to-b from-bg/50 via-bg/70 to-bg" />
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
        <div
          className="flex size-24 items-center justify-center rounded-full border border-line-strong bg-bg-elevated font-display text-2xl font-semibold tracking-[0.12em]"
          aria-hidden
        >
          MS
        </div>
        <h1 className="font-display mt-5 text-2xl font-semibold tracking-tight">{bioProfile.name}</h1>
        <p className="mt-1 text-sm tracking-[0.16em] text-muted uppercase">{bioProfile.handle}</p>
        <p className="mt-4 text-sm leading-relaxed text-fg-soft">{bioProfile.promise}</p>

        <a
          href={bioPrimary.href}
          className="mt-8 flex min-h-12 w-full items-center justify-center rounded-full border border-fg bg-fg px-6 text-sm font-medium text-bg transition-colors duration-200 hover:bg-fg-soft"
        >
          {bioPrimary.label}
        </a>

        <p className="mt-6 text-xs tracking-wide text-muted">Porto Alegre · resposta em até 1 dia útil</p>

        <ul className="mt-8 flex w-full flex-col gap-3">
          {bioLinks.map((item) =>
            item.external ? (
              <li key={item.title}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-between rounded-xl border border-line bg-bg-elevated/80 px-4 text-left backdrop-blur-sm transition-colors duration-200 hover:border-line-strong"
                >
                  <span>
                    <span className="block text-sm font-medium text-fg">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">{item.hint}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted" />
                </a>
              </li>
            ) : (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className="flex min-h-14 items-center justify-between rounded-xl border border-line bg-bg-elevated/80 px-4 text-left backdrop-blur-sm transition-colors duration-200 hover:border-line-strong"
                >
                  <span>
                    <span className="block text-sm font-medium text-fg">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">{item.hint}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted" />
                </Link>
              </li>
            ),
          )}
        </ul>

        <p className="mt-10 text-[0.68rem] tracking-[0.18em] text-muted uppercase">MTSCH / mtscfit</p>
      </div>
    </main>
  );
}
