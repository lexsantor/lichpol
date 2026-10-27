import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CROSSFADE_SECONDS,
  getLoopSchedule,
  nextLoopStart,
  selectAudioSource,
} from '../js/ambience-core.js';

test('audio format selection prefers WebM only when Opus is probably supported', () => {
  let requestedType = '';
  const canPlayType = type => {
    requestedType = type;
    return 'probably';
  };

  assert.equal(selectAudioSource(canPlayType), 'assets/audio/ambiente.webm');
  assert.equal(requestedType, 'audio/webm; codecs="opus"');
  assert.equal(selectAudioSource(() => 'maybe'), 'assets/audio/ambiente.m4a');
  assert.equal(selectAudioSource(() => ''), 'assets/audio/ambiente.m4a');
});

test('loop schedule overlaps adjacent buffers by the equal-power crossfade duration', () => {
  const schedule = getLoopSchedule(137.25);
  assert.deepEqual(schedule, {
    bufferDuration: 137.25,
    crossfadeDuration: CROSSFADE_SECONDS,
    period: 135.25,
  });
  assert.equal(nextLoopStart(10, 137.25), 145.25);
  assert.equal(nextLoopStart(nextLoopStart(10, 137.25), 137.25), 280.5);
  assert.ok(Object.isFrozen(schedule));
});

test('audio format and loop schedule helpers reject invalid inputs', () => {
  assert.throws(() => selectAudioSource('probably'), TypeError);
  for (const duration of [0, 2, 4, NaN, Infinity]) {
    assert.throws(() => getLoopSchedule(duration), RangeError);
  }
  assert.throws(() => getLoopSchedule(10, 0), RangeError);
  assert.throws(() => nextLoopStart(-1, 10), RangeError);
});
