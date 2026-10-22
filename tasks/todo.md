# Home V1 · The Arcane Tavern

Plan: Fable blueprint (2026-10-22), authorized by Claude with changes noted below. Codex implements code; Claude verifies.

## Decisions
| ID | Decision | Status |
|---|---|---|
| D1 | Keep static HTML/CSS/JS (design.md 19.1). New: css/home.css, js/d20-core.js, js/d20.js, tests/d20.test.mjs. No package.json. | IMPLEMENTING |
| D2 | Logo files renamed to -white/-black (bytes identical) to match every page + design.md. | VERIFIED (hash) |
| D3 | Single-page home with anchors; logo = Inicio; nav Campañas / El Dungeon Master / Crónicas / Comunidad + Twitch. | IMPLEMENTING |
| D4 | Legacy pages + .md docs kept in repo, excluded from deploy (.vercelignore): stale copy contradicts verified data. Reversible. | PROPOSED to user |
| D5 | Self-hosted OFL fonts (Cinzel 500/600, Inter variable, Cormorant 500 italic). 640/960w WebP variants. | DONE (assets) |
| D6 | No og:image / canonical until deploy URL exists; no schedule/counts/status anywhere. | IMPLEMENTING |

## Tasks
- [x] T0 baseline commit, logo rename, .gitignore, .vercelignore, content verification log
- [ ] T1 Codex: d20 core + tests (node --test tests/ exit 0)
- [ ] T2 Codex: index.html + css/home.css
- [ ] T3 Codex: D20 UI (js/d20.js + styles)
- [ ] T4 Claude: QA 375/768/1024/1440, keyboard, reduced motion, links, console
- [ ] T5 push GitHub, link Vercel project "lichpol", verify deploy
