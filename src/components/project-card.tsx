import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  href: string;
  description: string;
  language: string;
  stars: string;
  starsLabel: string;
};

// Glass card (Figma "Project Card"): the only bordered object on the page, because it is clickable.
export function ProjectCard({ name, href, description, language, stars, starsLabel }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-[188px] flex-col justify-between gap-6 rounded-lg border border-card-border bg-card p-6 backdrop-blur-[24px] transition-colors duration-200 hover:border-card-border-hover hover:bg-accent"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-title">{name}</h3>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-[18px] shrink-0 text-muted-foreground transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          />
        </div>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <Badge>{language}</Badge>
        <span className="flex items-center gap-1 text-mono-sm">
          <Star aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
          {stars}
          <span className="sr-only"> {starsLabel}</span>
        </span>
      </div>
    </a>
  );
}
