# Codex task R47: gap below the navbar + cover plate/title spacing (owner feedback)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Files: css/novela.css, js/novela.js only. Do NOT touch assets/novela/lamina-*, tools/novela-laminas.json, tasks/art-src/ (a parallel task owns them). Do not launch browsers (Claude verifies the render). Regenerate with `node tools/novela-build.mjs --limit 3`.

Owner feedback 2026-10-27 with screenshots:
1. "No tan pegado a la navbar": the open book and the closed cover start exactly at the header's bottom edge (book top 84 = header bottom at 1440). Add a clear gap between the header and the book/cover at all widths: 32px desktop (>= 1024), 20px below. Include the gap in the page-height calculation (js) so whole-line snapping still holds and the page controls stay visible at 1440x900 (book bottom + controls <= 900).
2. "Un poco más de espaciado entre la ilustración y el título" on the closed cover: increase the space between the plate's bottom bezel and the title "Aventuras en Kuroto" to at least 32px at 1440 (scale down proportionally on mobile), keeping plate + title + "Lichpol" vertically centred as a group.

Acceptance: build 181/0; `node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs tests/novela.test.mjs` passes; report changed rules.
