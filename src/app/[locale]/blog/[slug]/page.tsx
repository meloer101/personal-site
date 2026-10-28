import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LunarGround } from "@/components/lunar-ground";
import { buttonVariants } from "@/components/ui/button";
import { alternatesFor, copy, isLocale, localePath, type Locale } from "@/content/site";
import { getPost, getSlugs, loadPost } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: alternatesFor(isLocale(locale) ? locale : "en", `/blog/${slug}`),
  };
}

export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const post = await getPost(slug);
  if (!post) notFound();
  const { default: Content } = await loadPost(slug);
  const t = copy[locale];

  return (
    <>
      <main>
        <article className="container-site pt-[136px] pb-24 lg:pt-[180px] lg:pb-40">
          <div className="mx-auto max-w-[680px]">
            <Link
              href={localePath(locale, "/blog")}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-3")}
            >
              <ArrowLeft strokeWidth={1.5} aria-hidden="true" />
              {t.blog.back}
            </Link>
            <h1
              lang={post.lang}
              className="mt-8 text-[clamp(32px,3vw+1rem,44px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance"
            >
              {post.title}
            </h1>
            <p className="mt-4 text-mono-sm text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              {"  ·  "}
              {post.tag}
              {"  ·  "}
              {post.minutes} {t.writing.minutes}
            </p>
            <div lang={post.lang} className="prose-site mt-12">
              <Content />
            </div>
          </div>
        </article>
      </main>
      <LunarGround locale={locale} />
    </>
  );
}
