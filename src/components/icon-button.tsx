import { cn } from "@/lib/utils";

// Round icon-only link (Figma "Icon Button"). Icons are 18px Lucide glyphs.
export function IconLink({ className, children, ...props }: React.ComponentProps<"a"> & { "aria-label": string }) {
  return (
    <a
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground [&_svg]:size-[18px]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
