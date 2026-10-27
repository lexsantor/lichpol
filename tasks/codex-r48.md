# Codex task R48: plate page placement without blank pages

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Files: tools/novela-build.mjs, js/novela.js, css/novela.css, tests/novela.test.mjs. Do not touch assets/novela/*, tools/novela-laminas.json, tasks/art-src/. No browsers (Claude verifies). Regenerate with `node tools/novela-build.mjs --limit 3`.

Measured by Claude (1440x900, chapter 002, spread 5-6): the plate figure is inserted right after a scene break; the scene break landed at the top of a new column, so page 5 shows only the ✦ ornament and is otherwise blank, page 6 shows the plate. Also on that plate page (right page) the running head stays visible (chapter 001, plate on the left page, hides it correctly).

1. Placement that avoids near-empty pages. Generator: keep the plate as a figure but emit it at a paragraph boundary near the chapter's word midpoint (not glued to a scene break; never immediately after a scene-break ornament), and also emit a data attribute listing candidate boundaries is unnecessary — do it in JS instead: after pagination (paginated mode only), try moving the figure to each paragraph boundary within +-8 paragraphs of the default position (never between a scene break and its following paragraph, never before the chapter heading), repaginate in place, and keep the position where the column just before the plate has the least empty space (measure the gap between the last text line box in that column and the column bottom). Prefer <= 2 empty lines; tie-break by closeness to the default. Do it once per layout (also after a resize repagination), synchronously before revealing the book, so the reader never sees the jump; keep the position anchor logic correct. No-JS / continuous mode keeps the generator's default position.
2. Plate page has no running head on either side (left or right page), but keeps its folio.
3. Unit-test the pure part (choosing the best candidate from measured gaps).

Acceptance: build 181/0; tests pass; report the chosen position and the measured empty lines before the plate for chapters 1-3 at desktop and mobile widths if you can compute them without a browser, otherwise say so.
