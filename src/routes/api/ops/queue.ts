import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";

const SECRET = (process.env.OPS_SECRET ?? "mtsch-q-8f2a91c4e6b70d3a").trim();

export const Route = createFileRoute("/api/ops/queue")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const key = url.searchParams.get("k") ?? request.headers.get("x-ops-key") ?? "";
        if (!key || key !== SECRET) {
          return new Response("no", { status: 401 });
        }

        const sql = await getSql();
        let rows: Record<string, unknown>[] = [];
        try {
          rows = await sql`
            select id, name, email, company, message, coalesce(phone, '') as phone,
                   score, temperature, reason, next_action, created_at
            from leads
            order by created_at desc
            limit 30
          `;
        } catch {
          rows = await sql`
            select id, name, email, company, message, score, temperature, reason, created_at
            from leads
            order by created_at desc
            limit 30
          `;
        }

        return Response.json({ leads: rows });
      },
    },
  },
});
