/**
 * Build-time content validator.
 *
 * CLAUDE.md §10: "A validation step enforces required fields and the 'no unsourced
 * claim' rule, and fails the build on violation. This is how the neutrality rules
 * become mechanically enforced rather than aspirational."
 *
 * The Zod schemas in src/schemas.ts enforce per-record rules. This script enforces
 * the CROSS-record invariants Zod cannot see — above all the symmetry rules in §2,
 * which are by definition properties of a race, not of a candidate.
 *
 * Run: npm run validate   (also runs automatically before `npm run build`)
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

import {
  officeSchema,
  candidateSchema,
  countWords,
  STATEMENT_MIN_WORDS,
  STATEMENT_MAX_WORDS,
} from '../src/schemas.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Content root; overridable so the test suite can point at fixture sets. */
const CONTENT_ROOT = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : join(ROOT, 'src/content');

const OFFICES_DIR = join(CONTENT_ROOT, 'offices');
const CANDIDATES_DIR = join(CONTENT_ROOT, 'candidates');

/** Ratio tolerance for the §8 equal-word-budget rule within a single race. */
const WORD_BUDGET_TOLERANCE = 1.5;

const errors: string[] = [];
const warnings: string[] = [];

const fail = (where: string, msg: string) => errors.push(`${where}: ${msg}`);
const warn = (where: string, msg: string) => warnings.push(`${where}: ${msg}`);

function loadDir(dir: string, schema: any, kind: string) {
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter((f) => /\.ya?ml$/.test(f));
  const records: any[] = [];

  for (const file of files) {
    const where = `${kind}/${file}`;
    let raw: unknown;
    try {
      raw = parse(readFileSync(join(dir, file), 'utf8'));
    } catch (e) {
      fail(where, `YAML parse error: ${(e as Error).message}`);
      continue;
    }
    const result = schema.safeParse(raw);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.length ? issue.path.join('.') : '(root)';
        fail(where, `${path} — ${issue.message}`);
      }
      continue;
    }
    records.push({ ...result.data, _file: where });
  }
  return records;
}

const offices = loadDir(OFFICES_DIR, officeSchema, 'offices');
const candidates = loadDir(CANDIDATES_DIR, candidateSchema, 'candidates');

// ---------------------------------------------------------------------------
// Uniqueness
// ---------------------------------------------------------------------------
for (const [kind, records] of [
  ['office', offices],
  ['candidate', candidates],
] as const) {
  const seen = new Map<string, string>();
  for (const r of records) {
    if (seen.has(r.id)) fail(r._file, `duplicate ${kind} id "${r.id}" (also in ${seen.get(r.id)})`);
    else seen.set(r.id, r._file);
  }
}

const officesById = new Map(offices.map((o) => [o.id, o]));

// ---------------------------------------------------------------------------
// Per-candidate invariants
// ---------------------------------------------------------------------------
for (const c of candidates) {
  const office = officesById.get(c.office_id);

  if (!office) {
    fail(c._file, `office_id "${c.office_id}" does not match any office record`);
    continue;
  }

  // §6: party is a string for partisan races, null for nonpartisan ones. A stray
  // party label on a nonpartisan judicial or school-board race is exactly the kind
  // of leak that reads as a partisan scorecard.
  if (office.partisan && c.party === null) {
    fail(c._file, `office "${office.id}" is partisan — party is required`);
  }
  if (!office.partisan && c.party !== null) {
    fail(
      c._file,
      `office "${office.id}" is nonpartisan — party must be null, got "${c.party}" (§2, §4)`,
    );
  }

  // §2.3 / §7: the candidate's own words are always attributed to a source.
  if (c.candidate_statement !== null && c.statement_source === null) {
    fail(c._file, 'candidate_statement is present but statement_source is null (§7)');
  }

  // §8: equal word budget, applied to every candidate identically.
  if (c.candidate_statement !== null) {
    const words = countWords(c.candidate_statement);
    if (words < STATEMENT_MIN_WORDS || words > STATEMENT_MAX_WORDS) {
      fail(
        c._file,
        `candidate_statement is ${words} words; the budget is ` +
          `${STATEMENT_MIN_WORDS}–${STATEMENT_MAX_WORDS} for every candidate (§8)`,
      );
    }
  }

  // §2.7 / §14: outreach is logged for every candidate, or the equal-treatment
  // claim on the About page is not true.
  if (c.participation.contacted && c.participation.contacted_date === null) {
    fail(c._file, 'participation.contacted is true but contacted_date is missing (§14)');
  }
  if (!c.participation.contacted) {
    warn(c._file, 'no outreach logged yet — every candidate gets the same invitation (§2.7)');
  }

  // §7: campaign finance figures always link to the filing they came from.
  const cf = c.campaign_finance;
  const hasFigures =
    cf.total_raised !== null || cf.total_spent !== null || cf.self_funded !== null;
  if (hasFigures && cf.source_url === null) {
    fail(c._file, 'campaign_finance has figures but no source_url (§7)');
  }

  if (c.questionnaire.responded && c.questionnaire.responses.length === 0) {
    fail(c._file, 'questionnaire.responded is true but no responses are recorded');
  }
}

// ---------------------------------------------------------------------------
// Per-race (symmetry) invariants — the §2 rules live here
// ---------------------------------------------------------------------------
const byOffice = new Map<string, typeof candidates>();
for (const c of candidates) {
  if (!byOffice.has(c.office_id)) byOffice.set(c.office_id, []);
  byOffice.get(c.office_id)!.push(c);
}

for (const office of offices) {
  const field = byOffice.get(office.id) ?? [];
  const where = office._file;

  if (field.length === 0) {
    warn(where, 'no candidate records yet');
    continue;
  }

  // §2.1: structural equality is the main anti-bias mechanism. A race where only
  // some candidates have a statement is fine ONLY because non-response renders as
  // a neutral, identical line — but the word budget must not diverge among those
  // who did provide one.
  const lengths = field
    .filter((c) => c.candidate_statement !== null)
    .map((c) => ({ id: c.id, words: countWords(c.candidate_statement!) }));

  if (lengths.length > 1) {
    const min = Math.min(...lengths.map((l) => l.words));
    const max = Math.max(...lengths.map((l) => l.words));
    if (max / min > WORD_BUDGET_TOLERANCE) {
      fail(
        where,
        `unequal word budget within this race: ${max} vs ${min} words ` +
          `(ratio ${(max / min).toFixed(2)} > ${WORD_BUDGET_TOLERANCE}). ` +
          'Differential emphasis is the main lever of bias (§2.1, §8).',
      );
    }
  }

  // §4: office-level considerations must never reference a specific candidate.
  for (const consideration of office.voter_considerations) {
    for (const c of field) {
      const surname = c.ballot_name.trim().split(/\s+/).pop()!;
      const named =
        consideration.toLowerCase().includes(c.ballot_name.toLowerCase()) ||
        new RegExp(`\\b${surname}\\b`, 'i').test(consideration);
      if (named) {
        fail(
          where,
          `voter_considerations names candidate "${c.ballot_name}". These are ` +
            'office-level only and never candidate-specific (§4).',
        );
      }
    }
  }

  // §14 completeness: a race with fewer candidates than seats is almost certainly
  // an incomplete record, and "covered every candidate" is the whole claim.
  if (field.length < office.seats_up) {
    warn(
      where,
      `${field.length} candidate record(s) for ${office.seats_up} seat(s) — ` +
        'verify against the county clerk filing list before publishing',
    );
  }

  // Outreach must be uniform across the race, not just present in aggregate.
  const contacted = field.filter((c) => c.participation.contacted).length;
  if (contacted > 0 && contacted < field.length) {
    fail(
      where,
      `outreach is asymmetric: ${contacted} of ${field.length} candidates contacted. ` +
        'Every candidate gets the same invitation (§2.7).',
    );
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const counted = `${offices.length} office(s), ${candidates.length} candidate(s)`;

if (warnings.length) {
  console.warn(`\n⚠  ${warnings.length} warning(s):`);
  for (const w of warnings) console.warn(`   ${w}`);
}

if (errors.length) {
  console.error(`\n✖  ${errors.length} error(s) — build blocked:`);
  for (const e of errors) console.error(`   ${e}`);
  console.error('\nSee CLAUDE.md §2 (Prime Directive) and §7 (sourcing rules).\n');
  process.exit(1);
}

console.log(`✓  Content validated — ${counted}, no violations.`);
