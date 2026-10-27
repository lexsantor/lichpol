# Lessons


## 2026-10-27 · Web Audio is silent on iOS with the ring/silent switch on
- Symptom: toggle shows ON, AudioContext running, no sound on iPhone (Safari and Brave, both WebKit); desktop fine.
- Cause: Web Audio uses the "ambient" audio session, muted by the hardware silent switch.
- Rule: any user-initiated Web Audio playback sets `navigator.audioSession.type = 'playback'` synchronously in the gesture before `resume()`, and restores `'auto'` on stop/failure. Check: grep `audioSession` in js/ambience.js.
- Verification gap: Playwright on Windows cannot reproduce iOS audio sessions; owner device test is the gate.
