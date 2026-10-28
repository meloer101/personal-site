import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail, Rss } from "lucide-react";
import { GithubIcon, XIcon } from "@/components/brand-icons";
import { IconLink } from "@/components/icon-button";
import { LunarGround } from "@/components/lunar-ground";
import { PostRow } from "@/components/post-row";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import { alternatesFor, copy, isLocale, localePath, profile, projects, type Locale } from "@/content/site";
import { ContributionGraph } from "@/components/contribution-graph";
import { getContributions, getGitHubUser, getRepoStats } from "@/lib/github";
import { getPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

function ProbeArt({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative SVG, rendered 1:1 so the dither stays crisp
    <img
      src="/art/probe.svg"
      alt=""
      aria-hidden="true"
      width={880}
      height={720}
      className={cn("drift pointer-events-none absolute max-w-none select-none", className)}
    />
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor(isLocale(locale) ? locale : "en", "/") };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const t = copy[locale];
  const [posts, contributions, githubUser, repoStats] = await Promise.all([
    getPosts().then((all) => all.slice(0, 4)),
    getContributions(profile.githubUser),
    getGitHubUser(profile.githubUser),
    Promise.all(projects.map((project) => getRepoStats(project.repo))),
  ]);

  return (
    <>
      <main>
        {/* Hero: the probe floats unframed on the starfield, anchored to the 1440 layout (x=680). */}
        <section className="relative">
          <ProbeArt className="top-[60px] left-[calc(50%-40px)] hidden lg:block" />
          <div className="container-site relative pt-[160px] pb-6 lg:pt-[260px] lg:pb-[200px]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 sm:gap-6">
                <h1 className="text-display">{profile.name}</h1>
                <Image
                  src={profile.avatar}
                  alt={t.hero.avatarAlt}
                  width={72}
                  height={72}
                  preload
                  className="size-14 shrink-0 rounded-full sm:size-[72px]"
                />
              </div>
              <p className="max-w-[540px] text-lead text-muted-foreground">{t.hero.intro}</p>
              <p className="text-body-sm text-muted-foreground">{t.hero.meta.join("  ·  ")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className={buttonVariants({ variant: "primary" })}>
                {t.hero.email}
                <Mail strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "secondary" })}
              >
                {t.hero.github}
                <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
          {/* Small screens: the probe follows the text instead of crossing it. */}
          <div className="relative h-[620px] lg:hidden">
            <ProbeArt className="-top-10 left-[calc(50%-420px)]" />
          </div>
        </section>

        {contributions && (
          <section
            id="activity"
            aria-labelledby="activity-title"
            className="container-site scroll-mt-28 pb-24 lg:pb-40"
          >
            <SectionHeader
              id="activity-title"
              title={t.activity.title}
              action={{
                href: profile.github,
                label: `@${profile.githubUser}`,
                external: true,
                icon: <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />,
              }}
            />
            <ContributionGraph data={contributions} user={githubUser} locale={locale} />
          </section>
        )}

        <section id="projects" aria-labelledby="projects-title" className="container-site scroll-mt-28 pb-24 lg:pb-40">
          <SectionHeader
            id="projects-title"
            title={t.projects.title}
            action={{
              href: profile.github,
              label: t.projects.all,
              external: true,
              icon: <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />,
            }}
          />
          {/* Cards hang outward by their 24px padding so card text sits on the content line,
              but only once the gutter is wider than the hang (≥1176px), or the card edges get clipped. */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 min-[1176px]:-mx-6">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.repo}
                name={project.name}
                href={`https://github.com/${project.repo}`}
                description={project.description[locale]}
                language={repoStats[i]?.language ?? project.language}
                stars={(repoStats[i]?.stars ?? project.stars).toLocaleString("en-US")}
                starsLabel={t.projects.stars}
              />
            ))}
          </div>
        </section>

        <section id="writing" aria-labelledby="writing-title" className="container-site scroll-mt-28 pb-24 lg:pb-40">
          <SectionHeader
            id="writing-title"
            title={t.writing.title}
            action={{
              href: localePath(locale, "/blog"),
              label: t.writing.all,
              icon: <ArrowRight strokeWidth={1.5} aria-hidden="true" />,
            }}
          />
          <ul className="-mx-4 mt-8 flex flex-col gap-1">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostRow
                  href={localePath(locale, `/blog/${post.slug}`)}
                  date={post.date}
                  title={post.title}
                  titleLang={post.lang}
                  tag={post.tag}
                  readingTime={`${post.minutes} ${t.writing.minutes}`}
                />
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="container-site scroll-mt-28">
          <h2 id="contact-title" className="text-heading">
            {t.contact.title}
          </h2>
          <p className="mt-6 text-body text-muted-foreground">{t.contact.line}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={`mailto:${profile.email}`} className={buttonVariants({ variant: "primary" })}>
              {profile.email}
              <Mail strokeWidth={1.5} aria-hidden="true" />
            </a>
            <div className="flex items-center gap-1">
              <IconLink href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
              </IconLink>
              <IconLink href={profile.x} target="_blank" rel="noreferrer" aria-label="X">
                <XIcon />
              </IconLink>
              <IconLink href="/feed.xml" aria-label={t.contact.rss}>
                <Rss strokeWidth={1.5} />
              </IconLink>
            </div>
          </div>
        </section>
      </main>
      <LunarGround locale={locale} />
    </>
  );
}
