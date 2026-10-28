// Build-time GitHub data, refreshed at most once a day (ISR). Every fetch fails soft:
// the page still builds, falling back to the static values in src/content/site.ts.

const DAY = 60 * 60 * 24;

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: DAY },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Contributions = { total: number; days: ContributionDay[] };

/** Last 12 months of contributions (public + private counts as shown on the profile). */
export async function getContributions(user: string): Promise<Contributions | null> {
  const data = await getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(
    `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
  );
  if (!data?.contributions?.length) return null;
  return { total: data.total.lastYear, days: data.contributions };
}

export type GitHubUser = { publicRepos: number; followers: number; createdAt: string };

export async function getGitHubUser(user: string): Promise<GitHubUser | null> {
  const data = await getJson<{ public_repos: number; followers: number; created_at: string }>(
    `https://api.github.com/users/${user}`,
  );
  if (!data) return null;
  return { publicRepos: data.public_repos, followers: data.followers, createdAt: data.created_at };
}

export type RepoStats = { stars: number; language: string | null };

export async function getRepoStats(repo: string): Promise<RepoStats | null> {
  const data = await getJson<{ stargazers_count: number; language: string | null }>(
    `https://api.github.com/repos/${repo}`,
  );
  if (!data) return null;
  return { stars: data.stargazers_count, language: data.language };
}
