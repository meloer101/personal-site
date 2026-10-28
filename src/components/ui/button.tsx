import { cva, type VariantProps } from "class-variance-authority";

// shadcn/ui-style button, tuned to the Figma "Button" component set.
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-label transition-colors duration-200 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/88",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost: "text-foreground hover:bg-accent",
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
