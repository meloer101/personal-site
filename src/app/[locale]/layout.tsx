import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar";
import { copy, isLocale, locales, profile, siteUrl } from "@/content/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(siteUrl),
    title: { default: profile.name, template: `%s — ${profile.name}` },
    description: copy[locale].hero.intro,
    alternates: { types: { "application/rss+xml": "/feed.xml" } },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Navbar locale={locale} />
        {children}
      </body>
    </html>
  );
}
