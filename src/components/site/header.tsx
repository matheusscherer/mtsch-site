import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@/lib/auth/gates";
import { brand, navItems } from "@/lib/site";
import { scrollToId } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.style.overflowX = open ? "hidden" : "clip";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-6">
        <a
          href="#topo"
          className="group flex flex-col leading-none"
          onClick={(e) => {
            e.preventDefault();
            go("topo");
          }}
        >
          <span className="font-display text-sm font-semibold tracking-[0.22em] text-fg">
            {brand.name}
          </span>
          <span className="mt-1 text-[0.62rem] tracking-[0.22em] text-muted uppercase">
            {brand.line}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-fg-soft transition-colors duration-200 hover:text-fg"
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <SignedIn>
            <Link
              to="/inbox"
              className="text-sm text-fg-soft transition-colors duration-200 hover:text-fg"
            >
              Inbox
            </Link>
          </SignedIn>
          <Button size="sm" onClick={() => go("contato")}>
            Pedir recorte
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg md:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-bg/95 px-5 py-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex min-h-12 items-center text-base text-fg-soft"
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            <SignedIn>
              <Link
                to="/inbox"
                className="flex min-h-12 items-center text-base text-fg-soft"
                onClick={() => setOpen(false)}
              >
                Inbox
              </Link>
            </SignedIn>
            <Button className="mt-3 w-full" onClick={() => go("contato")}>
              Pedir recorte
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
