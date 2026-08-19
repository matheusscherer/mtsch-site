import type { LeadQualification } from "@/lib/qualify-lead";

const DEFAULT_DATABASE_ID = "935329e713e64cdc8b574a65f34d73d3";

export async function notifyNotion(input: {
  name: string;
  email: string;
  company: string;
  message: string;
  qualification: LeadQualification;
}): Promise<void> {
  const token = process.env.NOTION_TOKEN?.trim();
  if (!token) return;

  const databaseId = (process.env.NOTION_DATABASE_ID?.trim() || DEFAULT_DATABASE_ID).replaceAll(
    "-",
    "",
  );
  const q = input.qualification;
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Nome: { title: [{ text: { content: clip(input.name, 80) } }] },
        Email: { email: input.email },
        Empresa: { rich_text: [{ text: { content: clip(input.company, 120) } }] },
        Temperatura: { select: { name: q.temperature } },
        Score: { number: q.score },
        Status: { select: { name: "novo" } },
        Motivo: { rich_text: [{ text: { content: clip(q.reason, 200) } }] },
        Mensagem: { rich_text: [{ text: { content: clip(input.message, 1900) } }] },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Notion ${res.status}: ${body.slice(0, 240)}`);
  }
}

function clip(s: string, max: number): string {
  return s.length > max ? s.slice(0, max) : s;
}
