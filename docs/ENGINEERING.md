# Engenharia — padrão sênior (MTSCH)

Este documento é o contrato de qualidade do repositório. Vale para a landing e para qualquer feature que entre depois.

## 1. Produto antes de framework

- Uma página, uma ação primária: **agendar reunião**.
- Nav, cases e serviços existem para empurrar o visitante ao formulário — não para encher tela.
- Copy em português, específica, sem lorem e sem “✨”.
- Se um bloco não muda a decisão do visitante, ele sai.

## 2. Arquitetura

```
Browser  →  Rotas TanStack  →  Server functions  →  Postgres
                │                     │
                │                     ├─ Zod no boundary
                │                     └─ sem user_id vindo do client
                └─ tokens CSS, sem hex no JSX
```

- **UI** não fala com banco. Só chama `submitLead({ data })`.
- **Server function** valida, persiste, devolve `{ ok: true }` ou erro.
- **Schema** vive em `migrations/*.sql`. Nunca `CREATE TABLE` solto no handler.
- Preview usa PGLite. Produção usa `DATABASE_URL` (Neon). O mesmo SQL nos dois.

## 3. TypeScript e boundaries

- Strict ligado. Sem `any` de preguiça.
- Input de servidor passa por `.validator()` + Zod.
- Retorno de query é tipado (`sql<{ ... }>`). Nada de “row as any”.
- Datas e bigint saem JSON-safe (o driver já normaliza).

## 4. Segurança

| Regra | Como |
| --- | --- |
| Sem segredo no git | `.gitignore` cobre `.env*` |
| Sem segredo no client | só `VITE_*` chega no browser |
| Auth | Better Auth no servidor; middleware resolve `userId` |
| Leads | validação + insert parametrizado (tagged template) |
| XSS | React escapa; não injetar HTML de lead |
| CSRF / origem | Better Auth `trustedOrigins` — não desligar |

Leads hoje são públicos (form de marketing). Se virar área logada, **toda** query ganha `authMiddleware` e filtro por `user_id`.

## 5. UI

- Tokens em `src/styles.css` (`@theme`). Sem `text-white` / `bg-black` / `p-[13px]`.
- Paleta curta: preto, branco, cinza. Sem roxo de template.
- Alvo de toque ≥ 44px. Mobile ~390px sem scroll horizontal.
- Motion curto, `prefers-reduced-motion` respeitado.
- Ícones Lucide. Sem emoji na interface.

## 6. Dados e migrations

- `0001_auth.sql` é do Better Auth — não editar.
- App tables: `0002_*.sql`, `0003_*.sql`, ordem estável.
- Nome de coluna em `snake_case`. IDs de usuário em `TEXT`.
- Migration é a fonte da verdade. Deploy aplica no `npm run build`.

## 7. Git

- `main` sempre buildável.
- Commit pequeno, mensagem no imperativo: `feat: captura lead no contato`.
- Não commitar `node_modules`, `.vercel`, screenshots, chaves.
- PR descreve: o que mudou, como testou, risco.

## 8. Definition of done

Uma mudança só está pronta quando:

1. UI renderiza (não basta HTTP 200).
2. Console sem erro.
3. `npm run typecheck` e `npm run build` passam.
4. Mobile sem overflow.
5. Form (se tocado) grava no banco e mostra feedback.

## 9. O que não fazer

- Mock de usuário “logado” para esconder auth quebrada.
- `innerHTML` com dado de formulário.
- Feature flag eterna para código que já pode ir.
- Abstração para um único uso.
- Deploy com secret no README.
