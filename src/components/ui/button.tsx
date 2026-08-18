import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-wide transition-[color,background-color,border-color,opacity,transform] duration-200 ease-[var(--ease-smooth-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/35 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        solid: "border border-fg bg-fg text-bg hover:bg-fg-soft",
        ghost:
          "border border-line-strong bg-transparent text-fg hover:bg-fg hover:text-bg",
        quiet:
          "border border-line bg-transparent text-fg-soft hover:border-fg hover:text-fg",
      },
      size: {
        sm: "h-10 min-h-10 rounded-full px-4 text-sm",
        md: "h-11 min-h-11 rounded-full px-5 text-sm",
        lg: "h-12 min-h-12 rounded-full px-7 text-sm",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
