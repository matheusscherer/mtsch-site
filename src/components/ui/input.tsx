import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-md border border-line bg-bg-elevated px-4 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus-visible:border-line-strong focus-visible:ring-2 focus-visible:ring-fg/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
