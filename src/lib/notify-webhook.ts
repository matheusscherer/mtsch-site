/** POST best-effort para n8n / outro orquestrador. */
export async function notifyWebhook(payload: unknown): Promise<void> {
  const url = process.env.N8N_WEBHOOK_URL?.trim();
  if (!url) return;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    console.warn("[notify-webhook] N8N_WEBHOOK_URL inválida.");
    return;
  }
  if (parsed.protocol !== "https:") {
    console.warn("[notify-webhook] webhook precisa ser https.");
    return;
  }

  const res = await fetch(parsed.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`webhook ${res.status}: ${body.slice(0, 200)}`);
  }
}
