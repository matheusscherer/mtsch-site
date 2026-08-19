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
| Notion (este projeto) | Página **Projeto 02 — MTSCH Landing** |
| LinkedIn | https://linkedin.com/in/scherermatheus |
| E-mail | contatomatheusscherer@gmail.com |

---

## Status atual (o que já funciona)

- [x] Landing no ar (Vercel Production)
- [x] LinkedIn e e-mail corretos no footer
- [x] Cases com repositórios reais
- [x] Rotas extras (`/bio`, `/cristali`) removidas
- [x] CTAs apontam para o formulário `#contato`
- [x] Formulário grava na tabela `leads` (Neon)
- [x] SSL forçado na conexão Postgres (fix de produção)
- [ ] Notificação por e-mail quando chega lead
- [ ] Resposta automática ao lead + link de agenda
- [ ] Classificação automática (quente / morno / frio)

---

## Como ver os leads (celular ou PC)

1. Abra [console.neon.tech](https://console.neon.tech)
2. Entre no projeto do banco ligado ao site
3. **SQL Editor** → rode:

```sql
SELECT id, name, email, company, message, created_at
FROM leads
ORDER BY created_at DESC
LIMIT 20;
```

Cada envio do formulário vira uma linha. Campos:

| Coluna | Significado |
| --- | --- |
| `id` | UUID do lead |
| `name` | Nome |
| `email` | E-mail |
| `company` | Empresa (pode ser vazio) |
| `message` | O que a pessoa quer automatizar |
| `created_at` | Data/hora (UTC) |

---

## Variáveis na Vercel

**Settings → Environment Variables** (Production + Preview):

| Variável | Obrigatória | Notas |
| --- | --- | --- |
| `DATABASE_URL` | **sim** | Connection string da Neon. Preferir **pooled** + `sslmode=require`. |
| `VITE_AUTH_ENABLED` | não | Já existe; login é opcional para a landing. |

Depois de mudar qualquer variável: **Redeploy**.

---

## Arquitetura do formulário (código)

```
Visitante preenche o form
        ↓
contact.tsx (client) → submitLead({ data })
        ↓
src/lib/leads.ts  (server fn + Zod)
        ↓
getSql() → Neon (pg + SSL)
        ↓
INSERT INTO leads (...)
```

Arquivos-chave:

- `src/components/site/contact.tsx` — UI do formulário
- `src/lib/leads.ts` — validação Zod + insert
- `src/lib/db.ts` — pool Neon com SSL
- `migrations/0002_leads.sql` — schema da tabela
- `scripts/migrate.mjs` — roda no `npm run build`

---

## Próximo passo: e-mail + agenda (pipeline)

Hoje o lead **só grava**. Objetivo: reagir na hora.

### Nível 1 — Notificação (fazer primeiro)

Quando nascer uma linha em `leads`:

1. E-mail para **você** (`contatomatheusscherer@gmail.com`) com nome, e-mail, empresa e mensagem
2. (Opcional) WhatsApp / Slack

**Ferramentas:** Resend ou Brevo (API) **ou** n8n/Make lendo a tabela / webhook.

### Nível 2 — Agenda para o lead

1. E-mail automático para o **lead**
2. Texto curto + link de agenda (Calendly ou Google Appointment Schedule)
3. Ele marca horário sozinho

Isso fecha a maioria dos casos sem IA.

### Nível 3 — Análise + priorização (sênior)

```
Form → Neon
  ↓
n8n / worker
  ↓
Classifica (regras ou LLM): quente | morno | frio
  ↓
Quente  → e-mail pra você + link de agenda pro lead
Morno   → resposta padrão + nurture
Frio    → só registra
```

**Regras simples (sem LLM no começo):**

- mensagem ≥ 40 caracteres
- preencheu empresa
- palavras-chave: financeiro, WhatsApp, estoque, ERP, planilha, fechamento, lead, CRM
- e-mail corporativo (não só gmail/hotmail) → peso extra

**Com LLM (depois):** resumir pedido, sugerir o que automatizar primeiro, rascunhar o 1º e-mail.

### Stack recomendada

| Camada | Ferramenta |
| --- | --- |
| Captação | Site + tabela `leads` (já pronto) |
| Orquestração | n8n (preferência) ou Make |
| E-mail | Resend / Brevo / Gmail API |
| Agenda | Calendly (rápido) ou Google Calendar API |
| Análise | Regras no n8n → LLM só se valer |

**Não fazer agora:** agendador “inteligente” dentro do site; depender de LLM para o básico funcionar.

---

## Checklist de implementação (quando for fazer)

### Fase A — Notificação

- [ ] Conta Resend (ou Brevo) + domínio/remetente verificado
- [ ] `RESEND_API_KEY` (ou equivalente) na Vercel **ou** fluxo no n8n
- [ ] Após `insert` em `leads`, disparar e-mail para você
- [ ] Testar com lead real e conferir caixa de entrada

### Fase B — Resposta + agenda

- [ ] Criar link Calendly (30 min / consultoria)
- [ ] E-mail automático ao lead com o link
- [ ] Tom: curto, sem pitch longo

### Fase C — Classificação

- [ ] n8n: trigger em novo lead (webhook ou poll na Neon)
- [ ] Nó de regras (keywords + tamanho + domínio)
- [ ] Branch quente / morno / frio
- [ ] (Opcional) card no Notion Comercial

---

## Troubleshooting rápido

| Sintoma | O que checar |
| --- | --- |
| “Não foi possível enviar” | `DATABASE_URL` na Vercel (Production)? Redeploy depois de salvar? |
| Deploy **Build Failed** | Log de build; migration não pode derrubar o build (já tratado) |
| Lead não aparece no Neon | SQL `SELECT * FROM leads`; tabela existe? connection string pooled? |
| SSL / conexão | `db.ts` e `migrate.mjs` já forçam `ssl: { rejectUnauthorized: false }` |

Criar tabela manualmente (se precisar):

```sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Definition of done (produto)

- [x] Página converte e grava lead
- [x] Cases reais + LinkedIn certo
- [x] Docs no GitHub + Notion
- [ ] Você recebe e-mail na hora do lead
- [ ] Lead recebe link de agenda
- [ ] Pipeline de qualificação (regras)

---

## Como explicar em 20 segundos

> Landing de conversão da MTSCH. Formulário valida com Zod, grava em Postgres (Neon) e está pronto para o próximo passo: notificação por e-mail, resposta com link de agenda e classificação automática via n8n — o mesmo tipo de automação que eu vendo para o cliente.
