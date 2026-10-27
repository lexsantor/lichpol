# Codex task R52: reduced-motion height transition on the reader (CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Edit css/novela.css only. Do not touch css/site.css. No browsers.

Root cause measured by Claude (Chromium, MutationObserver trace): with prefers-reduced-motion: reduce, the global rule in css/site.css line 36 (`*,*::before,*::after{transition-duration:.01ms!important}`) turns the initial `transition: all 0s` of `.novela-reader__book` into `all .01ms`, so a running `height` transition exists (`book.getAnimations()` -> ["height"]). Right after JS sets `book.style.height = 700px`, the box still measures the old 586px, and R51's flow-height calculation reads that stale value (flow 564px, 13 pages instead of 10 after a 375 -> 1440 resize). With normal motion the same sequence is correct (flow 684px, 10 pages).

Fix: in css/novela.css, inside `@media (prefers-reduced-motion: reduce)`, set `transition-property: none !important;` on the reader boxes whose geometry JS measures: `.novela-reader__book`, `.novela-reader__viewport`, `.novela-reader__flow`, `.novela-reader__flow > *`, `[data-novela-plate]`. Keep the existing reduced-motion behaviour elsewhere (instant page turns, cover fade). Do not add transitions anywhere.

Acceptance: build 181/0 (`node tools/novela-build.mjs --limit 3`); tests pass; paste the added rule.
