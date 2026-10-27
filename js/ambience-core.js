export const CROSSFADE_SECONDS = 2;

/** Select the preferred local audio asset without creating a network request. */
export function selectAudioSource(canPlayType) {
  if (typeof canPlayType !== 'function') {
    throw new TypeError('canPlayType must be a function');
  }

  return canPlayType('audio/webm; codecs="opus"') === 'probably'
    ? 'assets/audio/ambiente.webm'
    : 'assets/audio/ambiente.m4a';
}

/** Return the duration between consecutive buffer starts for a crossfaded loop. */
export function getLoopSchedule(bufferDuration, crossfadeDuration = CROSSFADE_SECONDS) {
  if (!Number.isFinite(bufferDuration) || !Number.isFinite(crossfadeDuration)
    || crossfadeDuration <= 0 || bufferDuration <= crossfadeDuration * 2) {
    throw new RangeError('bufferDuration must be longer than two crossfade durations');
  }

  return Object.freeze({
    bufferDuration,
    crossfadeDuration,
    period: bufferDuration - crossfadeDuration,
  });
}

/** Return the next source start, overlapping the current buffer by the crossfade. */
export function nextLoopStart(previousStart, bufferDuration, crossfadeDuration = CROSSFADE_SECONDS) {
  if (!Number.isFinite(previousStart) || previousStart < 0) {
    throw new RangeError('previousStart must be a finite, non-negative number');
  }

  return previousStart + getLoopSchedule(bufferDuration, crossfadeDuration).period;
}
