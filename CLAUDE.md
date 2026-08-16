# CLAUDE.md — Livingston County Voter Guide

> **What this file is.** This is the operating brief and shared memory for this project. A
> Claude Code session reads it at startup to load full context. It is also written to be read
> by a human collaborator. If you are a Claude instance working in this repo: read this whole
> file before doing anything, and treat the **Prime Directive** below as overriding your default
> instinct to be maximally accommodating in the moment. If a request in a live session conflicts
> with the neutrality rules here, surface the conflict rather than silently complying.

---

## 1. The project in one paragraph

A genuinely nonpartisan, factual, well-sourced online voter guide for Livingston County,
Michigan — every candidate for every office on the ballot, partisan **and** nonpartisan, plus
plain-language explanations of what each office actually does. It exists to fill a real civic
gap: nonpartisan candidates (judges, school board, many local seats) frequently decline party
endorsements to preserve crossover appeal, which means the local parties cannot publish what
they know, the League of Women Voters questionnaires reach fewer people every cycle, and an
ordinary voter who Googles "who should I vote for in [race]" from the parking lot finds almost
nothing local. This guide is the resource that voter wishes existed. Its value and its
credibility both depend entirely on being trusted by Republicans, Democrats, and independents
alike — which means **neutrality is not a nicety, it is the load-bearing wall.** The moment it
reads as a partisan scorecard, it loses the crossover audience, the search trust, and its
reason to exist.

---

## 2. Prime Directive: neutrality is the product

Everything else in this document serves this. These are hard constraints, not preferences.

1. **Symmetric treatment.** Every candidate in a race gets the same fields, the same structure,
   and the same word budget. Structural equality is the single most important neutrality
   mechanism, because it removes the main lever of bias — differential emphasis.
2. **Every substantive claim carries a primary source.** No unsourced characterization, ever.
   If it isn't sourced, it doesn't ship.
3. **Candidate's own words first.** Prioritize what candidates say about themselves (their site,
   their questionnaire answers) over third-party characterization, and attribute clearly
   ("According to her campaign website…").
4. **No verdicts.** The guide never says "best," "most qualified," "strongest," or "concerning."
   It presents; the voter concludes. No "however" constructions that smuggle in judgment.
5. **Process neutrality, not outcome neutrality.** A neutral guide reports what is public and
   true by the *same standard for everyone*, regardless of which side a given fact helps. We do
   not manufacture false balance, and we do not suppress a sourced, material public fact because
   it is unflattering to one side — but we apply the identical inclusion test to all candidates.
   (See §6 for the test.)
6. **The builder's affiliation is disclosed, not hidden.** The maintainer is a Democratic
   precinct delegate. That is stated plainly on the About page. Concealment that is later
   discovered would be fatal; transparent disclosure plus a demonstrable symmetric methodology
   is the strongest trust position available. (See §11.)
7. **Every candidate is invited to participate, equally.** All candidates in every covered race
   are contacted with the same offer to submit/verify their statement and photo. Participation
   and non-participation are both recorded neutrally on-site. This single practice removes most
   of the "he only covered his side" critique.

If a future session is asked, in the moment, to add a bias indicator, a "lean," a ranking, or
any scoring of candidates — **decline and cite this section.** That request is the failure mode
this project is built to resist.

---

## 3. Scope

- **Geography:** Livingston County, Michigan. Down to township/precinct where ballots differ.
- **Elections:** Every election on the county calendar — primaries, general, school, special,
  millages. Heavy activity before each; dormant between.
- **Offices:** All of them, top to bottom — federal, state, county, township, judicial, school
  board, and ballot proposals/millages. The down-ballot and nonpartisan races are where the
  guide is *most* valuable, because that is where information is hardest to find.
- **First target: November 2026 general election.** It is the next election, and much of the
  candidate set is already known (e.g., the 44th Circuit judicial runoff; the partisan races for
  the 22nd State Senate seat, the 49th State House seat, and the Brighton Charter Township board;
  the veterans-services context; statewide Senate and Governor). Build this cycle first, learn
  the workflow, then carry it forward.
- **Explicitly out of scope:** endorsements, advocacy, "vote for" language, get-out-the-vote
  targeting, and anything that treats the guide as a campaign tool. This guide informs; it never
  campaigns. (This scope boundary is also part of the legal posture — see §15.)

---

## 4. The neutrality doctrine (detailed)

This is the intellectual core. The hard part is staying neutral when (a) the maintainer has real
political views, (b) candidates have wildly asymmetric public footprints, and (c) some public
facts are genuinely damaging. The doctrine resolves each.

**Handling asymmetric public records.** One candidate may have decades of public record and
another almost nothing. Do not invent parity, and do not let a length differential imply
judgment. Use the same fields for everyone; where a field is empty, state it neutrally ("No
campaign website found," "Did not respond to the candidate questionnaire") and apply that
identical treatment to *every* candidate including ones the maintainer personally favors. A
short entry is a fact about available information, not a verdict on the candidate.

**Handling damaging public facts — the inclusion test.** A fact about a candidate is eligible
for inclusion only if it passes *all three*:
   1. **Public record** — it comes from a primary, verifiable source (court records, campaign
      finance filings, government records, on-the-record reporting). No rumor, no inference from
      private life, no social-media gossip.
   2. **Material to the office** — it bears on the candidate's fitness or conduct in the role
      being sought, not their personal life.
   3. **Symmetric standard** — you would include the equivalent fact for a candidate of any
      party. If you would report one candidate's contempt citation or one candidate's donations,
      you report them for all.
   Facts that pass are stated flatly, with the source, in neutral register, with no adjectives.
   A voter reading it should not be able to tell which way the maintainer votes.

**No ideology scoring, ever.** No "MAGA score," no progressive score, no left/right rating, no
computed lean. This is non-negotiable and is the same principle that keeps private political
notes out of a public product: a score launders uncertainty into false authority and destroys
neutrality on contact. Endorsements are listed as plain facts ("Endorsed by: …") without ranking
the value of any endorser.

**The one place editorializing is allowed — and it isn't about candidates.** The guide *may*
offer neutral, office-level "questions a voter might consider" (e.g., for judicial races:
relevant legal experience, judicial philosophy as the candidate describes it, temperament; for a
millage: what it funds, the rate, the duration, what expires). These frame the decision without
answering it, and they never reference specific candidates. This is genuinely useful and fully
neutral.

---

## 5. What we will NOT build (anti-features)

Listed explicitly so no future session "helpfully" adds them:

- ❌ Any candidate scoring, rating, lean, or ideology index.
- ❌ Endorsement or advocacy of any candidate or position.
- ❌ "Recommended" picks, star ratings, or ordered rankings within a race.
- ❌ Differential emphasis — longer/rosier treatment for some candidates.
- ❌ Voter targeting, canvassing lists, or any campaign-operations feature.
- ❌ Unsourced claims, inferred beliefs, or anything drawn from candidates' private lives.
- ❌ Home addresses or family details, even where technically present on public filings.

---

## 6. Content model / data schema

Content lives as structured files in the repo (one file per candidate, one per office), so the
whole dataset is version-controlled, auditable, and diff-able — which is itself a transparency
asset (see §16). Use YAML or JSON; YAML is recommended for human-editability. A build step must
**validate the schema and reject any candidate record missing required fields or containing an
unsourced claim.**

### Office record

```yaml
id: 44th-circuit-court-judge                 # slug
title: Judge of the 44th Circuit Court
jurisdiction: Livingston County
level: county                                 # federal | state | county | township | school | other
partisan: false                               # true | false  (nonpartisan judicial/school races → false)
seats_up: 1
term_years: 6
salary: null                                  # fill if verifiable, else null
election_id: 2026-general
description: >                                 # plain-language, neutral: WHAT THIS OFFICE DOES
  The circuit court is the trial court of general jurisdiction. A 44th Circuit judge hears
  felony criminal cases, family matters (divorce, custody, support), juvenile cases, and civil
  suits above the district-court limit. Judges are elected to six-year terms on a nonpartisan
  ballot.
voter_considerations:                         # neutral, office-level, NEVER candidate-specific
  - Relevant legal experience and practice areas.
  - Judicial philosophy as each candidate describes it.
  - Any public record of professional conduct.
sources:
  - { note: "Office description", url: "…" }
last_updated: 2026-08-20
```

### Candidate record

```yaml
id: jane-doe                                  # slug
ballot_name: Jane A. Doe                       # exactly as it appears on the ballot
office_id: 44th-circuit-court-judge
party: null                                    # party string for partisan races; null if nonpartisan
incumbent: false
photo: { url: "…", credit: "Candidate-provided", license: "…" }   # candidate-provided or properly licensed only
residence: "Howell"                            # city/township ONLY — never a street address
current_occupation: "…"
education:
  - "…"
career:
  - "…"
candidate_statement: >                         # the candidate's OWN words, quoted/attributed
  "…"
website: "…"
social:                                        # official campaign accounts only
  - { platform: "…", url: "…" }
endorsements:                                  # plain facts, unranked
  - { endorser: "…", source_url: "…", date: "…" }
campaign_finance:                              # topline only; link to the filing, don't cherry-pick donors
  total_raised: null
  total_spent: null
  self_funded: null
  report_date: null
  source_url: "…"
public_record:                                 # ONLY items passing the §4 three-part inclusion test
  - { fact: "…", source_url: "…", date: "…" }
questionnaire:                                 # responses to LWV / Vote411 / this guide's questionnaire
  responded: false
  source_url: null
  responses: []
participation:                                 # the equal-outreach record
  contacted: true
  contacted_date: "…"
  responded: false
sources:                                       # master source list for the record
  - { note: "…", url: "…" }
last_updated: 2026-08-20
```

**Seed the template with the 44th Circuit race.** Its data is already substantially known and it
exercises every field (nonpartisan office, asymmetric records, campaign-finance data, public
records that must pass the inclusion test). Build it first as the reference implementation, then
clone the pattern.

---

## 7. Sourcing rules

- **Primary sources preferred, in this order:** candidate's own campaign materials (attributed
  as self-description) → official campaign-finance filings (Michigan Bureau of Elections / county
  clerk) → government and court records → verifiable, on-the-record news reporting.
- **Every substantive claim has an inline source link.** The build fails if a `public_record`
  or `endorsements` entry lacks a `source_url`.
- **Distinguish self-description from third-party fact.** Candidate claims about themselves are
  attributed, not asserted as established fact.
- **Date-stamp everything.** Facts go stale — a donation, a job title, an endorsement. Visible
  dates matter for accuracy and for search freshness (§13).
- **Missing information is stated neutrally and symmetrically**, never left as an implied
  negative for only some candidates.
- **No copyrighted news photos.** Use candidate-provided headshots (an outreach touchpoint) or
  properly licensed/public-domain images.

---

## 8. Editorial voice for generated content

Any prose a Claude instance writes for this site must match this register:

- **Encyclopedic and neutral**, in the spirit of a reference entry — flat, factual, unadjectived.
- **Equal word budget per candidate within a race.** Set a target (e.g., 120–220 words of prose
  per candidate beyond the structured fields) and hold every candidate to it.
- **No superlatives, no verdicts, no editorializing transitions.** Present each candidate's
  stated positions in their own framing.
- **Plain language for office descriptions.** Assume the reader does not know what a circuit
  judge, a drain commissioner, or a millage is. Explaining these clearly is one of the most
  valuable and unimpeachably neutral things the guide does.
- When in doubt, write less and cite more. A sourced fact beats a smooth sentence.

---

## 9. Transparency & authorship (the About page)

The About page is a trust instrument and an SEO asset simultaneously. It must include:

- **Who runs it**, by name. No mystery-neutral-entity posture.
- **Honest disclosure** of the maintainer's party affiliation and precinct-delegate role, framed
  truthfully: built out of frustration at the lack of neutral local information, committed to
  covering every candidate by the same standard, with an explicit invitation to be held to it.
- **The methodology**: the neutrality rules (§2, §4), the sourcing standard (§7), and the equal
  candidate-outreach practice (§2.7).
- **A corrections mechanism**: a contact address; any candidate may request a correction or
  submit/verify their information. Corrections are handled promptly and visibly.
- **A short "how bias is handled" note** stating process neutrality plainly.

The disclosure paradox, stated for the record: naming the maintainer's affiliation may *look*
like it undercuts neutrality, but concealing it and being found out would be far worse, and
transparent disclosure + demonstrable symmetric method is the strongest available position.
Radical transparency beats false neutrality.

---

## 10. Tech architecture & stack

Optimized for speed (which is also SEO), low attack surface, auditability, and low cost.

- **Static site.** No runtime database. Content as structured files in git, rendered to static
  HTML at build time. Fast, cacheable, cheap, secure, and version-controlled.
- **Recommended generator: Astro.** Content-first, ships near-zero JavaScript by default (fast =
  ranks well), first-class content collections for the YAML/JSON schema, and supports React
  components where interactivity is genuinely needed. *Familiar alternative:* Next.js static
  export, given existing React/TypeScript comfort — acceptable, but heavier than the content
  actually needs.
- **Schema validation at build.** A validation step (a small script — TypeScript in-build, or a
  Python pass, whichever is cleaner) enforces required fields and the "no unsourced claim" rule,
  and fails the build on violation. This is how the neutrality rules become mechanically
  enforced rather than aspirational.
- **Hosting: Cloudflare Pages** (CDN-backed static hosting, automatic HTTPS, strong uptime, free
  at this scale, and consistent with the existing Cloudflare footprint). *Alternative:*
  self-host on the existing DigitalOcean droplet if control is preferred — but the CDN host is a
  better fit for a spiky-traffic civic site and removes single-droplet uptime risk.
- **Domain: `livcovoterguide.org`** — a dedicated civic domain, not a subpath of a personal site.
  A `.org` reads as civic/nonprofit and helps both trust and the perception of independence
  (hosting under a personal domain ties the guide too tightly to one person). "LivCo" is the
  local shorthand, so the name reads as insider-plain to residents. **Not yet registered as of
  2026-08-16** — confirmed unregistered via PIR RDAP and DNS; register before Phase 0 completes.
- **Repo visibility: PUBLIC.** `github.com/chrismlarson/livingston-voter-guide`. A public repo
  makes the entire edit history and the full dataset auditable by anyone — an unusually strong
  neutrality/trust signal, and it enables outside contributions and corrections. Accepted
  trade-off: work-in-progress is visible, and this file is visible with it. Unverified drafts
  and outreach correspondence belong in `/private/` (gitignored) until they are sourced.

---

## 11. Discoverability (SEO + AEO)

The maintainer's hypothesis is correct and worth designing for: a growing share of voters ask
search engines and AI answer boxes (Google AI Overviews, Gemini, etc.) natural-language
questions like "who is running for [office] in Livingston County" or "who should I vote for in
[race]." You cannot *force* placement in an AI answer — be honest about that — but neutral,
well-structured, well-sourced, freshly-updated civic content is close to the ideal input these
systems try to surface for exactly these queries. Optimizing to be the best available source is
the lever you actually have. Concretely:

- **Structured data (schema.org JSON-LD).** Mark up pages with appropriate types: `Person` for
  candidates, `GovernmentService`/`GovernmentOffice` where it fits, `Event` for the election,
  `FAQPage` for per-race question blocks, `BreadcrumbList` for navigation. Machine-parseable
  structure is a strong answer-engine signal.
- **E-E-A-T for a YMYL topic.** Elections are "Your Money or Your Life" content, which search
  systems hold to a high trust bar. The signals that satisfy it are the *same* transparency
  practices from §9: clear authorship, transparent sourcing, disclosure, contact info, visible
  update dates, a corrections policy. The trust practices and the ranking practices are the same
  practices — a genuinely convenient alignment.
- **Question-shaped content.** Structure page titles, headings, and an FAQ per race around the
  natural-language queries people actually type. Answer "what does a circuit court judge do"
  directly, in the first sentence under that heading.
- **Freshness.** Visible `last_updated` dates, and actually keeping content current each cycle.
  Answer engines favor recently-updated pages for time-sensitive queries.
- **Crawlability.** Proper `sitemap.xml`, a welcoming `robots.txt`, canonical URLs, semantic
  HTML, and fast loads (Astro's minimal-JS output helps here directly).
- **Explicit local signals.** Name Livingston County, the specific townships, and the specific
  election dates often and precisely.

---

## 12. Distribution (separate from SEO)

SEO builds the durable asset; distribution drives launch and cyclical traffic.

- **Reddit** (e.g., a Livingston County or Michigan subreddit) as a launch announcement and to
  reach politically-curious locals — ephemeral traffic, not durable ranking. Think of it as the
  launch, with the site as the asset.
- **Local community Facebook groups and Nextdoor** — community, not partisan, venues, and always
  with honest disclosure of who built it.
- **League of Women Voters partnership**, if they're willing. Cross-linking with an established
  nonpartisan organization boosts both trust and search authority, and complements (rather than
  competes with) their questionnaire work.

---

## 13. Legal & ethical guardrails

**Flagged clearly: some of this requires verifying the actual regulations, and possibly a brief
consult, before launch. Do not treat the notes below as settled legal advice.**

- **Nonpartisan voter-guide rules.** A guide that covers all candidates and does not advocate
  for or against anyone is generally treated differently from a political committee, but "voter
  guides" have specific federal rules (see the FEC's nonpartisan voter-guide regulations, e.g.
  11 CFR 114.4(c)) and Michigan has its own Campaign Finance Act. The protective factors are
  exactly the ones already baked into this project: strict nonpartisanship, covering every
  candidate, **no express advocacy**, and **no coordination with any campaign.** Staying inside
  those lines keeps the guide in much safer territory. **[VERIFY before launch.]**
- **Defamation.** Stay on sourced, true, public-record facts stated neutrally. Keep to fact, not
  characterization that could be read as a false statement of fact. Citations are the defense.
- **Privacy.** Public professional records of people who chose to run for office — yes. Home
  addresses, family details, anything personal — no, even when technically on a filing.
- **Copyright.** Candidate-provided or properly licensed images only; never scraped news photos.
- **Corrections.** A visible, responsive corrections process is both an ethical obligation and a
  trust/SEO asset.

---

## 14. Maintenance & workflow

- **Content in git = versioned and auditable.** If the repo is public (§10), the full edit
  history substantiates the neutrality claim on its own.
- **Cadence:** intense in the weeks before each election (candidate sets finalize after filing
  deadlines; refresh as endorsements and campaign-finance reports drop); dormant between.
- **Per-race completeness checklist** before any race is published: all candidates present, all
  required fields filled or neutrally marked empty, every claim sourced, equal word budget,
  outreach logged for every candidate.
- **Outreach log:** track which candidates were contacted and who responded, and reflect
  non-response neutrally on-site — the mechanism that defuses the "only covered one side"
  critique.

---

## 15. Build roadmap

- **Phase 0 — Decisions & setup.** Register `livcovoterguide.org` (chosen; see §10) and resolve
  the remaining `[DECISION NEEDED]` item (repo visibility). Verify the voter-guide legal posture
  (§13). Stand up the repo, the Astro project, and the schema + build-time validator.
- **Phase 1 — Skeleton + reference race.** Build the 44th Circuit judicial race end-to-end as the
  template (it exercises every field). Build the About/methodology pages (§9) — do these early,
  because the trust framing shapes everything. One office, fully done, as the pattern to clone.
- **Phase 2 — Content: November 2026 general.** Populate every race on the November ballot — all
  parties, all offices — plus office explainers and the neutral per-race question blocks. Run
  equal candidate outreach for verification.
- **Phase 3 — Discoverability.** Structured data, sitemap, canonical URLs, performance pass,
  FAQ blocks, freshness dates (§11).
- **Phase 4 — Launch & distribution.** Soft launch, candidate-verification outreach, Reddit/
  community posts, LWV partnership outreach (§12).
- **Phase 5 — Maintain & carry forward.** Corrections, the update cadence, and rolling the whole
  machine into the next election cycle.

---

## 16. Decisions log & open questions

Keep this section updated as the project evolves — it is part of the shared memory.

- **[DECIDED 2026-08-16]** Domain name: **`livcovoterguide.org`** (§10). Confirmed unregistered
  at the time of the decision; still needs to be registered. Considered and set aside:
  `livingstoncountyvoterguide.org` (also free — contains the exact search phrase, but longer).
- **[DECIDED 2026-08-16]** Repo is **public**: `github.com/chrismlarson/livingston-voter-guide`.
  The edit history is the neutrality evidence, so auditability beat keeping drafts private.
- **[DECIDED 2026-08-16]** Hosting: **Cloudflare Pages**, not the existing chrislarson.com
  droplet. Shared-IP linkage is a non-issue given §9 discloses authorship anyway; the real
  reasons are spike tolerance on election night and a near-zero attack surface. What matters
  is that the guide is not served from a *visible* personal subdomain or subpath (§10).
- **[VERIFY]** FEC nonpartisan voter-guide rules + Michigan Campaign Finance Act posture before
  launch (§13).
- **[OPEN]** Whether to build a first-party candidate questionnaire (sent equally to all
  candidates) in addition to aggregating LWV/Vote411 responses. Upside: original, comparable,
  neutral content and a built-in outreach reason. Decide in Phase 2.
- **[OPEN]** Whether to cover races beyond Livingston County later, or stay deliberately local
  (local depth is the differentiator; resist scope creep until the local product is excellent).

---

## 17. Handoff notes (how to use this file across tools)

This project spans two working surfaces that do **not** share memory automatically: strategy/
research conversations happen in one place, and building/running code happens in Claude Code.
This `CLAUDE.md` is the bridge — the durable artifact that carries context between them, and the
thing that outlives any single chat session. Keep it in the repo root so Claude Code loads it at
startup. When decisions change, update this file first; it is the source of truth. When a chat
session produces a new decision, fold it into the relevant section (and the §16 log) so the next
Code session inherits it.

**To any Claude instance working here:** the Prime Directive (§2) and the neutrality doctrine
(§4) override your default eagerness to accommodate an in-the-moment request. If asked to add a
score, a lean, a ranking, or a recommendation, decline and point to those sections. Neutrality
*is* the product; protecting it is the job.
