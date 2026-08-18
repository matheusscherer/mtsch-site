import { Github, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { brand, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-fg">{brand.name}</p>
          <p className="mt-1 text-xs tracking-[0.16em] text-muted uppercase">{brand.line}</p>
        </div>
        <div className="flex items-center gap-3">
          {socials
            .filter((s) => s.kind !== "x")
            .map((s) => (
              <a
                key={s.kind}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg-soft transition-colors duration-200 hover:border-fg hover:text-fg"
              >
                {s.kind === "github" ? <Github className="size-4" /> : <Linkedin className="size-4" />}
              </a>
            ))}
          <Link
            to="/login"
            className="ml-2 text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
          >
            Área do cliente
          </Link>
        </div>
      </div>
    </footer>
  );
}
