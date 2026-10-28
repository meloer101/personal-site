// Everything a visitor reads, in both languages. Live GitHub numbers come from src/lib/github.ts.

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Public URL for a site path in a locale: English at the root, Chinese under /zh. */
export function localePath(locale: Locale, path: string) {
  if (locale === "en") return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jacobyu.dev";

/** Per-page canonical + hreflang. Pages must set this themselves: metadata merges shallowly. */
export function alternatesFor(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: { en: path, "zh-CN": localePath("zh", path) },
    types: { "application/rss+xml": "/feed.xml" },
  };
}

export const profile = {
  name: "Jacob Yu",
  githubUser: "meloer101",
  email: "jacobyu80@gmail.com",
  github: "https://github.com/meloer101",
  x: "https://x.com/Jacob615239",
  avatar: "/avatar.jpg",
};

// `stars` and `language` are fallbacks; the build reads live values from the GitHub API.
export const projects = [
  {
    name: "QuantBench",
    repo: "meloer101/QuantBench",
    language: "Python",
    stars: 3,
    description: {
      en: "Local-first AI research workbench for quants: a natural-language strategy idea becomes a reproducible, auditable backtest.",
      zh: "面向本地的量化 AI 研究工作台：把自然语言的策略想法变成可复现、可审计的回测。",
    },
  },
  {
    name: "Industry Survey Assistant",
    repo: "meloer101/Industry_Survey_Assistant",
    language: "Python",
    stars: 0,
    description: {
      en: "Multi-agent investment research pipeline with human-in-the-loop planning, iterative web research and fully cited reports.",
      zh: "多 agent 投研流水线：人在回路的规划、迭代式网络调研，输出带完整引用的报告。",
    },
  },
  {
    name: "Skills-For-best-PMs",
    repo: "meloer101/Skills-For-best-PMs",
    language: "Python",
    stars: 4,
    description: {
      en: "A skills repository for product managers, focused on the hard parts of the job, with reusable analysis frameworks and PRD-writing skills.",
      zh: "为产品经理打造的 skills 仓库：聚焦 PM 工作中的重点难点，提供可借鉴的分析思路和撰写 PRD 的 skills。",
    },
  },
  {
    name: "terminal-reborn",
    repo: "meloer101/terminal-reborn",
    language: "TypeScript",
    stars: 0,
    description: {
      en: "An open-source macOS terminal for running many Claude Code and Codex agents in parallel.",
      zh: "为并行运行多个 coding agent 而做的开源 macOS 终端。",
    },
  },
];

export const copy = {
  en: {
    nav: {
      projects: "Projects",
      writing: "Writing",
      contact: "Contact",
      github: "GitHub profile",
      language: "Language",
    },
    hero: {
      intro:
        "I build at the intersection of AI products and quant research — tools that turn fuzzy ideas into reproducible, auditable output.",
      meta: ["Xiamen, CN", "UTC+8", "Anthropology / Product / Coding / Quant"],
      email: "Email me",
      github: "GitHub",
      avatarAlt: "Jacob's Memoji avatar, winking",
    },
    activity: {
      title: "On GitHub",
      contributions: "contributions",
      repos: "public repos",
      since: "on GitHub since",
      less: "Less",
      more: "More",
    },
    projects: { title: "Selected projects", all: "All repositories", stars: "stars" },
    writing: { title: "Writing", all: "All posts", minutes: "min" },
    contact: {
      title: "Send a signal.",
      line: "Email is the fastest way to reach me.",
      rss: "RSS feed",
    },
    blog: {
      title: "Writing",
      intro: "Notes on AI products, product management and building with agents.",
      back: "Writing",
    },
    footer: { colophon: "Built with Next.js · Set in Geist" },
  },
  zh: {
    nav: { projects: "项目", writing: "文章", contact: "联系", github: "GitHub 主页", language: "语言" },
    hero: {
      intro: "我在 AI 产品和量化研究的交叉处做东西：把模糊的想法变成可复现、可审计的产出。",
      meta: ["中国厦门", "UTC+8", "人类学 / 产品 / 编程 / 量化"],
      email: "发邮件给我",
      github: "GitHub",
      avatarAlt: "Jacob 的 Memoji 头像，正在眨眼",
    },
    activity: {
      title: "GitHub 动态",
      contributions: "次贡献",
      repos: "个公开仓库",
      since: "加入 GitHub",
      less: "少",
      more: "多",
    },
    projects: { title: "代表项目", all: "全部仓库", stars: "star" },
    writing: { title: "文章", all: "全部文章", minutes: "分钟" },
    contact: {
      title: "发个信号吧。",
      line: "邮件是最快的联系方式。",
      rss: "RSS 订阅",
    },
    blog: {
      title: "文章",
      intro: "关于 AI 产品、产品经理工作和用 agent 做东西的笔记。",
      back: "文章",
    },
    footer: { colophon: "用 Next.js 搭建 · 字体为 Geist" },
  },
} satisfies Record<Locale, unknown>;

export type Copy = (typeof copy)["en"];
