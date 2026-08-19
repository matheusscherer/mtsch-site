import { brand } from "@/lib/site";

export type LeadNotifyPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

/**
 * Envia e-mail de notificação (para você) e, se configurado, auto-resposta ao lead.
 * Nunca quebra o submit: falha de e-mail só vai pro log.
 *
 * Env:
 * - RESEND_API_KEY (obrigatória para enviar)
 * - LEAD_NOTIFY_EMAIL (opcional; default = brand.email)
 * - RESEND_FROM (opcional; default = onboarding@resend.dev — só funciona bem com domínio verificado em produção)
 * - CALENDLY_URL (opcional; se existir, entra no e-mail de auto-resposta)
 */
export async function notifyLead(payload: LeadNotifyPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[notify-lead] RESEND_API_KEY ausente — lead gravado, e-mail não enviado.");
    return;
  }

  const toOwner = (process.env.LEAD_NOTIFY_EMAIL?.trim() || brand.email).toLowerCase();
  const from = process.env.RESEND_FROM?.trim() || "MTSCH <onboarding@resend.dev>";
  const calendly = process.env.CALENDLY_URL?.trim();

  const ownerHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.5;color:#111">
      <p style="margin:0 0 12px"><strong>Novo lead — MTSCH</strong></p>
      <p style="margin:0 0 8px"><strong>Nome:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin:0 0 8px"><strong>E-mail:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
      <p style="margin:0 0 8px"><strong>Empresa:</strong> ${escapeHtml(payload.company || "—")}</p>
      <p style="margin:16px 0 8px"><strong>Mensagem:</strong></p>
      <pre style="white-space:pre-wrap;background:#f4f4f5;padding:12px;border-radius:8px;font-size:14px">${escapeHtml(payload.message)}</pre>
      <p style="margin:16px 0 0;font-size:13px;color:#666">Site: https://mtsch-site.vercel.app</p>
    </div>
  `;

  await sendResend({
    apiKey,
    from,
    to: [toOwner],
    replyTo: payload.email,
    subject: `Lead MTSCH: ${payload.name}${payload.company ? ` — ${payload.company}` : ""}`,
    html: ownerHtml,
  });

  // Auto-resposta ao lead (requer remetente verificado na Resend para e-mails de terceiros)
  const leadHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.5;color:#111">
      <p style="margin:0 0 12px">Olá, ${escapeHtml(payload.name.split(" ")[0] || payload.name)}.</p>
      <p style="margin:0 0 12px">Recebi sua mensagem. Vou analisar o que dá para automatizar e retorno em até <strong>1 dia útil</strong>.</p>
      ${
        calendly
          ? `<p style="margin:0 0 12px">Se preferir, já pode escolher um horário: <a href="${escapeHtml(calendly)}">${escapeHtml(calendly)}</a></p>`
          : ""
      }
      <p style="margin:0 0 4px">— Matheus Scherer</p>
      <p style="margin:0;font-size:13px;color:#666">MTSCH · Dados & Automação · Porto Alegre</p>
    </div>
  `;

  try {
    await sendResend({
      apiKey,
      from,
      to: [payload.email],
      replyTo: toOwner,
      subject: "Recebi sua mensagem — MTSCH",
      html: leadHtml,
    });
  } catch (err) {
    // Com onboarding@resend.dev a Resend só entrega para o e-mail da conta.
    // Não falha o fluxo; dono já foi notificado.
    console.warn("[notify-lead] auto-resposta ao lead falhou (normal sem domínio verificado):", err);
  }
}

async function sendResend(opts: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', """);
}
