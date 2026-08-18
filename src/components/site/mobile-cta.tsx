import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";

export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <Button className="w-full" onClick={() => scrollToId("contato")}>
        Agendar reunião
      </Button>
    </div>
  );
}
