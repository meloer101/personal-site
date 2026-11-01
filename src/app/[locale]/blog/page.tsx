import type { Metadata } from "next";
import { LunarGround } from "@/components/lunar-ground";
import { PostRow } from "@/components/post-row";
import { alternatesFor, copy, isLocale, localePath, type Locale } from "@/content/site";
import { getPosts, type Post } from "@/lib/posts";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  return { title: copy[locale].blog.title, alternates: alternatesFor(locale, "/blog") };
}

function shortDate(date: string, locale: Locale) {
  const [y, m, d] = date.split("-").map(Number);
  if (locale === "zh") return `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

export default async function Blog({ params }: PageProps<"/[locale]/blog">) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const t = copy[locale];
  const posts = await getPosts();
  const years = posts.reduce<Record<string, Post[]>>((acc, post) => {
    (acc[post.date.slice(0, 4)] ??= []).push(post);
    return acc;
  }, {});

  return (
    <>
      <main>
        <header className="container-site pt-[160px] pb-20 lg:pt-[220px] lg:pb-32">
          <h1 className="text-display">{t.blog.title}</h1>
          <p className="mt-5 max-w-[600px] text-lead text-prose-foreground">{t.blog.intro}</p>
        </header>

        <div className="container-site flex flex-col gap-12 pb-24 lg:gap-16 lg:pb-40">
          {Object.entries(years)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([year, items]) => (
              <section
                key={year}
                aria-labelledby={`year-${year}`}
                className="grid gap-2 sm:grid-cols-[104px_1fr] sm:gap-0"
              >
                <h2 id={`year-${year}`} className="flex text-title sm:h-14 sm:items-center">
                  {year}
                </h2>
                {/* Rows hang right by their 16px padding so arrows meet the column edge. */}
                <ul className="-mx-4 flex flex-col gap-1 sm:ml-0">
                  {items.map((post) => (
                    <li key={post.slug}>
                      <PostRow
                        href={localePath(locale, `/blog/${post.slug}`)}
                        date={shortDate(post.date, locale)}
                        title={post.title}
                        titleLang={post.lang}
                        tag={post.tag}
                        readingTime={`${post.minutes} ${t.writing.minutes}`}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </main>
      <LunarGround locale={locale} />
    </>
  );
}
