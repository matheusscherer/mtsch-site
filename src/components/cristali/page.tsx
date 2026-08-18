import { cristali, pecas, pedidoHref } from "@/lib/cristali";

export function CristaliPage() {
  const ctaLabel = cristali.whatsapp ? "Pedir no WhatsApp" : "Pedir por e-mail";

  return (
    <main className="min-h-svh w-full overflow-x-clip bg-ivory text-ink">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6">
        <div>
          <p className="font-serif text-2xl tracking-wide">{cristali.name}</p>
          <p className="mt-0.5 text-[0.65rem] tracking-[0.22em] text-stone uppercase">{cristali.line}</p>
        </div>
        <a
          href={pedidoHref("catálogo")}
          className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 text-xs font-medium tracking-wide text-ivory"
        >
          {ctaLabel}
        </a>
      </header>

      <section className="mx-auto max-w-2xl px-5 pb-10 pt-4 text-center">
        <p className="text-[0.68rem] tracking-[0.24em] text-gold uppercase">Nova vitrine</p>
        <h1 className="font-serif mt-3 text-[2.4rem] leading-[1.05] sm:text-5xl">
          Escolhe a peça.
          <br />
          Reserva agora.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone">{cristali.promise}</p>
      </section>

      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {pecas.map((peca) => (
          <article key={peca.slug} className="overflow-hidden rounded-xl bg-champagne">
            <img src={peca.image} alt={peca.name} className="aspect-square w-full object-cover" />
            <div className="flex items-end justify-between gap-3 px-4 py-4">
              <div>
                <p className="text-[0.62rem] tracking-[0.16em] text-stone uppercase">{peca.kind}</p>
                <h2 className="font-serif mt-1 text-xl leading-tight">{peca.name}</h2>
                <p className="mt-1 text-xs text-stone">Sob consulta</p>
              </div>
              <a
                href={pedidoHref(peca.name)}
                className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-gold px-3 text-xs font-medium text-ink"
              >
                Quero
              </a>
            </div>
          </article>
        ))}
      </section>

      <footer className="border-t border-gold/30 px-5 py-8 text-center">
        <p className="font-serif text-lg">{cristali.name}</p>
        <p className="mt-1 text-xs text-stone">
          {cristali.city} · {cristali.email}
        </p>
        <a
          href={pedidoHref("atendimento")}
          className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-sm text-ivory"
        >
          {ctaLabel}
        </a>
      </footer>
    </main>
  );
}
