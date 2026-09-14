# Padrão Git — leia isto antes de qualquer mudança

Este arquivo vale para **qualquer agente, de qualquer modelo** (Grok, Cursor, Claude, Copilot, etc.).

## Fluxo obrigatório

Toda tarefa — **correção**, **melhoria** ou **função nova**:

1. Abra uma **Issue** (labels: `correção` / `melhoria` / `nova-função`).
2. Crie uma **branch** a partir de `main` (`fix/…`, `improve/…`, `feat/…`, `docs/…`).
3. Commits pequenos, no imperativo: `feat:`, `fix:`, `improve:`, `docs:`, `chore:`.
4. Abra um **Pull Request**.
5. Na descrição do PR, mencione a Issue: `Closes #N`.
6. Merge em `main` dispara o **deploy na Vercel**.

Não commite direto em `main`. Não pule a Issue. Uma branch = uma Issue.

Deploys são gerenciados por PR: preview na branch, produção no merge.

## Commits

Um commit = uma ideia. Nunca `update`, `wip`, `ajuste`.
Nunca commitar `.env`, senha, dado de cliente, `node_modules`, `.vercel`.

Exemplos:

```text
feat: adiciona CTA de WhatsApp no case de hora extra
fix: corrige cálculo de ociosidade da frota
improve: reduz tamanho do hero no mobile
docs: atualiza tabela de diagnósticos
```

## `main` é sagrado

Sem force-push em `main`. Sem reescrever histórico publicado.
Para desfazer: `git revert` (commit novo). `git reset --hard` só em branch local.

## Exceções

Nenhuma neste repo. Até docs e ajuste de uma linha passam por Issue + PR.

A pinta diária do gráfico vive só em `matheusscherer/quadro-verde` e não se aplica aqui.
