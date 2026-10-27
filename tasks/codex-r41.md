# Codex task R41: chapter column measure + breadcrumb alignment (CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Edit css/novela.css only (regenerate with `node tools/novela-build.mjs --limit 3` only if markup must change; it should not).

Measured in the rendered page (Chromium, 1440 and 768): the R40 cap of `34em` (680px) still gives 86 characters per line, because Cormorant Garamond is a narrow face (em is not a character count). Target 65-72 characters.

1. Set the chapter reading column to `28em` at the prose font size (20px -> 560px). Apply the same column width to everything that R40 aligned with it (chapter header block, prose, scene breaks, "Ver el directo original", pagination) so their left edges stay identical. Mobile is unaffected (column is narrower than 28em there).
2. The breadcrumb on chapter pages starts 30px left of that column at 1440 (350 vs 380). Align its left edge with the same column at every width.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs tests/novela.test.mjs); report the changed rules.
