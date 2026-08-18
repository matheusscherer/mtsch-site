import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand, navItems } from "@/lib/site";
import { cn, scrollToId } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
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
          <Button size="sm" onClick={() => go("contato")}>
            Agendar Reunião
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
            <Button className="mt-3 w-full" onClick={() => go("contato")}>
              Agendar Reunião
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
