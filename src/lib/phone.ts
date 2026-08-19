/** Celular BR com 11 dígitos (DDD + 9). */
export function parseBrMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  let local = digits;
  if (local.startsWith("55") && local.length >= 12) local = local.slice(2);
  if (local.length === 11 && local[2] === "9") return local;
  return null;
}

export function formatBrMobile(digits: string): string {
  if (digits.length !== 11) return digits;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function leadWhatsappUrl(phone: string, text: string): string {
  return `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
}
