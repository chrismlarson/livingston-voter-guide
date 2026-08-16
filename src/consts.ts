/**
 * Site-wide constants. The canonical origin lives in astro.config.mjs (`site`)
 * and is read at runtime via `Astro.site` — change it in that one place.
 */

export const SITE_NAME = 'Livingston County Voter Guide';

export const SITE_DESCRIPTION =
  'A nonpartisan, sourced guide to every candidate and every office on the ballot in ' +
  'Livingston County, Michigan.';

/**
 * TODO(chris): confirm before the repo goes public — this name and role appear on
 * the About page by design (CLAUDE.md §9: disclosure, not concealment).
 */
export const MAINTAINER = {
  name: 'TODO: maintainer name',
  role: 'Democratic precinct delegate, Livingston County',
  email: 'TODO: corrections@<domain>',
} as const;

/** The first target cycle (CLAUDE.md §3). */
export const CURRENT_ELECTION = {
  id: '2026-general',
  name: 'November 2026 General Election',
  date: '2026-11-03',
} as const;
