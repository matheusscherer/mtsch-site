import { formatHours, TREATED, VACANCY } from "@/lib/hora-extra";

export function DeviceStage() {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-x-clip px-2">
      <div className="relative mx-auto w-full max-w-xl overflow-hidden sm:max-w-2xl">
        <div className="relative mx-auto w-full">
          <Laptop />
        </div>
        <div className="pointer-events-none absolute right-3 -bottom-3 hidden w-24 overflow-hidden sm:block md:right-6 md:w-28">
          <Phone />
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto h-10 w-3/4 max-w-2xl bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.10),transparent_70%)] blur-xl"
      />
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative w-full">
      <div className="rounded-lg border border-device-edge bg-device p-1.5 shadow-[0_30px_80px_rgb(0_0_0/0.55)] sm:rounded-xl sm:p-2">
        <div className="relative overflow-hidden rounded-md border border-line bg-bg sm:rounded-lg">
          <DashboardScreen />
        </div>
      </div>
      <div className="mx-auto h-2 w-full rounded-b-xl bg-linear-to-b from-device-edge to-device" />
      <div className="mx-auto h-1.5 w-1/3 rounded-b-md bg-device-edge/80" />
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="aspect-video bg-bg-elevated">
      <div className="flex h-full min-w-0">
        <aside className="hidden w-12 shrink-0 flex-col gap-3 border-r border-line bg-bg p-3 sm:flex">
          <span className="size-4 rounded-xs bg-fg/90" />
          <span className="mt-2 h-1.5 w-full rounded-full bg-fg/20" />
          <span className="h-1.5 w-3/4 rounded-full bg-fg/10" />
          <span className="h-1.5 w-full rounded-full bg-fg/10" />
          <span className="mt-auto h-1.5 w-2/3 rounded-full bg-fg/10" />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-micro text-muted uppercase">Diagnóstico · 30 dias</p>
              <p className="truncate text-xs font-medium text-fg-soft sm:text-sm">
                Hora extra — recorte real
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2 py-1 text-micro text-fg-soft">
              100% tratado
            </span>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            <Kpi label="Tratadas" value={formatHours(TREATED.hours)} />
            <Kpi label="Efetivo" value="55,5%" />
            <Kpi label="Sem extra" value={`${VACANCY.zeroExposure.pct.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%`} />
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-line bg-bg p-2">
            <MotiveBars />
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xs border border-line bg-bg px-2 py-1.5 sm:rounded-sm sm:px-3 sm:py-2">
      <p className="text-micro text-muted uppercase">{label}</p>
      <p className="font-display text-sm font-semibold tabular-nums text-fg sm:text-lg">{value}</p>
    </div>
  );
}

function MotiveBars() {
  const rows = [
    { label: "Efetivo", w: 55.5 },
    { label: "Contrato", w: 31.7 },
    { label: "Outros", w: 12.8 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-1">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-2">
          <span className="w-14 shrink-0 truncate text-micro text-muted">{r.label}</span>
          <div className="h-1.5 flex-1 rounded-full bg-bg-elevated">
            <div className="h-full rounded-full bg-fg" style={{ width: `${r.w}%` }} />
          </div>
          <span className="w-10 shrink-0 text-right text-micro tabular-nums text-fg-soft">
            {r.w.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%
          </span>
        </div>
      ))}
    </div>
  );
}

function Phone() {
  return (
    <div className="rounded-xl border border-device-edge bg-device p-1 shadow-[0_20px_50px_rgb(0_0_0/0.5)]">
      <div className="overflow-hidden rounded-lg border border-line bg-bg">
        <div className="relative aspect-9/16 px-2.5 pt-4 pb-3">
          <span className="absolute top-1.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-device-edge" />
          <p className="mt-3 text-micro text-muted uppercase">Tese</p>
          <p className="mb-2 text-xs font-medium text-fg">Posto vago</p>
          <FeedRow title="Falta de efetivo" meta="55,5% das horas" />
          <FeedRow title="Extra contrato" meta="31,7% — faturável" />
          <FeedRow title="Sem exposição" meta="42,7% das vagas" />
        </div>
      </div>
    </div>
  );
}

function FeedRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mb-1.5 rounded-sm border border-line bg-bg-elevated px-2 py-1.5">
      <p className="truncate text-micro tracking-normal text-fg">{title}</p>
      <p className="truncate text-micro tracking-normal text-muted">{meta}</p>
    </div>
  );
}
