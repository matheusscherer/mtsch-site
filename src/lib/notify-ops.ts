type OpsEvent = {
  type: "lead.created" | "lead.booked";
  lead: {
    id: string;
    name: string;
    email: string;
    company: string;
    message: string;
    score?: number;
    temperature?: string;
    reason?: string;
    meetingAt?: string | null;
  };
};

async function resolveGithubToken(): Promise<string> {
  const fromEnv = (process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "").trim();
  if (fromEnv) return fromEnv;
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const exec = promisify(execFile);
    const { stdout } = await exec("gh", ["auth", "token"], { timeout: 4000 });
    return stdout.trim();
  } catch {
    return "";
  }
}

function githubHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/**
 * Ponte para a automação Grok: grava um JSON no repo privado mtsch-ops.
 * Sem token, o lead já está no banco — só não dispara Calendar/Gmail/Notion.
 */
export async function notifyOps(event: OpsEvent): Promise<boolean> {
  const token = await resolveGithubToken();
  if (!token) {
    console.warn("[notify-ops] GH_TOKEN ausente — fila GitHub não disparou.");
    return false;
  }

  const path = `inbox/${event.lead.id}.json`;
  const body = JSON.stringify({ ...event, at: new Date().toISOString() }, null, 2);
  const url = `https://api.github.com/repos/matheusscherer/mtsch-ops/contents/${path}`;

  const existing = await fetch(url, { headers: githubHeaders(token) });
  let sha: string | undefined;
  if (existing.ok) {
    const json = (await existing.json()) as { sha?: string };
    sha = json.sha;
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: githubHeaders(token),
    body: JSON.stringify({
      message: event.type === "lead.booked" ? "ops: horário escolhido" : "ops: lead novo",
      content: Buffer.from(body).toString("base64"),
      branch: "main",
      sha,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[notify-ops] GitHub", res.status, text.slice(0, 200));
    return false;
  }
  return true;
}
