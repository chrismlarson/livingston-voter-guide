/**
 * Content schemas for the Livingston County Voter Guide.
 *
 * These mirror the record shapes in CLAUDE.md §6 and mechanically enforce the
 * sourcing rules in §7. Anything the schema rejects fails the build (§10).
 *
 * This module is imported by BOTH:
 *   - src/content.config.ts  (Astro content collections)
 *   - scripts/validate-content.ts  (standalone pre-build validator)
 * so it must not import anything Astro-specific.
 */

import { z } from 'zod';

/** Prose budget per candidate, in words (§8). Enforced identically for everyone. */
export const STATEMENT_MIN_WORDS = 120;
export const STATEMENT_MAX_WORDS = 220;

/**
 * An ISO date. YAML 1.1 parses an unquoted `2026-08-16` into a Date, while a quoted
 * one stays a string — and the two loaders in this project disagree about which.
 * Normalize both to `YYYY-MM-DD` so content editors never have to think about quoting.
 */
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Dates must be ISO format YYYY-MM-DD (§7: date-stamp everything)'),
);

const url = z.string().url('Must be a full URL including https://');

/** A citation. Every substantive claim carries one (§7). */
const source = z.object({
  note: z.string().min(1, 'Say what this source supports'),
  url,
});

/**
 * §5 / §13: city or township only, never a street address. This is a heuristic
 * backstop, not a substitute for review — it catches the common paste-the-whole-
 * address-off-the-filing mistake.
 */
const residence = z
  .string()
  .min(1)
  .refine((v) => !/\d{2,}\s+\w/.test(v), {
    message:
      'Residence must be a city or township only — never a street address (CLAUDE.md §5, §13)',
  });

export const LEVELS = ['federal', 'state', 'county', 'township', 'school', 'other'] as const;

export const officeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  jurisdiction: z.string().min(1),
  level: z.enum(LEVELS),
  partisan: z.boolean(),
  seats_up: z.number().int().positive(),
  term_years: z.number().int().positive(),
  salary: z.number().nullable(),
  election_id: z.string().min(1),

  /** Plain-language, neutral: what this office actually does (§8). */
  description: z.string().min(1),

  /**
   * §4: the ONE place editorializing is allowed — and it is never about
   * candidates. Office-level only. The cross-reference check in the validator
   * rejects any consideration that names a candidate.
   */
  voter_considerations: z.array(z.string().min(1)).min(1),

  sources: z.array(source).min(1, 'Every office record needs at least one source (§7)'),
  last_updated: isoDate,
});

/** Endorsements are plain facts, unranked (§4) — and always sourced (§7). */
const endorsement = z.object({
  endorser: z.string().min(1),
  source_url: url,
  date: isoDate,
});

/**
 * §4 inclusion test. Only items passing all three prongs — public record,
 * material to the office, symmetric standard — belong here. The schema can
 * only enforce prong 1 (a real citation); prongs 2 and 3 are human judgment,
 * so we require them to be affirmed explicitly rather than assumed.
 */
const publicRecordItem = z.object({
  fact: z.string().min(1),
  source_url: url,
  date: isoDate,
  /** Affirmation that a human applied §4 prongs 2 and 3 to this item. */
  inclusion_test: z.object({
    material_to_office: z.literal(true, {
      errorMap: () => ({
        message:
          'A public_record item must be material to the office sought (§4 prong 2). ' +
          'If it is not, remove it — do not ship it as false.',
      }),
    }),
    symmetric_standard: z.literal(true, {
      errorMap: () => ({
        message:
          'You must affirm you would include the equivalent fact for a candidate of any ' +
          'party (§4 prong 3).',
      }),
    }),
    rationale: z.string().min(1, 'Record briefly why this passes the §4 test — it is auditable.'),
  }),
});

export const candidateSchema = z.object({
  id: z.string().min(1),
  ballot_name: z.string().min(1),
  office_id: z.string().min(1),
  party: z.string().nullable(),
  incumbent: z.boolean(),

  photo: z
    .object({
      url,
      /** §7 / §13: candidate-provided or properly licensed only. Never scraped news photos. */
      credit: z.string().min(1),
      license: z.string().min(1),
    })
    .nullable(),

  residence,
  current_occupation: z.string().nullable(),
  education: z.array(z.string().min(1)),
  career: z.array(z.string().min(1)),

  /**
   * The candidate's OWN words (§2.3). Null when none was provided — which is a
   * fact about available information, not a verdict (§4), and renders as a
   * neutral line applied identically to everyone.
   */
  candidate_statement: z.string().nullable(),
  /** Where the statement came from. Required whenever a statement exists (§7). */
  statement_source: url.nullable(),

  website: url.nullable(),
  social: z.array(z.object({ platform: z.string().min(1), url })),

  endorsements: z.array(endorsement),

  /**
   * Third-party qualification ratings (bar associations and similar).
   *
   * These are the single most dangerous field in the schema. Most raters are opt-in,
   * so an absent rating usually means the candidate did not participate — but printed
   * beside a rated opponent it reads as a bad grade. The validator therefore requires
   * that if ANY candidate in a race carries an entry from a given rater, EVERY candidate
   * in that race carries one, with `rating: null` meaning "not rated" and `note`
   * carrying the neutral explanation of what that does and does not mean (§2.1, §4).
   */
  ratings: z.array(
    z.object({
      rater: z.string().min(1),
      /** The rating as the rater published it, or null if this candidate is unrated. */
      rating: z.string().nullable(),
      source_url: url,
      date: isoDate.nullable(),
      /** Required when rating is null — explains why, so absence is not read as a grade. */
      note: z.string().nullable(),
    }),
  ),

  /** Topline only — link the filing, never cherry-pick donors (§6). */
  campaign_finance: z.object({
    total_raised: z.number().nullable(),
    total_spent: z.number().nullable(),
    self_funded: z.number().nullable(),
    report_date: isoDate.nullable(),
    source_url: url.nullable(),
  }),

  public_record: z.array(publicRecordItem),

  questionnaire: z.object({
    responded: z.boolean(),
    source_url: url.nullable(),
    responses: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })),
  }),

  /** The equal-outreach record (§2.7, §14). Defuses "he only covered his side." */
  participation: z.object({
    contacted: z.boolean(),
    contacted_date: isoDate.nullable(),
    responded: z.boolean(),
  }),

  sources: z.array(source),
  last_updated: isoDate,
});

export type Office = z.infer<typeof officeSchema>;
export type Candidate = z.infer<typeof candidateSchema>;

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
