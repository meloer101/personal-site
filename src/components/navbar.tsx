"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon } from "@/components/brand-icons";
import { IconLink } from "@/components/icon-button";
import { copy, localePath, profile, type Locale } from "@/content/site";
import { cn } from "@/lib/utils";

// Floating glass pill (Figma "Navbar"), one of the two glass surfaces on the site.
export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  // Proxy rewrites hide "/en", but strip both prefixes in case either shows up.
  const basePath = pathname.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";
  const t = copy[locale].nav;
  // On phones only Writing stays: it is the one destination that is not on the home page.
  const links = [
    { href: `${localePath(locale, "/")}#projects`, label: t.projects, active: false, phone: false },
    { href: localePath(locale, "/blog"), label: t.writing, active: basePath.startsWith("/blog"), phone: true },
    { href: `${localePath(locale, "/")}#contact`, label: t.contact, active: false, phone: false },
  ];

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav className="flex items-center gap-4 rounded-full border border-card-border bg-card py-2 pr-2 pl-5 backdrop-blur-[24px] sm:gap-6">
        <Link href={localePath(locale, "/")} className="text-label font-semibold whitespace-nowrap">
          {profile.name}
        </Link>
        <ul className="flex items-center gap-0.5">
          {links.map((link) => (
            <li key={link.label} className={link.phone ? undefined : "hidden sm:block"}>
              <Link
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full px-3 text-label transition-colors duration-200",
                  link.active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <div role="group" aria-label={t.language} className="flex rounded-full bg-secondary p-0.5">
            {(["en", "zh"] as const).map((target) => (
              <Link
                key={target}
                href={localePath(target, basePath)}
                hrefLang={target === "zh" ? "zh-CN" : "en"}
                lang={target === "zh" ? "zh-CN" : "en"}
                aria-label={target === "zh" ? "中文" : "English"}
                aria-current={target === locale ? "true" : undefined}
                className={cn(
                  "inline-flex h-7 w-9 items-center justify-center rounded-full text-label transition-colors duration-200",
                  target === locale
                    ? "bg-accent text-foreground shadow-[inset_0_0_0_1px_var(--card-border)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {target === "en" ? "EN" : "中"}
              </Link>
            ))}
          </div>
          <IconLink href={profile.github} target="_blank" rel="noreferrer" aria-label={t.github}>
            <GithubIcon />
          </IconLink>
        </div>
      </nav>
    </header>
  );
}
