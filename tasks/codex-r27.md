# Codex task R27: 14px button label token + remove "conceptual" disclaimer

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools.
Files: css/tokens.css, css/site.css, css/home.css, css/d20.css (only if a .btn rule lives there), index.html (3 strings below), design.md 07.3.

## 1. Owner decision: button labels at 14px
Add ONE token to the scale: `--text-button: 14px`. Use it only for `.btn` labels (all variants incl. `.btn-sm` and `.header-cta`), which are uppercase and tracked. Everything else keeps the 8-size scale (body 16 stays for text links, nav, inline links). Icons inside buttons follow the existing rule (1em = 14px, gap .3125em). Keep button min-heights/touch targets unchanged.
design.md 07.3: add "Botón (label en mayúsculas) 14px" to the table and the usage list.

## 2. Owner decision: remove the disclaimer
- index.html footer: `Ilustraciones conceptuales, no canónicas. Esta web no usa cookies ni analítica.` -> `Esta web no usa cookies ni analítica.`
- og:image:alt and twitter:image:alt: `Ilustración conceptual: sala de una taberna...` -> `Ilustración: sala de una taberna...` (rest unchanged).

Acceptance: `grep -ci "conceptual" index.html` = 0; tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs); list selectors using --text-button.
