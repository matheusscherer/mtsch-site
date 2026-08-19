import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { brand } from "@/lib/site";
import { notifyLead } from "@/lib/notify-lead";
import { notifyWebhook } from "@/lib/notify-webhook";
import { notifyNotion } from "@/lib/notify-notion";
import { qualifyLead, type LeadQualification, type LeadTemperature } from "@/lib/qualify-lead";
import { formatSlotLabel, isOfferedSlot, proposeSlots, type MeetingSlot } from "@/lib/slots";
import { meetingCalendarUrl } from "@/lib/calendar-link";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome curto demais.").max(80),
  email: z.string().trim().email("E-mail inválido.").max(120),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(2, "Conta o que automatizar.").max(2000),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  score: number;
  temperature: LeadTemperature;
  reason: string;
  nextAction: string;
  meetingAt: string | null;
  createdAt: string;
};

function canViewInbox(email: string | null): boolean {
  // Preview (PGLite): qualquer sessão autenticada vê a inbox local.
  if (!process.env.DATABASE_URL?.trim()) return true;
  if (!email) return false;
  const extras = (process.env.LEAD_ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return new Set([brand.email.toLowerCase(), ...extras]).has(email.toLowerCase());
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const company = data.company ?? "";
    const qualification = qualifyLead({
      email: data.email,
      company,
      message: data.message,
    });
    const id = crypto.randomUUID();
    const sql = await getSql();
    try {
      await sql`
        insert into leads (id, name, email, company, message, score, temperature, reason, next_action)
        values (
          ${id},
          ${data.name},
          ${data.email},
          ${company},
          ${data.message},
          ${qualification.score},
          ${qualification.temperature},
          ${qualification.reason},
          ${qualification.nextAction}
        )
      `;
    } catch (err) {
      console.error("[submitLead] insert com classificação falhou, tentando schema básico:", err);
      await sql`
        insert into leads (id, name, email, company, message)
        values (
          ${id},
          ${data.name},
          ${data.email},
          ${company},
          ${data.message}
        )
      `;
    }

    let emailSent = false;
    try {
      emailSent = await notifyLead({
        name: data.name,
        email: data.email,
        company,
        message: data.message,
        qualification,
      });
    } catch (err) {
      console.error("[submitLead] notifyLead falhou:", err);
    }

    try {
      await notifyWebhook({
        event: "lead.created",
        lead: {
          id,
          name: data.name,
          email: data.email,
          company,
          message: data.message,
          score: qualification.score,
          temperature: qualification.temperature,
          reason: qualification.reason,
          nextAction: qualification.nextAction,
        },
      });
    } catch (err) {
      console.error("[submitLead] notifyWebhook falhou:", err);
    }

    try {
      await notifyNotion({
        name: data.name,
        email: data.email,
        company,
        message: data.message,
        qualification,
      });
    } catch (err) {
      console.error("[submitLead] notifyNotion falhou:", err);
    }

    return {
      ok: true as const,
      leadId: id,
      temperature: qualification.temperature,
      nextAction: qualification.nextAction,
      emailSent,
      slots: proposeSlots(),
    };
  });

const bookSchema = z.object({
  leadId: z.string().uuid(),
  start: z.string().min(10),
});

export const bookLeadSlot = createServerFn({ method: "POST" })
  .validator((input: unknown) => bookSchema.parse(input))
  .handler(async ({ data }) => {
    if (!isOfferedSlot(data.start)) {
      throw new Error("Esse horário não está mais disponível.");
    }
    const start = new Date(data.start);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      name: string;
      email: string;
      company: string;
      message: string;
    }>`
      select id, name, email, company, message from leads where id = ${data.leadId} limit 1
    `;
    const lead = rows[0];
    if (!lead) throw new Error("Lead não encontrado.");

    try {
      await sql`
        update leads set meeting_at = ${start.toISOString()} where id = ${lead.id}
      `;
    } catch (err) {
      console.error("[bookLeadSlot] update meeting_at falhou:", err);
    }

    const slot: MeetingSlot = {
      start: start.toISOString(),
      end: end.toISOString(),
      label: formatSlotLabel(start.toISOString()),
    };

    return {
      ok: true as const,
      slot,
      calendarUrl: meetingCalendarUrl({
        name: lead.name,
        email: lead.email,
        company: lead.company,
        message: lead.message,
        start,
        end,
      }),
    };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<LeadRow[]> => {
    const sql = await getSql();
    const users = await sql<{ email: string | null }>`
      select email from "user" where id = ${context.userId} limit 1
    `;
    if (!canViewInbox(users[0]?.email ?? null)) {
      throw new Error("Forbidden");
    }

    const rows = await sql<{
      id: string;
      name: string;
      email: string;
      company: string;
      message: string;
      score: number;
      temperature: string;
      reason: string;
      next_action: string;
      meeting_at: string | null;
      created_at: string;
    }>`
      select id, name, email, company, message, score, temperature, reason, next_action, meeting_at, created_at
      from leads
      order by created_at desc
      limit 80
    `;

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      company: row.company,
      message: row.message,
      score: Number(row.score),
      temperature: (row.temperature as LeadTemperature) || "frio",
      reason: row.reason,
      nextAction: row.next_action,
      meetingAt: row.meeting_at ? String(row.meeting_at) : null,
      createdAt: String(row.created_at),
    }));
  });

export type { LeadQualification, LeadTemperature, MeetingSlot };
