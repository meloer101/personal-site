import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex h-6 items-center rounded-full px-2 text-mono-sm", {
  variants: {
    variant: {
      default: "bg-secondary text-foreground",
      outline: "text-muted-foreground shadow-[inset_0_0_0_1px_var(--card-border-hover)]",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
