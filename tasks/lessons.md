# Lessons


## 2026-10-27 · Web Audio is silent on iOS with the ring/silent switch on
- Symptom: toggle shows ON, AudioContext running, no sound on iPhone (Safari and Brave, both WebKit); desktop fine.
- Cause: Web Audio uses the "ambient" audio session, muted by the hardware silent switch.
- Rule: any user-initiated Web Audio playback sets `navigator.audioSession.type = 'playback'` synchronously in the gesture before `resume()`, and restores `'auto'` on stop/failure. Check: grep `audioSession` in js/ambience.js.
- Verification gap: Playwright on Windows cannot reproduce iOS audio sessions; owner device test is the gate.

## 2026-10-27 · Global reduced-motion rule creates transitions on every property
- Symptom: Kuroto reader measured stale heights after resize only with prefers-reduced-motion (flow 564px vs 684px, 13 vs 10 pages); normal motion was fine.
- Cause: css/site.css forces `transition-duration:.01ms!important` on `*`; that turns the default `transition: all 0s` into a real `all .01ms` transition, so a box read right after a JS style write still reports its old size.
- Rule: any component that writes geometry in JS and measures it immediately sets `transition-property: none !important` on those boxes under reduced motion (or computes values arithmetically instead of measuring). Check: `el.getAnimations()` must be empty right after the write.
- Verification: always run layout QA in BOTH motion modes; a reduced-motion-only test hid that normal motion was correct, and a normal-only test would have hidden this bug.
