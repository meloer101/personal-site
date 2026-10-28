import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  date: string; // YYYY-MM-DD
  tag: string;
  summary: string;
  lang?: "en" | "zh-CN"; // language the post is written in; defaults to English
};

export type Post = PostMeta & { slug: string; minutes: number; lang: "en" | "zh-CN" };

type PostModule = { default: ComponentType; meta: PostMeta };

export function getSlugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function loadPost(slug: string): Promise<PostModule> {
  return import(`../../content/posts/${slug}.mdx`);
}

// ~230 English words or ~400 CJK characters per minute.
function readingMinutes(source: string) {
  const cjk = source.match(/[一-鿿]/g)?.length ?? 0;
  const words = source
    .replace(/[一-鿿]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230 + cjk / 400));
}

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    getSlugs().map(async (slug) => {
      const { meta } = await loadPost(slug);
      const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
      return { ...meta, slug, minutes: readingMinutes(source), lang: meta.lang ?? "en" };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((post) => post.slug === slug);
}
