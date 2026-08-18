import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/site";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-bg px-5">
      <img
        src="/hero-smoke.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-b from-bg/40 via-bg/70 to-bg" />
      <div className="relative w-full max-w-sm rounded-xl border border-line bg-bg-elevated/90 p-8 backdrop-blur-xl">
        <Link to="/" className="mb-8 block">
          <span className="font-display text-sm font-semibold tracking-[0.22em] text-fg">
            {brand.name}
          </span>
          <span className="mt-1 block text-[0.62rem] tracking-[0.22em] text-muted uppercase">
            {brand.line}
          </span>
        </Link>
        <h1 className="font-display text-2xl font-semibold text-fg">Área do cliente</h1>
        <p className="mt-2 text-sm text-muted">Entre para acompanhar entregas e relatórios.</p>
        <div className="mt-8 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continuar com {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">O acesso está desativado neste ambiente.</p>
          )}
        </div>
        <Link
          to="/"
          className="mt-8 inline-block text-xs tracking-[0.14em] text-muted uppercase hover:text-fg"
        >
          Voltar ao site
        </Link>
      </div>
    </main>
  );
}
