import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string().max(160),
    heroImage: z.string().optional(),
    techStack: z.array(z.string()),
    role: z.string().optional(),
    date: z.coerce.date(),
    demoUrl: z.string().url().optional(),
    githubUrl: z.string().url(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
