# Home V1 · The Arcane Tavern

Plan: Fable blueprint (2026-10-22), authorized by Claude with changes noted below. Codex implements code; Claude verifies.

## Decisions
| ID | Decision | Status |
|---|---|---|
| D1 | Keep static HTML/CSS/JS (design.md 19.1). New: css/home.css, js/d20-core.js, js/d20.js, tests/d20.test.mjs. No package.json. | VERIFIED |
| D2 | Logo files renamed to -white/-black (bytes identical) to match every page + design.md. | VERIFIED (hash) |
| D3 | Single-page home with anchors; logo = Inicio; nav Campañas / El Dungeon Master / Crónicas / Comunidad + Twitch. | VERIFIED |
| D4 | Legacy pages + .md docs kept in repo, excluded from deploy (.vercelignore): stale copy contradicts verified data. Reversible. | IMPLEMENTED, pending user acceptance |
| D5 | Self-hosted OFL fonts (Cinzel 500/600, Inter variable, Cormorant 500 italic). 640/960w WebP variants. | VERIFIED |
| D6 | No og:image / canonical until deploy URL exists; no schedule/counts/status anywhere. | VERIFIED |

## Tasks
- [x] T0 baseline commit, logo rename, .gitignore, .vercelignore, content verification log
- [x] T1 Codex: d20 core + tests (node --test tests/d20.test.mjs, 9/9)
- [x] T2 Codex: index.html + css/home.css
- [x] T3 Codex: D20 UI (js/d20.js + styles)
- [x] T4 Claude: QA 375/768/1024/1440, keyboard, reduced motion, links, console
- [ ] T5 push GitHub, link Vercel project "lichpol", verify deploy

## QA evidence (2026-10-22, Chromium 153 via Playwright, local HTTP)
- 320/375/768/1024/1440 (+ reduced motion at 375/1440): no horizontal scroll, 0 console errors, 0 failed requests, 0 broken images, 1 h1, 4 fonts loaded.
- Text clipping + heading widows checked at 320-1920 (12 widths): none.
- D20 E2E 24/24: keyboard roll, aria-busy lock (concurrent presses ignored), live region, focus into panel, Escape + focus return, reroll, close, 25-roll lock stress, forced 1 and 20 styling, reduced motion < 100 ms, footer links never covered, no-JS hides the trigger.
- Real-pixel contrast: every measured text >= 4.5:1 worst pixel except hero H1 at 1024 (3.15:1 worst pixel, large text, passes 3:1).
- 18 external URLs: HTTP 200, YouTube/Discord titles match the page.
- Independent code review: no CRITICAL/HIGH; 4 of 5 findings fixed, 1 rejected (alt text describes the image, no factual claim).

## Not done / pending
- Lighthouse not run locally (to run on the deployed URL).
- og:image + canonical once the production URL/domain is confirmed.
- Legacy V6 pages excluded from deploy; their copy is stale.
- Real screen reader (NVDA/VoiceOver), Safari and Firefox not tested.
