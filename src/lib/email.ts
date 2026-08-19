const EMAIL_RE =
  /^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z]{2,24})+$/i;

const FAKE_DOMAINS = new Set([
  "teste.com",
  "test.com",
  "email.com",
  "mail.com",
  "asdf.com",
  "asd.com",
  "aaa.com",
  "abc.com",
  "xxx.com",
  "foo.com",
  "bar.com",
  "exemplo.com",
  "example.com",
  "exemplo.com.br",
  "test.com.br",
  "teste.com.br",
]);

/** Aceita só e-mail com cara de verdadeiro. Não consulta MX. */
export function isPlausibleEmail(raw: string): boolean {
  const email = raw.trim().toLowerCase();
  if (email.length < 8 || email.length > 120) return false;
  if (email.includes("..") || email.startsWith(".") || email.endsWith(".")) return false;
  if (!EMAIL_RE.test(email)) return false;

  const at = email.lastIndexOf("@");
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length < 2) return false;
  if (!domain.includes(".")) return false;

  const labels = domain.split(".");
  const tld = labels.at(-1) ?? "";
  const root = labels[0] ?? "";
  if (tld.length < 2) return false;
  if (FAKE_DOMAINS.has(domain)) return false;
  if (local === root && local.length <= 6) return false;
  return true;
}
