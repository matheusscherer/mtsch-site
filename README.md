# MTSCH — Dados & Automação

Landing page de conversão da marca **MTSCH**. Dark mode premium, hero com hierarquia editorial e captura de leads.

**Produção:** https://mtsch-site.vercel.app  
**Problema:** processos manuais e presença digital genérica não convertem reunião.  
**Solução:** uma página única, rápida e sóbria, com CTA claro e formulário persistido na Neon.  
**Stack:** React 19 · TypeScript · TanStack Start · Tailwind v4 · Postgres (Neon / PGLite).  
**Resultado:** site no ar, leads gravando, repositório e documentação prontos para o próximo passo (e-mail + agenda).

## Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| UI | React 19 + Tailwind v4 | Tokens no CSS, sem hex solto no JSX |
| Rotas / SSR | TanStack Start + Vite 8 | App com servidor, não SPA burra |
| Validação | Zod | Contrato no boundary (form → server fn) |
| Dados | `pg` + PGLite fallback | Preview sem banco; produção na Neon |
| Auth | Better Auth (Google / X) | Sessão real, sem usuário mock |
| Deploy | Vercel (preset Nitro) | `npm run build` já emite o output certo |

## Scripts

```bash
npm install
npm run dev        # desenvolvimento
npm run typecheck
npm run build      # produção + migrations
```

## Estrutura

```
src/
  components/site/   # hero, nav, cases, contato
  components/ui/     # button, input, label, textarea
  lib/leads.ts       # server function — insert em leads
  lib/site.ts        # copy e links da marca
  routes/            # /, /login, /api/auth/*
migrations/
  0001_auth.sql
  0002_leads.sql
docs/
  DEPLOY.md              # Vercel + Neon
  ENGINEERING.md         # contrato sênior
  LEADS-E-AUTOMACAO.md   # operação de leads + pipeline e-mail/agenda
```

## Documentação

| Doc | Para quê |
| --- | --- |
| [docs/LEADS-E-AUTOMACAO.md](docs/LEADS-E-AUTOMACAO.md) | Ver leads, variáveis, próximo passo (e-mail, Calendly, n8n) |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Deploy Vercel + `DATABASE_URL` |
| [docs/ENGINEERING.md](docs/ENGINEERING.md) | Decisões de engenharia |

## Ir ao ar (Vercel)

Projeto **já em produção**. Para recriar ou outro ambiente: [docs/DEPLOY.md](docs/DEPLOY.md).

Variável obrigatória em Production: `DATABASE_URL` (Neon, preferir pooled + SSL).

Não commitar `.env`.

## Licença

Uso privado da marca MTSCH / Matheus Scherer.
