import { cva, type VariantProps } from "class-variance-authority";

// shadcn/ui-style button, tuned to the Figma "Button" component set: liquid glass capsules.
// Primary is a bright lens, Secondary a clear lens, Ghost only turns into a lens on hover.
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-label transition-[background-color,box-shadow,color] duration-150 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "liquid-glass bg-primary text-primary-foreground hover:bg-primary/88",
        secondary: "liquid-glass bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "liquid-glass-on-hover text-foreground hover:bg-accent",
      },
      size: {
        md: "h-10 px-4",
        sm: "h-8 px-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
