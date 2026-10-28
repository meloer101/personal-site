import type { Locale } from "@/content/site";
import { copy } from "@/content/site";
import type { Contributions, ContributionDay, GitHubUser } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVEL_BG = ["bg-contrib-0", "bg-contrib-1", "bg-contrib-2", "bg-contrib-3", "bg-contrib-4"] as const;

const parse = (date: string) => new Date(`${date}T00:00:00Z`);

function formatDate(date: string, locale: Locale, opts: Intl.DateTimeFormatOptions) {
  return parse(date).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-GB", { timeZone: "UTC", ...opts });
}

/** Columns of 7 days (Sun→Sat), padded at the start so the first column begins on Sunday. */
function toWeeks(days: ContributionDay[]) {
  const padded: (ContributionDay | null)[] = [...Array(parse(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

/** A month label sits over the first column of each month, skipped when it would crowd the previous one. */
function monthLabels(weeks: (ContributionDay | null)[][], locale: Locale) {
  const labels: { col: number; text: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = parse(first.date).getUTCMonth();
    if (month === lastMonth) return;
    lastMonth = month;
    if (labels.length && col - labels[labels.length - 1].col < 3) labels.pop();
    // en-US keeps three-letter months ("Sep", not en-GB's "Sept").
    const text = parse(first.date).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
      timeZone: "UTC",
      month: "short",
    });
    labels.push({ col, text });
  });
  return labels;
}

// Grayscale graph in the site's palette: empty days share the glass card's 4% white.
export function ContributionGraph({
  data,
  user,
  locale,
}: {
  data: Contributions;
  user: GitHubUser | null;
  locale: Locale;
}) {
  const t = copy[locale].activity;
  const weeks = toWeeks(data.days);
  const labels = monthLabels(weeks, locale);
  const from = formatDate(data.days[0].date, locale, { day: "numeric", month: "short", year: "numeric" });
  const to = formatDate(data.days[data.days.length - 1].date, locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const total = data.total.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");
  const since = user ? formatDate(user.createdAt.slice(0, 10), locale, { month: "short", year: "numeric" }) : null;
  const facts = [
    `${total} ${t.contributions}`,
    `${from} – ${to}`,
    user && `${user.publicRepos} ${t.repos}`,
    since && (locale === "zh" ? `${since}${t.since}` : `${t.since} ${since}`),
  ].filter(Boolean);

  return (
    <figure className="mt-8">
      <figcaption className="sr-only">{facts.join(", ")}</figcaption>
      {/* Narrower than the 1110px graph: scroll, starting at the most recent weeks (rtl scroll origin, ltr content).
          Once it fits (≥1150px viewport) switch back to ltr so the graph starts on the content line. */}
      <div dir="rtl" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 min-[1150px]:[direction:ltr]">
        <div dir="ltr" aria-hidden="true" className="w-max [--step:14px] lg:[--step:21px]">
          <div className="relative mb-2 h-5 text-body-sm text-muted-foreground">
            {labels.map(({ col, text }) => (
              <span key={col} className="absolute top-0" style={{ left: `calc(${col} * var(--step))` }}>
                {text}
              </span>
            ))}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-0.5 lg:gap-[3px]">
            {weeks.flatMap((week, col) =>
              week.map((day, row) =>
                day ? (
                  <div
                    key={day.date}
                    title={`${day.count} ${t.contributions} · ${day.date}`}
                    className={cn("size-3 rounded-[3px] lg:size-[18px]", LEVEL_BG[day.level])}
                  />
                ) : (
                  <div key={`pad-${col}-${row}`} className="size-3 lg:size-[18px]" />
                ),
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-body-sm text-muted-foreground">
        <p>{facts.join("  ·  ")}</p>
        <div aria-hidden="true" className="flex items-center gap-1.5">
          <span className="mr-1">{t.less}</span>
          {LEVEL_BG.map((bg) => (
            <span key={bg} className={cn("size-3 rounded-[3px]", bg)} />
          ))}
          <span className="ml-1">{t.more}</span>
        </div>
      </div>
    </figure>
  );
}
