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
| D7 | Owner decisions 2026-10-23: Cinzel on nav, DM fact labels and archive campaign labels; hero credit and DM figcaption removed; UI font Inter -> DM Sans (tokens --font-ui); icons from Reicon (MIT, Solar Icons CC BY 4.0) as single-colour sprite. design.md still says Inter (not edited without authorization). | ACCEPTED (owner) |
| D6 | og:image on the Vercel URL; no canonical until a domain is confirmed; no counts/status anywhere unless the owner confirms it (Kuroto "Finalizada", owner 2026-10-27, R37). Schedule clause superseded by D8. | VERIFIED |
| D8 | Owner request 2026-10-27: weekly stream calendar from the Twitch schedule (Europe/Madrid, lun-jue 20:30-23:00), official synopses verbatim, campaigns grouped as Aventuras (Kuroto, Xoltacan) + Campañas 1-4, 3 new covers generated with the owner's master prompt (Codex R17, R18 a11y follow-up). | ACCEPTED (owner 2026-10-27) |
| D9 | Owner 2026-10-27: fixed type scale H1 62 / H2 48 / H3 40 / H4 32 / H5 26 / H6 20 / Body 16 / Small 12 as the only tokens (replaced the interim 1.125 modular scale R21). Headings step down 1 level at tablet, 2 at mobile (hero H1 mobile = 32); Body for all readable text, Button 12 for .btn labels (owner R27-R28), Small only for captions and uppercase micro-labels; icon 1em, gap .3125em; direct CTA copy; hamburger <=1023px (measured). Audit: 0 off-scale sizes, 0 icon mismatches, 0 clipped text at 320-1440 (R21-R26). | ACCEPTED (owner 2026-10-27) |
| D10 | Owner 2026-10-27: Crónicas 50/50, DM quips, nav DM-first (R19-R20, deployed 047e963). #campanas: Campañas group first in order 4,3,2,1 as 2x2 (4x1 measured 284x881px/card at 1440, owner fallback rule); Aventuras 50/50 Xoltacan then Kuroto, same card component (R22). | ACCEPTED (owner 2026-10-27) |
| D11 | Owner 2026-10-27: opt-in ambient music (CC0 'Cathedral in the forest', congusbongus), floating toggle next to the d20, off by default, lazy-loaded Opus/AAC, crossfaded loop, pauses when tab hidden (R29-R31). Chromium verified incl. m4a path; iPhone Safari/Brave verified by owner after R36 (audioSession playback). | ACCEPTED (owner 2026-10-27) |
| D12 | Owner 2026-10-27: header = LICHPOL + 'La Taberna' dropdown (DM, Campañas, Crónicas, Comunidad) + 'Aventuras' external link (https://khr0mz.github.io/arghast/, _blank) + music on/off switch (replaces floating toggle) + Twitch CTA; room reserved for a future 'Personajes' page; mobile: switch in bar, flat drawer (R32-R34). | ACCEPTED (owner 2026-10-27) |

## Tasks
- [x] T0 baseline commit, logo rename, .gitignore, .vercelignore, content verification log
- [x] T1 Codex: d20 core + tests (node --test tests/d20.test.mjs, 9/9)
- [x] T2 Codex: index.html + css/home.css
- [x] T3 Codex: D20 UI (js/d20.js + styles)
- [x] T4 Claude: QA 375/768/1024/1440, keyboard, reduced motion, links, console
- [x] T5 push GitHub, link Vercel project "lichpol", verify deploy (https://lichpol.vercel.app)

## QA evidence (2026-10-22, Chromium 153 via Playwright, local HTTP)
- 320/375/768/1024/1440 (+ reduced motion at 375/1440): no horizontal scroll, 0 console errors, 0 failed requests, 0 broken images, 1 h1, 4 fonts loaded.
- Text clipping + heading widows checked at 320-1920 (12 widths): none.
- D20 E2E 24/24: keyboard roll, aria-busy lock (concurrent presses ignored), live region, focus into panel, Escape + focus return, reroll, close, 25-roll lock stress, forced 1 and 20 styling, reduced motion < 100 ms, footer links never covered, no-JS hides the trigger.
- Real-pixel contrast: every measured text >= 4.5:1 worst pixel except hero H1 at 1024 (3.15:1 worst pixel, large text, passes 3:1).
- 18 external URLs: HTTP 200, YouTube/Discord titles match the page.
- Independent code review: no CRITICAL/HIGH; 4 of 5 findings fixed, 1 rejected (alt text describes the image, no factual claim).

## Not done / pending
- og:image added for https://lichpol.vercel.app (assets/og-tavern.jpg, 1200x630). Update og:url/og:image and add canonical when a custom domain is attached.
- Legacy V6 pages excluded from deploy; their copy is stale.
- Real screen reader (NVDA/VoiceOver), Safari and Firefox not tested.

## Production (https://lichpol.vercel.app, commit eaed02f)
- Public 200; per-deployment *.vercel.app URLs stay behind Vercel SSO (project setting).
- Excluded from deploy, verified 404: legacy *.html, *.md, docs/, tasks/, tests/, references/, .env.local.
- QA 320-1440 + reduced motion and d20 E2E 24/24 re-run on production: pass.
- Lighthouse 12.8.2 (simulated throttling, this machine): mobile Perf 94 / 87 / 88 / 96, A11y 100, BP 100, SEO 100, CLS 0, LCP 2.6-3.5 s (target 2.5 s NOT met). Desktop 100/100/100/100, LCP 0.5 s.
- LCP is render delay (fonts + CSS chain under simulated slow 4G), not network. A/B of the last perf commit vs previous: neutral (82 vs 81-82 locally). Next lever if needed: inline critical hero CSS.
