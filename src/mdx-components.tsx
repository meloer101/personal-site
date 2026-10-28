import type { MDXComponents } from "mdx/types";

// Article typography lives in `.prose-site` (globals.css); no per-element overrides needed.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
