import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * Returns all non-draft projects sorted by date descending.
 * Throws a build error if more than one project has featured: true.
 */
export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);

  const featured = all.filter((p) => p.data.featured);
  if (featured.length > 1) {
    throw new Error(
      `[portfolio] Build error: ${featured.length} projects have featured: true — only one is allowed.\n` +
        `Remove featured: true from all but one of these files:\n` +
        featured.map((p) => `  • ${p.data.slug}`).join('\n')
    );
  }

  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
