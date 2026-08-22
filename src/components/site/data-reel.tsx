import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { diagnostics, tickerItems, type DiagnosticCard } from "@/lib/diagnostic-examples";
import { whatsappUrl } from "@/lib/whatsapp";

export function DataReel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    const left = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
    setActive(index);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const c = child as HTMLElement;
        const mid = c.offsetLeft + c.clientWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (paused.current) return;
      const next = (active + 1) % diagnostics.length;
      scrollToIndex(next);
    }, 4200);
    return () => window.clearInterval(id);
  }, [active, scrollToIndex]);

  return (
    <section id="diagnostico" className="scroll-mt-24 overflow-x-clip border-t border-line">
      <Ticker />
      <div className="px-5 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.25em] text-muted uppercase">Live data reel</p>
            <h2 className="font-display mt-2 max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl">
              Cinco diagnósticos.
              <span className="block bg-linear-to-r from-[#FF5C5C] via-[#FFB020] to-[#34D399] bg-clip-text text-transparent">
                Um rolo de números.
              </span>
            </h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => scrollToIndex((active - 1 + diagnostics.length) % diagnostics.length)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Próximo"
              onClick={() => scrollToIndex((active + 1) % diagnostics.length)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative mt-8"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
        onTouchStart={() => {
          paused.current = true;
        }}
        onTouchEnd={() => {
          window.setTimeout(() => {
            paused.current = false;
          }, 2500);
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-bg to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-bg to-transparent sm:w-16" />

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto px-5 pb-6 snap-x snap-mandatory scroll-smooth sm:gap-5 sm:px-6"
          style={{ scrollbarWidth: "none" }}
        >
          {diagnostics.map((d, i) => (
            <ProjectCard key={d.id} data={d} index={i} active={i === active} />
          ))}
        </div>

        <div className="flex justify-center gap-2 pb-10">
          {diagnostics.map((d, i) => (
            <button
              key={d.id}
              type="button"
              aria-label={d.title}
              onClick={() => scrollToIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 22 : 8,
                background: i === active ? d.color : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-b border-line bg-bg-elevated py-2.5">
      <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-8 text-xs text-muted">
            <span className="font-medium tabular-nums text-fg-soft">{item}</span>
            <span className="text-line-strong">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  data,
  index,
  active,
}: {
  data: DiagnosticCard;
  index: number;
  active: boolean;
}) {
  const wa = whatsappUrl(data.msg);
  const max = Math.max(...data.bars.map((b) => b.value), 1);

  return (
    <article
      className="project-card snap-center shrink-0 w-[min(86vw,320px)] rounded-2xl border bg-bg-elevated p-5 transition-[border-color,box-shadow,transform] duration-300 sm:w-[340px] sm:p-6"
      style={{
        animationDelay: `${index * 80}ms`,
        borderColor: active ? data.color : "rgba(255,255,255,0.14)",
        boxShadow: active ? `0 0 0 1px ${data.color}33, 0 20px 50px ${data.color}18` : "none",
        transform: active ? "translateY(-4px)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
            style={{ background: data.colorSoft, color: data.color }}
          >
            {data.kind === "real" ? "Case real" : "Exemplo"}
          </span>
          <h3 className="font-display mt-3 text-lg font-semibold text-fg">{data.title}</h3>
        </div>
        <span
          className="mt-1.5 size-2.5 shrink-0 rounded-full"
          style={{ background: data.color, boxShadow: `0 0 14px ${data.color}` }}
        />
      </div>

      <div className="mt-5">
        <p
          className="font-display text-5xl font-semibold leading-none tracking-tight tabular-nums"
          style={{ color: data.color }}
        >
          {data.headline}
        </p>
        <p className="mt-1.5 text-xs text-muted">{data.unit}</p>
      </div>

      <div className="mt-6 space-y-2.5">
        {data.bars.map((bar, i) => (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-muted">{bar.label}</span>
              <span className="tabular-nums text-fg-soft">{bar.value.toLocaleString("pt-BR")}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="bar-fill h-full rounded-full"
                style={{
                  width: `${(bar.value / max) * 100}%`,
                  background: `linear-gradient(90deg, ${data.color}cc, ${data.color})`,
                  animationDelay: `${200 + i * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-1.5">
        {data.metrics.map((m) => (
          <div key={m.label} className="rounded-lg bg-bg/80 px-2 py-2">
            <p className="text-[9px] leading-tight text-muted">{m.label}</p>
            <p className="mt-0.5 text-xs font-semibold tabular-nums text-fg">{m.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-fg-soft">{data.highlight}</p>

      <div className="mt-5 flex gap-2">
        {data.external ? (
          <a
            href={data.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-line py-2.5 text-xs text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
          >
            Código <ArrowUpRight className="size-3.5" />
          </a>
        ) : (
          <Link
            to={data.href}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-line py-2.5 text-xs text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
          >
            Dashboard <ArrowUpRight className="size-3.5" />
          </Link>
        )}
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full py-2.5 text-xs font-medium text-bg transition-opacity hover:opacity-90"
            style={{ background: data.color }}
          >
            Pedir
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function HeroSparks() {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setActive((v) => (v + 1) % diagnostics.length);
    }, 3000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const d = diagnostics[active];

  return (
    <div
      className="mt-10 overflow-hidden rounded-2xl border bg-bg-elevated p-4 transition-[border-color,box-shadow] duration-500 sm:p-5"
      style={{
        borderColor: `${d.color}55`,
        boxShadow: `0 0 40px ${d.color}14`,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full animate-pulse" style={{ background: d.color }} />
          <p className="text-xs font-medium text-fg">{d.title}</p>
          <span className="text-[10px] text-muted">{d.kind === "real" ? "real" : "exemplo"}</span>
        </div>
        <div className="flex gap-1">
          {diagnostics.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.title}
              onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 16 : 6,
                background: i === active ? d.color : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4" key={d.id}>
        <div className="hero-fade">
          <p
            className="font-display text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl"
            style={{ color: d.color }}
          >
            {d.headline}
          </p>
          <p className="mt-1 text-xs text-muted">{d.unit}</p>
        </div>
        <div className="flex h-14 items-end gap-1 pb-0.5">
          {d.bars.map((b, i) => {
            const max = Math.max(...d.bars.map((x) => x.value));
            const h = Math.max(8, (b.value / max) * 56);
            return (
              <div
                key={`${d.id}-${b.label}`}
                className="spark-bar w-2.5 rounded-sm sm:w-3"
                style={{
                  height: h,
                  background: d.color,
                  opacity: 0.35 + (i / d.bars.length) * 0.65,
                  animationDelay: `${i * 80}ms`,
                }}
              />
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-xs text-fg-soft">{d.highlight}</p>
    </div>
  );
}
