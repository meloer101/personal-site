import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  action?: { href: string; label: string; icon: React.ReactNode; external?: boolean };
};

// Heading on the content line; the ghost link hangs right by its 12px padding so its icon meets the column edge.
export function SectionHeader({ id, title, action }: Props) {
  const actionClass = cn(buttonVariants({ variant: "ghost", size: "sm" }), "-mr-3");
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 id={id} className="text-heading">
        {title}
      </h2>
      {action &&
        (action.external ? (
          <a href={action.href} target="_blank" rel="noreferrer" className={actionClass}>
            {action.label}
            {action.icon}
          </a>
        ) : (
          <Link href={action.href} className={actionClass}>
            {action.label}
            {action.icon}
          </Link>
        ))}
    </div>
  );
}
