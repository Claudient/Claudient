import type { CollectionEntry, CollectionKey } from "astro:content";

/**
 * Utilities for working with content entries that may lack frontmatter.
 * Every helper here computes graceful fallbacks from the file path and
 * body so the site renders correctly even for older .md files written
 * before the frontmatter convention existed.
 */

/* ---- Locale handling ---- */

export const SUPPORTED_LOCALES = ["en", "fr", "de", "nl", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const NON_DEFAULT_LOCALES: ReadonlySet<string> = new Set(
  SUPPORTED_LOCALES.filter((l) => l !== DEFAULT_LOCALE),
);

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/**
 * Inspect an entry id like "small-business/fr/invoice-chaser" and split out
 * the locale segment. Returns the canonical English-style path so all
 * downstream URL/title helpers don't need to know about translations.
 *
 * Examples:
 *   small-business/invoice-chaser       → { locale: "en", cleanPath: "small-business/invoice-chaser" }
 *   small-business/fr/invoice-chaser    → { locale: "fr", cleanPath: "small-business/invoice-chaser" }
 *   backend/nodejs/de/nextjs            → { locale: "de", cleanPath: "backend/nodejs/nextjs" }
 *   advisors/es/chief-of-staff          → { locale: "es", cleanPath: "advisors/chief-of-staff" }
 */
export function parseLocaleFromId(id: string): {
  locale: Locale;
  cleanPath: string;
} {
  const cleaned = id.replace(/\.md$/, "");
  const parts = cleaned.split("/").filter(Boolean);
  for (let i = 0; i < parts.length; i++) {
    if (NON_DEFAULT_LOCALES.has(parts[i])) {
      const locale = parts[i] as Locale;
      const cleanPath = [...parts.slice(0, i), ...parts.slice(i + 1)].join("/");
      return { locale, cleanPath };
    }
  }
  return { locale: DEFAULT_LOCALE, cleanPath: parts.join("/") };
}

export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/* ---- Path parts ---- */

export interface PathParts {
  /** filename without extension (e.g. "invoice-chaser") */
  slug: string;
  /** top-level folder (e.g. "small-business") */
  category: string;
  /** second-level folder, if present (e.g. "nodejs" for skills/backend/nodejs/...) */
  subcategory: string | null;
  /** the full path joined for URL building, locale-stripped */
  path: string;
  /** raw split path parts (locale-stripped) */
  parts: string[];
  /** detected locale from the file path */
  locale: Locale;
}

export function pathToParts(id: string): PathParts {
  const { locale, cleanPath } = parseLocaleFromId(id);
  const parts = cleanPath.split("/").filter(Boolean);
  const slug = parts[parts.length - 1] ?? "index";
  const category = parts.length > 1 ? parts[0] : "general";
  const subcategory = parts.length > 2 ? parts[1] : null;
  return {
    slug,
    category,
    subcategory,
    path: cleanPath,
    parts,
    locale,
  };
}

export function slugToTitle(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => {
      if (word.length <= 2 && word === word.toLowerCase()) {
        // small connectors stay lowercase except first word
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

export function titleFromEntry(
  entry: CollectionEntry<CollectionKey>,
): string {
  if (entry.data?.title) return entry.data.title;
  const body = (entry as { body?: string }).body ?? "";
  const h1 = body.match(/^#\s+(.+?)$/m);
  if (h1) return h1[1].trim();
  return slugToTitle(pathToParts(entry.id).slug);
}

export function descriptionFromEntry(
  entry: CollectionEntry<CollectionKey>,
  maxLength = 200,
): string {
  if (entry.data?.description) return entry.data.description;
  const body = (entry as { body?: string }).body ?? "";
  const lines = body.split("\n");
  let foundH1 = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!foundH1 && line.startsWith("# ")) {
      foundH1 = true;
      continue;
    }
    if (
      foundH1 &&
      line &&
      !line.startsWith("#") &&
      !line.startsWith(">") &&
      !line.startsWith("---") &&
      !line.startsWith("![")
    ) {
      // strip markdown formatting (bold, italic, links) for clean meta
      const clean = line
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/\[(.+?)\]\([^)]+\)/g, "$1")
        .replace(/`([^`]+)`/g, "$1");
      if (clean.length > maxLength) {
        return clean.slice(0, maxLength - 1).trimEnd() + "…";
      }
      return clean;
    }
  }
  return "";
}

export function groupByCategory<T extends CollectionEntry<CollectionKey>>(
  entries: T[],
): Array<{ category: string; entries: T[] }> {
  const map = new Map<string, T[]>();
  for (const entry of entries) {
    const { category } = pathToParts(entry.id);
    const list = map.get(category) ?? [];
    list.push(entry);
    map.set(category, list);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, entries]) => ({
      category,
      entries: entries.sort((a, b) =>
        titleFromEntry(a).localeCompare(titleFromEntry(b)),
      ),
    }));
}

export function urlForEntry(
  collection: string,
  entry: CollectionEntry<CollectionKey>,
): string {
  const { path, locale } = pathToParts(entry.id);
  return `${localePrefix(locale)}/${collection}/${path}/`;
}

/**
 * Group a list of entries by their detected locale.
 * Returned map keys are locale codes.
 */
export function groupByLocale<T extends CollectionEntry<CollectionKey>>(
  entries: T[],
): Map<Locale, T[]> {
  const result = new Map<Locale, T[]>();
  for (const entry of entries) {
    const { locale } = pathToParts(entry.id);
    const list = result.get(locale) ?? [];
    list.push(entry);
    result.set(locale, list);
  }
  return result;
}

/**
 * Get all locales for which a given canonical path exists across the
 * provided entry list. Used to emit hreflang alternates per page.
 */
export function localesForPath(
  cleanPath: string,
  allEntries: CollectionEntry<CollectionKey>[],
): Locale[] {
  const locales: Locale[] = [];
  for (const entry of allEntries) {
    const { cleanPath: ePath, locale } = parseLocaleFromId(entry.id);
    if (ePath === cleanPath && !locales.includes(locale)) {
      locales.push(locale);
    }
  }
  return locales;
}

// ---- Feature helpers ----

export interface RelatedEntry {
  title: string;
  url: string;
  description?: string;
}

/**
 * Returns up to `max` related entries.
 * First checks frontmatter `related: [slug, ...]` (slugs matched against entry.id
 * without the .md extension). Falls back to same-category peers.
 */
export function getRelatedEntries(
  entry: CollectionEntry<CollectionKey>,
  allEntries: CollectionEntry<CollectionKey>[],
  collection: string,
  max = 3,
): RelatedEntry[] {
  const relatedSlugs: string[] | undefined = (entry.data as { related?: string[] }).related;

  if (relatedSlugs && relatedSlugs.length > 0) {
    const results: RelatedEntry[] = [];
    for (const slug of relatedSlugs) {
      const found = allEntries.find(
        (e) => e.id.replace(/\.md$/, "") === slug || pathToParts(e.id).slug === slug,
      );
      if (found && found.id !== entry.id) {
        results.push({
          title: titleFromEntry(found),
          url: urlForEntry(collection, found),
          description: descriptionFromEntry(found),
        });
      }
      if (results.length >= max) break;
    }
    if (results.length > 0) return results;
  }

  // Fallback: same category peers
  const { category } = pathToParts(entry.id);
  return allEntries
    .filter((e) => e.id !== entry.id && pathToParts(e.id).category === category)
    .slice(0, max)
    .map((e) => ({
      title: titleFromEntry(e),
      url: urlForEntry(collection, e),
      description: descriptionFromEntry(e),
    }));
}

/**
 * Estimates reading time in minutes at 200 words per minute.
 */
export function readingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface TocHeading {
  depth: number;
  text: string;
  slug: string;
}

/**
 * Extracts H2 and H3 headings from markdown body for table-of-contents use.
 */
export function extractHeadings(body: string): TocHeading[] {
  const lines = body.split("\n");
  const headings: TocHeading[] = [];
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)$/);
    const m3 = !m2 ? line.match(/^###\s+(.+)$/) : null;
    const match = m2 ?? m3;
    if (!match) continue;
    const depth = m2 ? 2 : 3;
    // strip markdown formatting: bold, italic, code, links
    const text = match[1]
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[(.+?)\]\([^)]+\)/g, "$1")
      .trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ depth, text, slug });
  }
  return headings;
}
