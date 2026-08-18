import { brand } from "@/lib/site";

export const cristali = {
  name: "Cristali",
  line: "Semi joias",
  promise: "Peças para o dia e para a noite. Você escolhe. Ela reserva no WhatsApp.",
  city: "Porto Alegre",
  email: brand.email,
  /** Coloque o número com DDD, só dígitos. Ex: 51999999999 */
  whatsapp: "",
  instagram: "",
};

export const pecas = [
  { slug: "colar-luz", name: "Colar Luz", kind: "Colar", image: "/cristali/colar-luz.jpg" },
  { slug: "argolas", name: "Argolas Cristal", kind: "Brincos", image: "/cristali/argolas.jpg" },
  { slug: "anel", name: "Anel Aurora", kind: "Anel", image: "/cristali/anel.jpg" },
  { slug: "pulseira", name: "Pulseira Brilho", kind: "Pulseira", image: "/cristali/pulseira.jpg" },
  { slug: "correntes", name: "Correntes Sobrepostas", kind: "Colar", image: "/cristali/correntes.jpg" },
  { slug: "brincos", name: "Brincos Ponto de Luz", kind: "Brincos", image: "/cristali/brincos.jpg" },
];

export function pedidoHref(peca: string) {
  const text = `Oi! Quero reservar a peça ${peca} da Cristali.`;
  if (cristali.whatsapp) {
    return `https://wa.me/55${cristali.whatsapp}?text=${encodeURIComponent(text)}`;
  }
  return `mailto:${cristali.email}?subject=${encodeURIComponent(`Cristali — ${peca}`)}&body=${encodeURIComponent(text)}`;
}
