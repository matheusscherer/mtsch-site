# MTSCH — Dados & Automação

Landing page de conversão da marca **MTSCH**. Dark mode premium, hero com hierarquia editorial e captura de leads.

**Problema:** processos manuais e presença digital genérica não convertem reunião.  
**Solução:** uma página única, rápida e sóbria, com CTA claro e formulário persistido.  
**Stack:** React 19 · TypeScript · TanStack Start · Tailwind v4 · Postgres (Neon / PGLite).  
**Resultado:** preview funcional, build de produção verde, repositório e documentação prontos para ir ao ar.

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
```

## Ir ao ar (Vercel)

O projeto **já está pronto para Vercel**. Duas rotas:

1. **Publicar pelo Grok** — sobe o mesmo build na infraestrutura gerenciada.
2. **Sua conta Vercel** — Import Project apontando para este repo. Passos em [docs/DEPLOY.md](docs/DEPLOY.md).

Não commitar `.env`. Variáveis só no painel da Vercel / Neon.

## Boas práticas

Documentação de engenharia sênior: [docs/ENGINEERING.md](docs/ENGINEERING.md).

## Licença

Uso privado da marca MTSCH / Matheus Scherer.
