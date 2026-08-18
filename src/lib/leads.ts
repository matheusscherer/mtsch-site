import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

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
    const sql = await getSql();
    await sql`
      insert into leads (id, name, email, company, message)
      values (
        ${crypto.randomUUID()},
        ${data.name},
        ${data.email},
        ${data.company ?? ""},
        ${data.message}
      )
    `;
    return { ok: true as const };
  });
