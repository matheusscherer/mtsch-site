import { brand } from "@/lib/site";

export function whatsappNumber(): string {
  return brand.whatsapp.replace(/\D/g, "");
}

export function hasWhatsapp(): boolean {
  return whatsappNumber().length >= 12;
}

export function whatsappUrl(text: string): string | null {
  if (!hasWhatsapp()) return null;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(text)}`;
}

export function whatsappIntro(): string {
  return "Oi Matheus, vi o site da MTSCH. Quero um recorte do que automatizar.";
}

export function whatsappFromLead(input: {
  name: string;
  company?: string;
  message: string;
}): string {
  const who = input.company?.trim()
    ? `${input.name} · ${input.company.trim()}`
    : input.name;
  return `Oi Matheus, sou ${who}. Quero automatizar: ${input.message}`;
}
