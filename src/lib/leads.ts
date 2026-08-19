import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { notifyLead } from "@/lib/notify-lead";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(8).max(2000),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const company = data.company ?? "";
    const sql = await getSql();
    await sql`
      insert into leads (id, name, email, company, message)
      values (
        ${crypto.randomUUID()},
        ${data.name},
        ${data.email},
        ${company},
        ${data.message}
      )
    `;

    // E-mail é best-effort: lead já está salvo.
    try {
      await notifyLead({
        name: data.name,
        email: data.email,
        company,
        message: data.message,
      });
    } catch (err) {
      console.error("[submitLead] notifyLead falhou:", err);
    }

    return { ok: true as const };
  });
