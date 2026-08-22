import { formatHours, MOTIVES, TREATED, VACANCY } from "@/lib/hora-extra";

export function DeviceStage() {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-x-clip px-2">
      <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl">
        <Laptop />
      </div>
      <div
        aria-hidden
        className="mx-auto h-12 w-3/4 max-w-2xl bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.12),transparent_70%)] blur-2xl"
      />
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative w-full">
      <div className="rounded-t-lg border border-b-0 border-device-edge bg-[#0c0c0c] p-1.5 shadow-[0_40px_100px_rgb(0_0_0/0.65)] sm:rounded-t-xl sm:p-2">
        <div className="mb-1.5 flex items-center gap-1.5 px-1 sm:mb-2">
          <span className="size-1.5 rounded-full bg-[#ff5f57] sm:size-2" />
          <span className="size-1.5 rounded-full bg-[#febc2e] sm:size-2" />
          <span className="size-1.5 rounded-full bg-[#28c840] sm:size-2" />
          <span className="ml-2 h-3 flex-1 rounded-sm bg-white/5 sm:h-3.5" />
        </div>
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a] sm:rounded-lg">
          <DashboardScreen />
        </div>
      </div>
      <div className="mx-auto h-2.5 w-full rounded-b-xl bg-linear-to-b from-[#1a1a1a] via-[#111] to-[#0a0a0a]" />
      <div className="mx-auto h-1 w-[42%] rounded-b-md bg-[#1f1f1f]" />
    </div>
  );
}

function DashboardScreen() {
  const topMotives = MOTIVES.slice(0, 4);

  return (
    <div className="aspect-[16/10] bg-[#0a0a0a] text-left">
      <div className="flex h-full min-w-0">
        {/* Sidebar */}
        <aside className="hidden w-14 shrink-0 flex-col border-r border-white/8 bg-[#0d0d0d] p-2.5 sm:flex">
          <div className="mb-4 flex size-6 items-center justify-center rounded-md bg-white text-[8px] font-bold text-black">
            MS
          </div>
          <nav className="flex flex-1 flex-col gap-2">
            <SideDot active />
            <SideDot />
            <SideDot />
            <SideDot />
          </nav>
          <div className="mt-auto h-1.5 w-full rounded-full bg-white/10" />
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/8 px-3 py-2 sm:px-4">
            <div className="min-w-0">
              <p className="text-[8px] tracking-[0.18em] text-white/40 uppercase sm:text-[9px]">
                Cost intelligence
              </p>
              <p className="truncate text-[10px] font-semibold text-white sm:text-xs">
                Hora extra · ciclo 30 dias
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8px] font-medium text-emerald-400 sm:inline">
                Live case
              </span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[8px] text-white/50">
                Python
              </span>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5 sm:gap-2.5 sm:p-3">
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <Metric
                label="Tratadas"
                value={formatHours(TREATED.hours)}
                unit="h"
                accent
              />
              <Metric label="Efetivo" value="55,5" unit="%" />
              <Metric label="Estrutural" value="58" unit="%" />
              <Metric
                label="Sem extra"
                value={VACANCY.zeroExposure.pct.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                })}
                unit="%"
              />
            </div>

            {/* Charts row */}
            <div className="grid min-h-0 flex-1 grid-cols-5 gap-1.5 sm:gap-2">
              {/* Bars */}
              <div className="col-span-3 flex flex-col rounded-md border border-white/8 bg-[#0f0f0f] p-2 sm:p-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[8px] tracking-wide text-white/40 uppercase sm:text-[9px]">
                    Motivo · horas
                  </p>
                  <p className="text-[8px] tabular-nums text-white/30">top 4</p>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1.5">
                  {topMotives.map((m, i) => (
                    <div key={m.label} className="flex items-center gap-1.5">
                      <span className="w-12 shrink-0 truncate text-[7px] text-white/45 sm:w-16 sm:text-[8px]">
                        {m.label.split(" ")[0]}
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5 sm:h-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${m.pct}%`,
                            background:
                              i === 0
                                ? "linear-gradient(90deg,#fff 0%,#c8c8c8 100%)"
                                : "rgba(255,255,255,0.35)",
                          }}
                        />
                      </div>
                      <span className="w-7 shrink-0 text-right text-[7px] tabular-nums text-white/60 sm:text-[8px]">
                        {m.pct.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donut-like panel */}
              <div className="col-span-2 flex flex-col rounded-md border border-white/8 bg-[#0f0f0f] p-2 sm:p-2.5">
                <p className="mb-1 text-[8px] tracking-wide text-white/40 uppercase sm:text-[9px]">
                  Natureza
                </p>
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative mx-auto size-12 shrink-0 sm:size-14">
                    <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="4"
                        strokeDasharray="58 42"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="4"
                        strokeDasharray="34.7 65.3"
                        strokeDashoffset="-58"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-semibold tabular-nums text-white sm:text-[10px]">
                        58%
                      </span>
                    </div>
                  </div>
                  <div className="hidden min-w-0 flex-1 space-y-1 sm:block">
                    <LegendRow label="Estrutural" value="58%" strong />
                    <LegendRow label="Contrato" value="35%" />
                    <LegendRow label="Outros" value="7%" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom insight strip */}
            <div className="flex items-center justify-between rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1.5">
              <p className="truncate text-[8px] text-white/50 sm:text-[9px]">
                <span className="font-medium text-white/80">Tese:</span> posto vago, não abuso de escala
              </p>
              <p className="shrink-0 text-[8px] tabular-nums text-white/35 sm:text-[9px]">
                483 colab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideDot({ active }: { active?: boolean }) {
  return (
    <span
      className={`size-5 rounded-md ${active ? "bg-white/15 ring-1 ring-white/20" : "bg-white/5"}`}
    />
  );
}

function Metric({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-md border px-1.5 py-1.5 sm:px-2 sm:py-2 ${
        accent ? "border-white/20 bg-white/[0.06]" : "border-white/8 bg-[#0f0f0f]"
      }`}
    >
      <p className="truncate text-[7px] tracking-wide text-white/35 uppercase sm:text-[8px]">
        {label}
      </p>
      <p className="mt-0.5 flex items-baseline gap-0.5">
        <span className="font-display text-[11px] font-semibold tabular-nums text-white sm:text-sm">
          {value}
        </span>
        <span className="text-[7px] text-white/40 sm:text-[8px]">{unit}</span>
      </p>
    </div>
  );
}

function LegendRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1">
      <span className={`truncate text-[7px] ${strong ? "text-white/70" : "text-white/40"}`}>
        {label}
      </span>
      <span className="text-[7px] tabular-nums text-white/55">{value}</span>
    </div>
  );
}
