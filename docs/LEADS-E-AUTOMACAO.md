# Leads & Automação — MTSCH Site

Documento operacional para celular e desktop. Atualizado em **2026-08-19**.

---

## Links rápidos

| O quê | URL |
| --- | --- |
| Site (produção) | https://mtsch-site.vercel.app |
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
- [x] Rotas extras removidas
- [x] CTAs apontam para `#contato`
- [x] Formulário grava na tabela `leads` (Neon)
- [x] SSL na conexão Postgres
- [x] **Código** de notificação + auto-resposta (`src/lib/notify-lead.ts`)
- [ ] `RESEND_API_KEY` na Vercel (você configura — passos abaixo)
- [ ] Domínio verificado na Resend (para auto-resposta a qualquer lead)
- [ ] `CALENDLY_URL` (opcional, entra no e-mail ao lead)
- [ ] Classificação automática (quente / morno / frio)

---

## Fase A — Ativar e-mail AGORA (passo a passo)

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

3. Marque **Production** (e Preview se quiser)
4. **Save** → **Redeploy**

### 3. Testar

1. Espere o deploy **Ready**
2. Envie um lead de teste no site
3. Confira a caixa de **contatomatheusscherer@gmail.com** (e spam)

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

```sql
SELECT name, email, company, message, created_at
FROM leads
ORDER BY created_at DESC
LIMIT 20;
```

Neon → SQL Editor.

---

## Variáveis na Vercel (resumo)

| Variável | Obrigatória | Notas |
| --- | --- | --- |
| `DATABASE_URL` | **sim** | Neon pooled + SSL |
| `RESEND_API_KEY` | para e-mail | Sem ela o lead grava, mas não manda e-mail |
| `LEAD_NOTIFY_EMAIL` | não | Default = contatomatheusscherer@gmail.com |
| `RESEND_FROM` | não | Default = onboarding@resend.dev |
| `CALENDLY_URL` | não | Se setado, entra no e-mail ao lead |
| `VITE_AUTH_ENABLED` | não | Login opcional |

Sempre **Redeploy** depois de mudar variável.

---

## Arquitetura (código)

```
Form → submitLead (Zod)
  → INSERT leads (Neon)
  → notifyLead (Resend)
       → e-mail para você
       → auto-resposta ao lead (se domínio ok)
```

Arquivos:

- `src/lib/leads.ts` — insert + chama notify
- `src/lib/notify-lead.ts` — Resend (fetch, sem lib extra)
- `src/components/site/contact.tsx` — UI
- `migrations/0002_leads.sql` — schema

E-mail é **best-effort**: se a Resend falhar, o lead **já está salvo** e o visitante vê sucesso.

---

## Fase B — Calendly

1. Crie um evento 30 min em [calendly.com](https://calendly.com)
2. Vercel → `CALENDLY_URL` = link do evento
3. Redeploy

O texto da auto-resposta já inclui o link quando a variável existe.

---

## Fase C — Classificação (depois)

n8n: trigger (webhook ou poll Neon) → regras keywords → branch quente/morno/frio → Notion / Slack.

Não bloqueia Fase A/B.

---

## Troubleshooting

| Sintoma | Ação |
| --- | --- |
| Lead grava, e-mail não chega | `RESEND_API_KEY` setada? Redeploy? Spam? |
| Auto-resposta não chega no lead | Domínio ainda não verificado na Resend |
| Form falha | `DATABASE_URL` + tabela `leads` |
| Resend 403 | Chave inválida ou remetente não autorizado |

---

## Definition of done

- [x] Página converte e grava lead
- [x] Cases reais + LinkedIn
- [x] Código de e-mail no repo
- [ ] `RESEND_API_KEY` ativa e e-mail chega na sua caixa
- [ ] Domínio Resend + auto-resposta estável
- [ ] Calendly no e-mail ao lead
- [ ] Qualificação n8n (opcional)

---

## Frase de 20s

> Landing da MTSCH grava lead no Postgres e dispara e-mail via Resend. Próximo nível é domínio verificado, Calendly na auto-resposta e qualificação no n8n — o mesmo tipo de automação que eu entrego para cliente.
