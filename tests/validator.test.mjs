/**
 * Proves the neutrality rules are mechanically enforced, not aspirational
 * (CLAUDE.md §10). If these tests ever go green on the violations fixture,
 * the guard is broken.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, join } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = join(ROOT, 'scripts/validate-content.ts');

function runValidator(fixtureDir) {
  return spawnSync(process.execPath, [VALIDATOR, join(ROOT, 'tests/fixtures', fixtureDir)], {
    encoding: 'utf8',
    cwd: ROOT,
  });
}

test('a well-formed, symmetric race passes', () => {
  const { status, stdout, stderr } = runValidator('valid');
  assert.equal(status, 0, `expected exit 0, got ${status}\n${stdout}\n${stderr}`);
  assert.match(stdout, /Content validated/);
});

test('a race that violates the doctrine is blocked', () => {
  const { status } = runValidator('violations');
  assert.equal(status, 1, 'validator must exit non-zero on violations');
});

test('blocks a party label on a nonpartisan race (§2, §4)', () => {
  const { stderr } = runValidator('violations');
  assert.match(stderr, /nonpartisan — party must be null/);
});

test('blocks unequal word budgets within a race (§2.1, §8)', () => {
  const { stderr } = runValidator('violations');
  assert.match(stderr, /unequal word budget within this race/);
});

test('blocks candidate-specific voter considerations (§4)', () => {
  const { stderr } = runValidator('violations');
  assert.match(stderr, /voter_considerations names candidate/);
});

test('blocks asymmetric candidate outreach (§2.7)', () => {
  const { stderr } = runValidator('violations');
  assert.match(stderr, /outreach is asymmetric/);
});

test('blocks campaign-finance figures with no filing linked (§7)', () => {
  const { stderr } = runValidator('violations');
  assert.match(stderr, /campaign_finance has figures but no source_url/);
});
