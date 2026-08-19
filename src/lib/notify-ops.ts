export async function notifyOps(event: OpsEvent): Promise<boolean> {
  const token = await resolveGithubToken();
  if (!token) {
    console.warn("[notify-ops] GH_TOKEN ausente — fila GitHub não disparou.");
    return false;
  }