# Codex task R51: stale text-area height after resize

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Files: js/novela.js, tests/novela.test.mjs. Do not touch assets/, tools/novela-laminas.json, tasks/art-src/. No browsers. Regenerate with `node tools/novela-build.mjs --limit 3`.

Measured by Claude (Chromium, chapter 003, reduced motion, 3 s waits after each resize), `#novela-prose` inline height vs book height:
- fresh load 1440x900: book 700px, flow height 684px, "Páginas 1-2 de 10" (correct)
- resize to 375x812: book 586px, flow height 700px (taller than the book: stale desktop value)
- back to 1440x900: book 700px, flow height 564px (stale mobile value), "Páginas 1-2 de 13", plate page 456px
- 1440 -> 1024x900 -> 1440: flow 636px, "de 11"
R50's resize decision is fine (the book height is restored); the bug is ordering: on repagination the flow height is derived from the book/page box measured BEFORE the new book height (and breakpoint styles) are applied, i.e. one resize late.

Fix: in the repagination path, first apply the new book height, then force/perform layout (read the new box after the write, or compute the flow height arithmetically from the new book height and the current breakpoint's margins), then snap to lines, then lay out columns, split/plate placement and anchor restore. After any resize sequence the flow height must equal the value a fresh load at the same viewport produces. Add a unit test for the pure height computation (book height + margins -> snapped flow height) and, if the order lives in a function, a test that it uses the new value.

Acceptance: build 181/0; tests pass; report the change.
