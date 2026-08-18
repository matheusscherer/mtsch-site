import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full resize-y rounded-lg border border-line bg-bg-elevated px-4 py-3 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus-visible:border-line-strong focus-visible:ring-2 focus-visible:ring-fg/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
