import {
  CROSSFADE_SECONDS,
  getLoopSchedule,
  nextLoopStart,
  selectAudioSource,
} from './ambience-core.js';

const button = document.querySelector('.ambience-switch');
const liveStatus = document.querySelector('#ambience-live');
const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

if (!button || !liveStatus || !AudioContextConstructor) {
  // The hidden attribute in the HTML keeps this control unavailable without Web Audio.
} else {
  const MASTER_GAIN = 0.35;
  const FADE_IN_SECONDS = 1.5;
  const FADE_OUT_SECONDS = 0.8;
  const SCHEDULER_INTERVAL_MS = 500;
  const SCHEDULE_AHEAD_SECONDS = 5;
  const CURVE_STEPS = 128;
  const equalPowerIn = Float32Array.from({ length: CURVE_STEPS }, (_, index) => (
    Math.sin((index / (CURVE_STEPS - 1)) * Math.PI / 2)
  ));
  const equalPowerOut = Float32Array.from({ length: CURVE_STEPS }, (_, index) => (
    Math.cos((index / (CURVE_STEPS - 1)) * Math.PI / 2)
  ));

  let audioContext = null;
  let masterGain = null;
  let decodedBuffer = null;
  let loopSchedule = null;
  let voices = [];
  let nextStartTime = 0;
  let schedulerTimer = 0;
  let suspendTimer = 0;
  let visibilityRevision = 0;
  let userWantsPlayback = false;
  let playbackStarted = false;
  let isLoading = false;
  let isTransitioning = false;

  button.hidden = false;

  function setAudioSessionType(type) {
    try {
      if (typeof navigator !== 'undefined' && navigator.audioSession) {
        navigator.audioSession.type = type;
      }
    } catch {
      // Audio session controls are optional and may be unavailable in some browsers.
    }
  }

  function renderState({ error = false, announce = false } = {}) {
    button.setAttribute('aria-checked', String(userWantsPlayback));
    button.dataset.error = String(error);
    if (announce) liveStatus.textContent = error
      ? 'No se pudo cargar la música'
      : (userWantsPlayback ? 'Activada' : 'Desactivada');
    else if (!error) liveStatus.textContent = '';
  }

  function setBusy(busy) {
    button.setAttribute('aria-busy', String(busy));
  }

  function clearScheduler() {
    if (schedulerTimer) window.clearInterval(schedulerTimer);
    schedulerTimer = 0;
  }

  function clearSuspendTimer() {
    if (suspendTimer) window.clearTimeout(suspendTimer);
    suspendTimer = 0;
  }

  function holdGainAtCurrentValue(param, now) {
    if (typeof param.cancelAndHoldAtTime === 'function') {
      param.cancelAndHoldAtTime(now);
      return;
    }

    const currentValue = param.value;
    param.cancelScheduledValues(now);
    param.setValueAtTime(currentValue, now);
  }

  function rampMasterGain(target, duration) {
    if (!audioContext || !masterGain || audioContext.state === 'closed') return;

    const now = audioContext.currentTime;
    const param = masterGain.gain;
    holdGainAtCurrentValue(param, now);
    param.linearRampToValueAtTime(target, now + duration);
  }

  function ensureAudioGraph() {
    if (masterGain) return;
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioContext.destination);
  }

  function disconnectVoice(voice) {
    voice.source.onended = null;
    try {
      voice.source.stop();
    } catch {
      // A scheduled source may already have ended or been stopped.
    }
    try {
      voice.source.disconnect();
      voice.gain.disconnect();
    } catch {
      // Disconnecting an already-ended node is harmless.
    }
  }

  function stopAllVoices() {
    for (const voice of voices) disconnectVoice(voice);
    voices = [];
    playbackStarted = false;
    nextStartTime = 0;
  }

  function scheduleVoice(startTime, firstVoice = false) {
    const previousVoice = voices.at(-1);
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    const voice = { source, gain };

    source.buffer = decodedBuffer;
    source.connect(gain);
    gain.connect(masterGain);

    if (firstVoice) {
      gain.gain.setValueAtTime(1, startTime);
    } else {
      gain.gain.setValueCurveAtTime(equalPowerIn, startTime, CROSSFADE_SECONDS);
      if (previousVoice) {
        previousVoice.gain.gain.setValueCurveAtTime(equalPowerOut, startTime, CROSSFADE_SECONDS);
      }
    }

    voices.push(voice);
    source.onended = () => {
      voices = voices.filter(existing => existing !== voice);
      try {
        source.disconnect();
        gain.disconnect();
      } catch {
        // The source may already be disconnected during shutdown.
      }
    };
    source.start(startTime);
    return voice;
  }

  function scheduleUpcomingVoices() {
    if (!audioContext || !loopSchedule || !playbackStarted || audioContext.state !== 'running') return;

    const scheduleLimit = audioContext.currentTime + SCHEDULE_AHEAD_SECONDS;
    while (nextStartTime <= scheduleLimit) {
      scheduleVoice(nextStartTime);
      nextStartTime = nextLoopStart(
        nextStartTime,
        loopSchedule.bufferDuration,
        loopSchedule.crossfadeDuration,
      );
    }
  }

  function startScheduler() {
    scheduleUpcomingVoices();
    if (!schedulerTimer) {
      schedulerTimer = window.setInterval(() => {
        try {
          scheduleUpcomingVoices();
        } catch {
          void failPlayback();
        }
      }, SCHEDULER_INTERVAL_MS);
    }
  }

  function startLoop() {
    if (playbackStarted || !decodedBuffer) return;

    loopSchedule = getLoopSchedule(decodedBuffer.duration);
    ensureAudioGraph();

    const firstStartTime = audioContext.currentTime + 0.05;
    scheduleVoice(firstStartTime, true);
    const secondStartTime = nextLoopStart(
      firstStartTime,
      loopSchedule.bufferDuration,
      loopSchedule.crossfadeDuration,
    );
    scheduleVoice(secondStartTime);
    nextStartTime = nextLoopStart(
      secondStartTime,
      loopSchedule.bufferDuration,
      loopSchedule.crossfadeDuration,
    );
    playbackStarted = true;
    startScheduler();
  }

  async function syncPlaybackToVisibility() {
    while (true) {
      if (document.visibilityState === 'hidden') {
        await audioContext.suspend();
        if (document.visibilityState === 'hidden') return;
        continue;
      }

      await audioContext.resume();
      if (document.visibilityState === 'hidden') continue;
      startLoop();
      rampMasterGain(MASTER_GAIN, FADE_IN_SECONDS);
      return;
    }
  }

  function decodeAudioData(context, data) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const succeed = buffer => {
        if (settled) return;
        settled = true;
        resolve(buffer);
      };
      const fail = error => {
        if (settled) return;
        settled = true;
        reject(error);
      };

      try {
        const result = context.decodeAudioData(data, succeed, fail);
        if (result && typeof result.then === 'function') result.then(succeed, fail);
      } catch (error) {
        fail(error);
      }
    });
  }

  async function fetchAndDecode(context) {
    const audio = document.createElement('audio');
    const path = selectAudioSource(type => audio.canPlayType(type));
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Audio request failed: ${response.status}`);
    return decodeAudioData(context, await response.arrayBuffer());
  }

  async function closeContextAfterError() {
    const context = audioContext;
    audioContext = null;
    masterGain = null;
    decodedBuffer = null;
    loopSchedule = null;
    stopAllVoices();
    if (context && context.state !== 'closed') {
      try {
        await context.close();
      } catch {
        // A failed or already-closed context needs no further recovery.
      }
    }
  }

  async function failPlayback() {
    setAudioSessionType('auto');
    userWantsPlayback = false;
    isLoading = false;
    isTransitioning = false;
    visibilityRevision++;
    clearScheduler();
    clearSuspendTimer();
    renderState({ error: true, announce: true });
    setBusy(false);
    await closeContextAfterError();
  }

  async function handleStart() {
    isLoading = true;
    userWantsPlayback = true;
    renderState();
    setBusy(true);

    try {
      if (!audioContext || audioContext.state === 'closed') {
        audioContext = new AudioContextConstructor();
        masterGain = null;
        loopSchedule = null;
        playbackStarted = false;
      }

      // Resume synchronously from the explicit button press for iOS user activation.
      const resumePromise = audioContext.resume();
      await resumePromise;

      if (!decodedBuffer) decodedBuffer = await fetchAndDecode(audioContext);
      ensureAudioGraph();
      await syncPlaybackToVisibility();

      isLoading = false;
      setBusy(false);
    } catch {
      await failPlayback();
    }
  }

  async function handleStop() {
    isTransitioning = true;
    userWantsPlayback = false;
    visibilityRevision++;
    clearSuspendTimer();
    renderState();
    setBusy(true);
    clearScheduler();

    try {
      rampMasterGain(0, FADE_OUT_SECONDS);
    } catch {
      // Stop the sources below even if gain automation is unavailable.
    }
    await new Promise(resolve => window.setTimeout(resolve, FADE_OUT_SECONDS * 1000));
    setAudioSessionType('auto');
    stopAllVoices();
    try {
      if (audioContext && audioContext.state !== 'closed') await audioContext.suspend();
    } catch {
      // Keep the control usable if the browser rejects a suspend operation.
    }

    isTransitioning = false;
    setBusy(false);
  }

  async function handleVisibilityChange() {
    const revision = ++visibilityRevision;
    if (!audioContext || !userWantsPlayback || isLoading || isTransitioning) return;

    if (document.visibilityState === 'hidden') {
      clearScheduler();
      clearSuspendTimer();
      rampMasterGain(0, FADE_OUT_SECONDS);
      suspendTimer = window.setTimeout(() => {
        suspendTimer = 0;
        if (revision !== visibilityRevision || !userWantsPlayback || document.visibilityState !== 'hidden') return;
        if (audioContext && audioContext.state !== 'closed') {
          try {
            audioContext.suspend().catch(() => failPlayback());
          } catch {
            void failPlayback();
          }
        }
      }, FADE_OUT_SECONDS * 1000);
      return;
    }

    clearSuspendTimer();
    try {
      await audioContext.resume();
      if (revision !== visibilityRevision || !userWantsPlayback || document.visibilityState === 'hidden') return;
      if (!playbackStarted) startLoop();
      else startScheduler();
      rampMasterGain(MASTER_GAIN, FADE_IN_SECONDS);
    } catch {
      await failPlayback();
    }
  }

  button.addEventListener('click', () => {
    if (isLoading || isTransitioning) return;
    button.dataset.error = 'false';
    if (userWantsPlayback) void handleStop();
    else {
      setAudioSessionType('playback');
      void handleStart();
    }
  });
  document.addEventListener('visibilitychange', () => {
    void handleVisibilityChange().catch(() => failPlayback());
  });
}
