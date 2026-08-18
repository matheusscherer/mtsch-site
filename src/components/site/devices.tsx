export function DeviceStage() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="relative mx-auto w-full max-w-[46rem] origin-bottom [perspective:1800px]">
        <div className="relative mx-auto w-full transition-transform duration-700 [transform:rotateX(8deg)] motion-reduce:[transform:none]">
          <Laptop />
        </div>
        <div className="pointer-events-none absolute right-[2%] -bottom-4 hidden w-[21%] min-w-28 rotate-6 md:block">
          <Phone />
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto h-10 w-[72%] max-w-2xl bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.10),transparent_70%)] blur-xl"
      />
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative">
      <div className="rounded-lg border border-device-edge bg-device p-1.5 shadow-[0_30px_80px_rgb(0_0_0/0.55)] sm:rounded-xl sm:p-2">
        <div className="relative overflow-hidden rounded-md border border-line bg-bg sm:rounded-lg">
          <DashboardScreen />
        </div>
      </div>
      <div className="mx-auto h-2 w-[104%] -translate-x-[2%] rounded-b-xl bg-linear-to-b from-device-edge to-device" />
      <div className="mx-auto h-1.5 w-[36%] rounded-b-md bg-device-edge/80" />
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="aspect-16/10 bg-bg-elevated">
      <div className="flex h-full">
        <aside className="hidden w-12 shrink-0 flex-col gap-3 border-r border-line bg-bg p-3 sm:flex">
          <span className="size-4 rounded-xs bg-fg/90" />
          <span className="mt-2 h-1.5 w-full rounded-full bg-fg/20" />
          <span className="h-1.5 w-3/4 rounded-full bg-fg/10" />
          <span className="h-1.5 w-full rounded-full bg-fg/10" />
          <span className="mt-auto h-1.5 w-2/3 rounded-full bg-fg/10" />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-micro text-muted uppercase">Operação</p>
              <p className="text-xs font-medium text-fg-soft sm:text-sm">Receita em tempo real</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-micro text-fg-soft">
              <span className="size-1.5 rounded-full bg-fg" />
              ao vivo
            </span>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            <Kpi label="Receita" value="128k" />
            <Kpi label="Jobs" value="47" />
            <Kpi label="Uptime" value="99.9" />
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-line bg-bg p-2">
            <AreaChart />
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xs border border-line bg-bg px-2 py-1.5 sm:rounded-sm sm:px-3 sm:py-2">
      <p className="text-micro text-muted uppercase">{label}</p>
      <p className="font-display text-sm font-semibold tabular-nums text-fg sm:text-lg">{value}</p>
    </div>
  );
}

function AreaChart() {
  return (
    <svg viewBox="0 0 320 110" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 88 C 28 84, 40 70, 58 66 C 84 60, 96 78, 122 62 C 148 46, 164 28, 190 34 C 216 40, 228 22, 252 18 C 276 14, 294 30, 320 16 L 320 110 L 0 110 Z"
        fill="url(#areaFill)"
      />
      <path
        d="M0 88 C 28 84, 40 70, 58 66 C 84 60, 96 78, 122 62 C 148 46, 164 28, 190 34 C 216 40, 228 22, 252 18 C 276 14, 294 30, 320 16"
        fill="none"
        stroke="rgb(224 224 224)"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function Phone() {
  return (
    <div className="rounded-xl border border-device-edge bg-device p-1 shadow-[0_20px_50px_rgb(0_0_0/0.5)]">
      <div className="overflow-hidden rounded-lg border border-line bg-bg">
        <div className="relative aspect-9/19 px-2.5 pt-4 pb-3">
          <span className="absolute top-1.5 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-device-edge" />
          <p className="mt-3 text-micro text-muted uppercase">Filas</p>
          <p className="mb-2 text-xs font-medium text-fg">Automações</p>
          <FeedRow title="Pedido #1842" meta="ERP → fiscal" />
          <FeedRow title="Lead qualificado" meta="CRM atualizado" />
          <FeedRow title="Alerta de estoque" meta="Slack · 2m" />
          <FeedRow title="Cobrança ok" meta="Stripe → planilha" />
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
