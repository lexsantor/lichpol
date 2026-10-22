import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIES,
  PHRASES,
  classify,
  createRoll,
  pickPhrase,
  rollD20,
} from '../js/d20-core.js';

test('classify maps all category boundaries to the expected ids', () => {
  const cases = [
    [1, 'fumble'], [2, 'disaster'], [5, 'disaster'], [6, 'bad'], [10, 'bad'],
    [11, 'survival'], [15, 'survival'], [16, 'good'], [19, 'good'], [20, 'critical'],
  ];
  for (const [value, id] of cases) assert.equal(classify(value).id, id);
});

test('category definitions and phrase banks are frozen', () => {
  assert.ok(Object.isFrozen(CATEGORIES));
  assert.ok(CATEGORIES.every(Object.isFrozen));
  assert.ok(Object.isFrozen(PHRASES));
  assert.ok(Object.values(PHRASES).every(Object.isFrozen));
});

test('rollD20 handles endpoint samples and rejects invalid samples', () => {
  assert.equal(rollD20(() => 0), 1);
  assert.equal(rollD20(() => 0.999999), 20);
  assert.equal(rollD20(() => 1), 20);
  assert.throws(() => rollD20(() => -0.1), RangeError);
  assert.throws(() => rollD20(() => NaN), RangeError);
  assert.throws(() => rollD20(() => Infinity), RangeError);
});

test('classify rejects values outside the integer d20 range', () => {
  for (const value of [0, 21, 2.5, '5']) {
    assert.throws(() => classify(value), RangeError);
  }
});

test('each category has 6-8 unique, non-empty phrases with sentence punctuation', () => {
  for (const category of CATEGORIES) {
    const phrases = PHRASES[category.id];
    assert.ok(phrases.length >= 6 && phrases.length <= 8, category.id);
    assert.equal(new Set(phrases).size, phrases.length, category.id);
    for (const phrase of phrases) {
      assert.ok(phrase.trim().length > 0, category.id);
      assert.match(phrase, /[.!?…]$/u, category.id);
    }
  }
});

test('pickPhrase does not repeat the previous index when another phrase exists', () => {
  const rng = mulberry32(0xdecafbad);
  const lastByCategory = new Map();
  for (let i = 0; i < 500; i++) {
    const categoryId = CATEGORIES[i % CATEGORIES.length].id;
    const lastIndex = lastByCategory.get(categoryId) ?? -1;
    const phrase = pickPhrase(categoryId, lastIndex, rng);
    assert.notEqual(phrase.index, lastIndex);
    assert.equal(phrase.text, PHRASES[categoryId][phrase.index]);
    lastByCategory.set(categoryId, phrase.index);
  }
});

test('200000 d20 rolls distribute evenly across all faces', () => {
  const counts = Array(20).fill(0);
  for (let i = 0; i < 200000; i++) counts[rollD20() - 1]++;
  const expected = 200000 / 20;
  for (const count of counts) {
    assert.ok(count >= expected * 0.95 && count <= expected * 1.05, `unexpected face count: ${count}`);
  }
});

test('createRoll returns a value, matching category, and phrase consistently', () => {
  const result = createRoll({ fumble: 0 }, () => 0);
  assert.deepEqual(Object.keys(result), ['value', 'category', 'phraseIndex', 'text']);
  assert.equal(result.value, 1);
  assert.equal(result.category, classify(result.value));
  assert.equal(result.phraseIndex, 1);
  assert.equal(result.text, PHRASES.fumble[result.phraseIndex]);
});

test('pickPhrase throws for an unknown category', () => {
  assert.throws(() => pickPhrase('unknown'), RangeError);
});

/** Small deterministic PRNG for repeatable phrase-selection checks. */
function mulberry32(seed) {
  return function next() {
    let value = seed += 0x6D2B79F5;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}
