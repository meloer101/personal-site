import { ArrowUpRight, Star } from "lucide-react";

type Props = {
  name: string;
  href: string;
  description: string;
  language: string;
  stars: string;
  starsLabel: string;
};

// Liquid glass card (Figma "Project Card"). No border: the lens rim is the edge.
// The ↗ only shows on hover/focus because the whole card is the link.
export function ProjectCard({ name, href, description, language, stars, starsLabel }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="liquid-glass group flex min-h-[188px] flex-col justify-between gap-6 rounded-lg bg-card p-6 transition-[background-color,box-shadow] duration-150 hover:bg-accent motion-reduce:transition-none"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-title">{name}</h3>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-[18px] shrink-0 text-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          />
        </div>
        <p className="text-body-sm text-prose-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4 text-mono-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-muted-foreground" />
          {language}
        </span>
        <span className="flex items-center gap-1">
          <Star aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
          {stars}
          <span className="sr-only"> {starsLabel}</span>
        </span>
      </div>
    </a>
  );
}
