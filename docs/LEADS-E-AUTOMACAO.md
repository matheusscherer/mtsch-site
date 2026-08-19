# Leads & Automação — MTSCH Site

Documento operacional para celular e desktop. Atualizado em **2026-08-19**.

---

## Links rápidos

| O quê | URL |
| --- | --- |
| Site (produção) | https://mtsch-site.vercel.app |
| Inbox (logado) | https://mtsch-site.vercel.app/inbox |
| GitHub | https://github.com/matheusscherer/mtsch-site |
| Vercel (projeto) | https://vercel.com → **mtsch-site** |
| Neon (banco) | https://console.neon.tech |
| Resend (e-mail) | https://resend.com |
| Notion (este projeto) | Página **Projeto 02 — MTSCH Landing** |
| LinkedIn | https://linkedin.com/in/scherermatheus |
| E-mail | contatomatheusscherer@gmail.com |

---

## Status atual

- [x] Landing no ar (Vercel Production)
- [x] LinkedIn e e-mail corretos no footer
- [x] Cases com repositórios reais
- [x] Formulário grava na tabela `leads` (Neon)
- [x] SSL na conexão Postgres
- [x] Código de notificação + auto-resposta (`src/lib/notify-lead.ts`)
- [x] Classificação automática quente / morno / frio (`src/lib/qualify-lead.ts`)
- [x] Inbox autenticada em `/inbox`
- [x] Webhook opcional para n8n (`N8N_WEBHOOK_URL`)
- [x] Três horários no formulário + botão Google Agenda
- [ ] `RESEND_API_KEY` na Vercel (você configura — passos abaixo)
- [ ] Domínio verificado na Resend (para auto-resposta a qualquer lead)
- [ ] `CALENDLY_URL` (opcional, entra no e-mail ao lead)

---

## Fluxo no ar

```
Visitante → formulário → Zod
  → qualifyLead (regras)
  → INSERT leads (Neon / PGLite)
  → notifyLead (Resend, se houver chave)
  → notifyWebhook (n8n, se houver URL)
  → toast + recorte quente/morno/frio
```

Arquivos:

- `src/lib/qualify-lead.ts` — score e temperatura
- `src/lib/leads.ts` — insert + listagem da inbox
- `src/lib/notify-lead.ts` — e-mail
- `src/lib/notify-webhook.ts` — n8n
- `src/routes/inbox.tsx` — operação
- `migrations/0003_lead_qualification.sql` — colunas novas

E-mail e webhook são **best-effort**: se falharem, o lead **já está salvo**.

---

## Regras de classificação (sem LLM)

Começar sem modelo. Pontos somam:

| Sinal | Pontos |
| --- | --- |
| Preencheu empresa | +2 |
| Mensagem ≥ 80 caracteres | +2 |
| Mensagem ≥ 160 caracteres | +1 extra |
| Keyword (ERP, CRM, WhatsApp, planilha, estoque, financeiro…) | +2 cada, máx. 3 |
| E-mail corporativo (não Gmail/Hotmail/etc.) | +2 |

| Score | Temperatura | Próximo passo |
| --- | --- | --- |
| ≥ 6 | quente | Responder hoje e mandar a agenda |
| ≥ 3 | morno | Responder em até 1 dia útil |
| resto | frio | Resposta padrão, sem prioridade |

---

## Fase A — Ativar e-mail (passo a passo)

O código já está no repo. Falta só a chave.

### 1. Criar conta Resend

1. Abra [https://resend.com](https://resend.com) → Sign up (pode ser com GitHub)
2. **API Keys** → **Create API Key**
3. Nome: `mtsch-site` · permissão: Sending access
4. **Copie a chave** (`re_...`) — ela só aparece uma vez

### 2. Colar na Vercel

1. Vercel → **mtsch-site** → **Settings** → **Environment Variables**
2. **Add**:

| Key | Value |
| --- | --- |
| `RESEND_API_KEY` | a chave `re_...` |
| `LEAD_NOTIFY_EMAIL` | `contatomatheusscherer@gmail.com` (opcional; já é o default) |
| `RESEND_FROM` | deixe vazio no teste **ou** `MTSCH <onboarding@resend.dev>` |
| `CALENDLY_URL` | (opcional) seu link Calendly, ex. `https://calendly.com/seu-user/30min` |
| `N8N_WEBHOOK_URL` | (opcional) URL https do webhook n8n |
| `LEAD_ADMIN_EMAILS` | (opcional) e-mails extras com acesso à `/inbox`, separados por vírgula |

3. Marque **Production** (e Preview se quiser)
4. **Save** → **Redeploy**

### 3. Testar

1. Espere o deploy **Ready**
2. Envie um lead de teste no site
3. Confira a caixa de **contatomatheusscherer@gmail.com** (e spam)
4. Entre em `/inbox` com o mesmo e-mail

**Importante (teste sem domínio):**
Com `onboarding@resend.dev`, a Resend só entrega e-mail para o **e-mail da sua conta Resend**.
Notificação **para você** funciona se a conta Resend for o mesmo Gmail.
Auto-resposta para o e-mail do *lead* (terceiros) só funciona depois de **verificar um domínio** em Resend → Domains.

### 4. Domínio verificado (produção de verdade)

1. Resend → **Domains** → Add `seudominio.com` (ou subdomínio `mail.`)
2. Coloque os registros DNS que a Resend mostrar
3. Quando Status = Verified, na Vercel:
   - `RESEND_FROM` = `MTSCH <contato@seudominio.com>` (ou o endereço que você criou)
4. Redeploy

Aí a auto-resposta chega em qualquer lead.

---

## Como ver os leads

**Pelo site (preferível):** entre em `/inbox` com Google ou X, usando `contatomatheusscherer@gmail.com`.

**Pelo Neon:**

```sql
SELECT name, email, company, temperature, score, reason, next_action, created_at
FROM leads
ORDER BY created_at DESC
LIMIT 20;
```

---

## Variáveis na Vercel (resumo)

| Variável | Obrigatória | Notas |
| --- | --- | --- |
| `DATABASE_URL` | **sim** | Neon pooled + SSL |
| `RESEND_API_KEY` | para e-mail | Sem ela o lead grava, mas não manda e-mail |
| `LEAD_NOTIFY_EMAIL` | não | Default = contatomatheusscherer@gmail.com |
| `RESEND_FROM` | não | Default = onboarding@resend.dev |
| `CALENDLY_URL` | não | Se setado, entra no e-mail ao lead |
| `N8N_WEBHOOK_URL` | não | POST JSON `lead.created` |
| `LEAD_ADMIN_EMAILS` | não | Extra para `/inbox` |
| `VITE_AUTH_ENABLED` | não | Login opcional |

Sempre **Redeploy** depois de mudar variável.

---

## Fase B — Calendly

1. Crie um evento 30 min em [calendly.com](https://calendly.com)
2. Vercel → `CALENDLY_URL` = link do evento
3. Redeploy

O texto da auto-resposta já inclui o link quando a variável existe.

---

## Fase C — n8n (opcional)

O site já classifica sozinho. n8n entra se você quiser Slack / Notion / CRM:

1. Webhook no n8n
2. Vercel → `N8N_WEBHOOK_URL`
3. Redeploy
4. Payload: `{ "event": "lead.created", "lead": { id, name, email, company, message, score, temperature, reason, nextAction } }`

Não bloqueia Fase A/B.

---

## Troubleshooting

| Sintoma | Ação |
| --- | --- |
| Lead grava, e-mail não chega | `RESEND_API_KEY` setada? Redeploy? Spam? |
| Auto-resposta não chega no lead | Domínio ainda não verificado na Resend |
| Form falha | `DATABASE_URL` + tabela `leads` + migration `0003` |
| Inbox 403 | Entrar com o e-mail da marca ou `LEAD_ADMIN_EMAILS` |
| Resend 403 | Chave inválida ou remetente não autorizado |

---

## Definition of done

- [x] Página converte e grava lead
- [x] Cases reais + LinkedIn
- [x] Código de e-mail no repo
- [x] Classificação quente / morno / frio
- [x] Inbox autenticada
- [x] Webhook n8n pronto
- [ ] `RESEND_API_KEY` ativa e e-mail chega na sua caixa
- [ ] Domínio Resend + auto-resposta estável
- [ ] Calendly no e-mail ao lead

---

## Frase de 20s

> Landing da MTSCH grava o lead no Postgres, classifica quente/morno/frio na hora e dispara e-mail via Resend. Inbox no próprio site. n8n e Calendly entram por variável — o mesmo tipo de automação que eu entrego para cliente.
