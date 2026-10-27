# Codex task R29: opt-in ambient music toggle (floating, next to the d20)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser/computer-use tools (Claude verifies in real browsers). No new dependencies.
Files: new js/ambience.js (+ tiny pure core module and tests/ambience.test.mjs if logic warrants it, mirroring js/d20-core.js + tests/d20.test.mjs), index.html (button markup + script tag), css/home.css (or css/d20.css if the floating-control styles live there). Use existing tokens (type scale, colors) and the existing icon sprite pattern.

## Assets (already produced by Claude, do not re-encode)
- assets/audio/ambiente.webm  (Opus 40k, 930 KB, 2:17, stereo)
- assets/audio/ambiente.m4a   (AAC 64k, 1.1 MB, same content) for Safari
Track: "Cathedral in the forest (ambient loop)" by congusbongus, CC0 (OpenGameArt). Seamless by design; start/end levels match.

## Owner decisions
- Dark-fantasy melodic ambient music, opt-in only. OFF by default. Never autoplay, never start on scroll/hover/any implicit event. Only an explicit press of the toggle starts it.
- Floating control next to the existing d20 trigger (bottom-right). Same visual language as the d20 trigger, smaller (min 44x44 touch target). Place it so it never overlaps the d20 trigger or footer links at 320-1440 (stack above or sit left of the d20; pick one and keep it consistent).

## Behaviour
1. Button: `<button type="button" class="ambience-toggle" aria-pressed="false" aria-label="Música de ambiente">` with speaker icons for off/on states (add two icons to the sprite if missing, same style as the existing sprite; icon 1em rule). A visible tooltip/label like the d20's on hover/focus: "Música de ambiente" / state "Activada"/"Desactivada". State must not rely on color alone (icon changes).
2. Hidden without JS (same pattern as the d20 trigger) and hidden if Web Audio (`AudioContext`/`webkitAudioContext`) is unavailable.
3. Lazy load: nothing is fetched until the first press. Format pick: use ambiente.webm when `audio.canPlayType('audio/webm; codecs="opus"') === 'probably'`, else ambiente.m4a.
4. Create/resume the AudioContext INSIDE the click handler (iOS requirement). Fetch + decodeAudioData; while loading set `aria-busy="true"` and ignore extra presses.
5. Gapless loop that is robust to codec padding: schedule two AudioBufferSourceNodes with an equal-power 2 s crossfade at each loop boundary (do not rely on `loop=true`).
6. Master gain target 0.35. Fade in 1.5 s on start, fade out 0.8 s on stop, then suspend the context.
7. Pause (fade + suspend) when `document.visibilityState === 'hidden'`; resume only if the user had it ON.
8. Errors (network/decode): reset to OFF, `aria-pressed=false`, tooltip text "No se pudo cargar la música". Never throw uncaught.
9. Do not persist state across visits (no localStorage). No analytics.
10. Respect the existing z-index/stacking of the d20 panel: opening the d20 panel must not be blocked by the new button.

## Tests
If you extract pure logic (format picker, crossfade schedule times), cover it with node:test in tests/ambience.test.mjs. node --test tests/d20.test.mjs tests/schedule.test.mjs (+ ambience) must pass.

## Acceptance (report)
- Files changed + short diff summary.
- Confirm: no network request for assets/audio/* before the first press (state how: lazy fetch inside handler).
- Test results.
