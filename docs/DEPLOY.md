# Deploy — Vercel

O app **já gera output da Vercel** (`nitro({ preset: "vercel" })` no build). Não precisa de `vercel.json` extra para o caso base.

## Caminho A — Publicar pelo Grok

No Grok, use **Publicar**. A plataforma sobe o mesmo `npm run build` na Vercel gerenciada, injeta banco e auth, e entrega um link `*.grok.me`.

Use este caminho se quiser ir ao ar agora, sem criar projeto na sua conta.

## Caminho B — Sua conta Vercel + este repo

1. Repo no GitHub (já criado): `https://github.com/matheusscherer/mtsch-site`
2. [vercel.com/new](https://vercel.com/new) → **Import** esse repositório.
3. Framework: a Vercel detecta Vite / Nitro. Build command: `npm run build`. Output: o preset já escreve `.vercel/output`.
4. Crie um banco **Neon** (serverless Postgres) e copie a `DATABASE_URL`.
5. Variáveis de ambiente (Production + Preview):

| Variável | Obrigatória | Notas |
| --- | --- | --- |
| `DATABASE_URL` | sim, em produção | Connection string da Neon. Sem ela o app cai no PGLite (não serve em serverless). |
| `BETTER_AUTH_URL` | se for usar login | URL pública, ex. `https://mtsch.vercel.app` |
| `BETTER_AUTH_SECRET` | se for usar login | String longa, aleatória. Só no servidor. |
| `VITE_AUTH_ENABLED` | não | `false` desliga o login. Landing e form de lead continuam. |

6. Deploy. Confira `/` (landing) e envie um lead de teste.
7. Domínio: Settings → Domains.

### Auth (Google / X)

Neste template o login federado passa pelo broker do Grok. Em deploy **só Grok**, isso já vem injetado.

Em **Vercel própria**, a landing e o formulário de leads funcionam sem login. Para Google/X na sua conta, é preciso configurar Better Auth com as credenciais do *seu* projeto — não reutilizar secrets de preview e não commitar `.env`.

### Checklist pós-deploy

- [ ] `/` abre com o hero (não tela branca)
- [ ] CSS e JS em `/assets/*` (não 404 / MIME `text/html`)
- [ ] Formulário grava na Neon (`select * from leads`)
- [ ] `/login` não quebra o layout
- [ ] `og.jpg` e favicon no ar

## O que eu faço / o que você faz

| | Grok | GitHub | Notion | Vercel da sua conta |
| --- | --- | --- | --- | --- |
| Eu faço agora | preview vivo | repo + código + docs | página de engenharia | deixo o projeto pronto |
| Você (1 clique) | Publicar | — | — | Import Project + `DATABASE_URL` |

Não tenho acesso à sua conta Vercel daqui. Quando quiser o caminho B, importe o repo e me mande a URL — eu reviso o deploy.
