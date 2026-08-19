import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Inbox as InboxIcon } from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listLeads, type LeadRow, type LeadTemperature } from "@/lib/leads";
import { meetingCalendarUrl } from "@/lib/calendar-link";
import { proposeSlots } from "@/lib/slots";
import { brand } from "@/lib/site";
import { formatBrMobile, leadWhatsappUrl } from "@/lib/phone";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inbox")({ component: InboxPage });

type Filter = "todos" | LeadTemperature;

function InboxPage() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="min-h-svh bg-bg" />;
  }
  if (!user) return <RedirectToSignIn />;
  return <InboxShell />;
}

function InboxShell() {
  const [leads, setLeads] = useState<LeadRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("todos");

  useEffect(() => {
    let cancelled = false;
    listLeads()
      .then((rows) => {
        if (!cancelled) setLeads(rows);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "";
        setError(
          message === "Forbidden" ? "Sem permissão para ver os leads." : "Não foi possível carregar.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    if (!leads) return [];
    if (filter === "todos") return leads;
    return leads.filter((l) => l.temperature === filter);
  }, [leads, filter]);

  const counts = useMemo(() => {
    const base = { todos: leads?.length ?? 0, quente: 0, morno: 0, frio: 0 };
    for (const lead of leads ?? []) base[lead.temperature] += 1;
    return base;
  }, [leads]);

  return (
    <div className="min-h-svh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-6">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-[0.22em] text-fg">
              {brand.name}
            </span>
            <span className="mt-1 text-[0.62rem] tracking-[0.22em] text-muted uppercase">Inbox</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
            >
              Site
            </Link>
            <button
              type="button"
              className="text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
              onClick={() => void signOut("/")}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <p className="text-micro text-muted uppercase">Operação</p>
        <h1 className="font-display mt-3 text-title font-semibold text-fg">Leads classificados</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Aqui eles ficam. Responde por e-mail ou abre o horário no Google Agenda.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["todos", "quente", "morno", "frio"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-sm capitalize transition-colors",
                filter === key
                  ? "border-fg bg-fg text-bg"
                  : "border-line text-fg-soft hover:border-fg hover:text-fg",
              )}
            >
              {key}
              <span className="ml-2 tabular-nums text-xs opacity-70">{counts[key]}</span>
            </button>
          ))}
        </div>

        {error ? <p className="mt-10 text-sm text-muted">{error}</p> : null}

        {leads === null && !error ? (
          <div className="mt-10 space-y-3">
            <div className="h-28 animate-pulse rounded-xl border border-line bg-bg-elevated" />
            <div className="h-28 animate-pulse rounded-xl border border-line bg-bg-elevated" />
          </div>
        ) : null}

        {leads && visible.length === 0 && !error ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <InboxIcon className="size-6 text-muted" strokeWidth={1.5} />
            <p className="mt-4 text-sm text-muted">Nenhum lead neste recorte.</p>
          </div>
        ) : null}

        <ul className="mt-8 space-y-3">
          {visible.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </ul>
      </main>
    </div>
  );
}

function LeadCard({ lead }: { lead: LeadRow }) {
  const start = lead.meetingAt ?? proposeSlots()[0]?.start;
  const calendarUrl = start
    ? meetingCalendarUrl({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        message: lead.message,
        start,
      })
    : null;
  const mailto = `mailto:${lead.email}?subject=${encodeURIComponent(`MTSCH · ${lead.name}`)}&body=${encodeURIComponent(`Olá, ${lead.name.split(" ")[0] || lead.name}.\n\nRecebi teu pedido. Vamos falar sobre: ${lead.message}\n`)}`;
  const wa = lead.phone
    ? leadWhatsappUrl(
        lead.phone,
        `Oi ${lead.name.split(" ")[0] || lead.name}, recebi teu pedido na MTSCH. Vamos olhar: ${lead.message}`,
      )
    : null;

  return (
    <li className="rounded-xl border border-line bg-bg-elevated p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-fg">{lead.name}</p>
          <p className="mt-1 text-sm text-muted">
            {lead.company || "Sem empresa"}
            <span className="mx-2 text-line-strong">·</span>
            <a className="hover:text-fg" href={`mailto:${lead.email}`}>
              {lead.email}
            </a>
            {lead.phone ? (
              <>
                <span className="mx-2 text-line-strong">·</span>
                <span>{formatBrMobile(lead.phone)}</span>
              </>
            ) : null}
          </p>
        </div>
        <TempBadge value={lead.temperature} score={lead.score} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fg-soft">{lead.message}</p>
      {lead.meetingAt ? (
        <p className="mt-3 text-sm text-fg">
          Horário pedido:{" "}
          {format(new Date(lead.meetingAt), "d MMM · HH:mm", { locale: ptBR })}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-muted">
        <span>{lead.nextAction}</span>
        <span>{lead.reason}</span>
        <span className="tabular-nums">
          {format(new Date(lead.createdAt), "d MMM yyyy · HH:mm", { locale: ptBR })}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={mailto}
          className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-fg-soft transition-colors hover:border-fg hover:text-fg"
        >
          Responder
        </a>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-fg-soft transition-colors hover:border-fg hover:text-fg"
          >
            WhatsApp
          </a>
        ) : null}
        {calendarUrl ? (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-fg bg-fg px-4 text-sm text-bg transition-colors hover:bg-fg-soft"
          >
            {lead.meetingAt ? "Abrir no Agenda" : "Agendar no Agenda"}
          </a>
        ) : null}
      </div>
    </li>
  );
}

function TempBadge({ value, score }: { value: LeadTemperature; score: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-micro uppercase">
      <span
        className={cn(
          "size-1.5 rounded-full",
          value === "quente" && "bg-fg",
          value === "morno" && "bg-fg-soft",
          value === "frio" && "bg-muted",
        )}
      />
      <span className="text-fg-soft">{value}</span>
      <span className="tabular-nums text-muted">{score}</span>
    </span>
  );
}
