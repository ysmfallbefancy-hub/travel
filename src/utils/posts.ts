import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../consts';

export type Post = CollectionEntry<'blog'>;

/** Alle veröffentlichten Beiträge, neueste zuerst. Entwürfe nur im Dev-Modus. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString(SITE.locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Geschätzte Lesezeit in Minuten (ca. 200 Wörter pro Minute). */
export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
