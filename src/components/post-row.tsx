import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  date: string;
  title: string;
  titleLang?: string;
  tag: string;
  readingTime: string;
};

// Borderless list row (Figma "Post Row"): rows are separated by rhythm, hover shows a rounded accent.
// The 16px inner padding is hung outside the column by the list's -mx-4 so titles align with headings.
export function PostRow({ href, date, title, titleLang, tag, readingTime }: Props) {
  return (
    <Link
      href={href}
      className="group flex min-h-14 items-center gap-4 rounded-md px-4 py-3 transition-colors duration-200 hover:bg-accent sm:gap-6"
    >
      <span className="w-[5.5rem] shrink-0 text-mono-sm text-muted-foreground tabular-nums sm:w-24">{date}</span>
      <span lang={titleLang} className="min-w-0 flex-1 text-body">
        {title}
      </span>
      <span className="hidden text-body-sm text-muted-foreground md:block">{tag}</span>
      <span className="hidden w-14 shrink-0 text-right text-mono-sm text-muted-foreground sm:block">{readingTime}</span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
      />
    </Link>
  );
}
