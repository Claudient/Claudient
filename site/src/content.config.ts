import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content collections that read directly from the repo root.
 * Translations (fr/de/nl/es) are now ENABLED — language is detected from the
 * file path via parseLocaleFromId() in lib/content.ts.
 *
 * Files with malformed YAML frontmatter are explicitly excluded below.
 * Add to this list as additional bad files are discovered during builds.
 */

const patterns = [
  "**/*.md",
  // Exclude file-level globs that are known-bad or non-content (curated):
  "!**/it/**",
  "!**/pt/**",
  "!**/.DS_Store",
];

// Loose schema — most files predate frontmatter, every field optional.
// Computed fallbacks at render time from filename + body.
const contentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  tools: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  related: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  author: z.string().optional(),
  model: z.string().optional(),
  event: z.string().optional(),
});

const makeCollection = (folder: string) =>
  defineCollection({
    loader: glob({
      pattern: patterns,
      base: `../${folder}`,
    }),
    schema: contentSchema,
  });

export const collections = {
  skills: makeCollection("skills"),
  agents: makeCollection("agents"),
  hooks: makeCollection("hooks"),
  mcp: makeCollection("mcp"),
  workflows: makeCollection("workflows"),
  guides: makeCollection("guides"),
  prompts: makeCollection("prompts"),
  rules: makeCollection("rules"),
};
