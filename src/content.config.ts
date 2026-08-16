import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { officeSchema, candidateSchema } from './schemas.ts';

/**
 * Content lives as YAML in git so the whole dataset is version-controlled,
 * auditable and diff-able — which is itself the neutrality evidence (CLAUDE.md §16).
 *
 * These schemas are shared with scripts/validate-content.ts. Astro fails the build
 * on a schema violation; the validator additionally catches the cross-record
 * symmetry rules that a per-record schema cannot express.
 */

const offices = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/offices' }),
  schema: officeSchema,
});

const candidates = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/candidates' }),
  schema: candidateSchema,
});

export const collections = { offices, candidates };
