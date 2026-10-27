# Codex task R36: iOS plays the ambient music silently (bug fix)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only js/ambience.js (and js/ambience-core.js + tests/ambience.test.mjs only if you extract logic).

## Evidence (owner report, 2026-10-27)
- Windows desktop: music plays fine.
- iPhone, Safari AND Brave (both WebKit): pressing the switch leaves it ON (gold, aria-checked=true, no error) but nothing is heard.

## Root cause (hypothesis, highest likelihood)
On iOS, Web Audio API output uses the "ambient" audio session category, which is muted by the hardware ring/silent switch (HTML media elements are not). The context runs, so the UI shows ON, but iOS silences it.

## Fix
1. Inside the click handler that turns music ON, synchronously and BEFORE `audioContext.resume()`: if `navigator.audioSession` exists, set `navigator.audioSession.type = 'playback'` (WebKit Audio Session API, Safari/iOS 16.4+). Wrap in try/catch; never throw.
2. When music is turned OFF (after the fade-out completes) and on the error/fail path, restore `navigator.audioSession.type = 'auto'` if supported, so the page does not keep the playback session (which pauses other apps' audio).
3. Keep visibility pause/resume as is (do not change the session type on tab hide).
4. No other behaviour changes. Keep the lazy fetch, the format pick, the crossfade.

## Acceptance
- node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs passes.
- Paste the diff of js/ambience.js.
