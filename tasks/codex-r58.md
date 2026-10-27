# Codex task R58: chapter 132 interlude, no #p=1 on the first page, TOC lead in Alegreya

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browsers (Claude verifies). Regenerate with `node tools/novela-build.mjs` (all chapters).

Owner decisions 2026-10-28:

1. Chapter 132 ("Pequeños") is an interlude outside the main line (editorial report recommendation, owner approved). In kuroto-novela/indice.json add `"interludio": true` to the chapter object with `"numero": 132` (only that field; do not touch any other data or the .md sources). The generator already supports the field: make sure the TOC shows the "Interludio" label for it and that the chapter page shows it too (e.g. "Interludio" next to "Capítulo 132" in the opening block), styled with existing tokens. Reading order and navigation stay unchanged (131 -> 132 -> 133). Add/adjust a test.
2. URL hash: when the reader is on page 1 (or spread 1-2), do not write `#p=1` into the URL; remove the hash instead (history.replaceState with pathname + search). Other pages keep `#p=N`; `#fin` behaviour unchanged. Loading a URL without hash must still open page 1, and the cover rule (no hash + no session flag -> cover) must keep working. Adjust the pure helper and its test.
3. Typography: the TOC hero lead currently uses `var(--font-story)` (Cormorant Garamond upright, rejected by the owner for the novel). Use the same Alegreya face as the reader (`--font-book`) at the same size. Then the upright Cormorant @font-face in css/novela.css is unused: remove that @font-face block and its preload if any, and delete assets/fonts/cormorant-garamond-latin-500-normal.woff2 ONLY if nothing else in the repo references it (search css/, js/, *.html, tools/). Do not touch the Cormorant italic file or site-wide styles.

Acceptance: build 181/0, 182 pages; `node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs tests/novela.test.mjs` passes. Report the changes.
