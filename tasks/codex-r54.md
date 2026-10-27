# Codex task R54: mobile page edges overlap the text (reproduced in WebKit, owner's iPhone Safari)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Files: css/novela.css (js/novela.js only if a measured value must change). Do not touch assets/, tools/novela-laminas.json, tasks/art-src/. No browsers (Claude verifies in WebKit and Chromium). Regenerate with `node tools/novela-build.mjs`.

Owner screenshot (iPhone, Safari) and Claude's reproduction in Playwright WebKit 26.5 at 390x844 (DPR 3), chapter 003 page 2: the stacked page-edge lines (`.novela-reader__paper-edges` / the edge pseudo-elements, ~20px wide) are painted INSIDE the page area on both sides, on top of the text's 24px inline padding. Result: the text visually touches the left stack and on the right the line ends ("hablan", "del", "abrir", "pasado", "levantarse.") run under/into the right stack; the right running head also touches it. The text box itself is correct (24px from the viewport edges, 0 lines straddling columns) — the problem is the edge stacks occupying that margin.

Fix for single-page mode (< 1024px):
1. A single page is a right-hand page: on the LEFT show only a subtle spine/gutter shadow (no stacked lines); on the RIGHT keep a page-edge stack but thinner (6-8px total) and reflecting progress as today.
2. Text clearance: the visible gap between the text (and the running head / folio) and any edge decoration must be >= 20px on both sides at 320-1023px. Achieve it by placing the edge stacks outside the text inset (e.g. increase the flow's inline padding by the stack width, and keep `column-gap = padding-left + padding-right` so the R44 pitch model stays exact), not by shrinking the text below readable.
3. Desktop (>= 1024px, two-page spread) unchanged except: the same rule applies (text, running heads and folios >= 20px from the edge stacks); check it holds with the R53 folio change.
4. Keep line snapping and the plate page (figure) inside the same clearance.

Acceptance: build 181/0 and 182 pages; tests pass. Report the new inset values per breakpoint.
