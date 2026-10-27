# Codex task R50: resize height restore + orphan scene breaks

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Files: js/novela.js, css/novela.css, tests/novela.test.mjs. Do not touch assets/, tools/novela-laminas.json, tasks/art-src/. No browsers. Regenerate with `node tools/novela-build.mjs --limit 3`.

Measured by Claude (Chromium) after R49:
1. Resize roundtrip does not restore the book height. Chapter 003 at 1440x900: plate page 576px tall, "Páginas 1-2 de 10". Resize to 375x812, then back to 1440x900: plate page 456px, "Páginas 1-2 de 13". Likely cause: the guard that ignores height-only changes < 120px (mobile URL bar) also suppresses the height recomputation when the WIDTH changed (900 -> 812 -> 900 is an 88px delta). Rule: recompute the book height whenever the width changes or the breakpoint (single/double page) changes; apply the < 120px height-only guard only when the width is unchanged. Add a unit test for this decision helper.
2. Orphan scene-break ornament at a page bottom: in chapter 002 at 1440x900, page 6 ends with the ✦ scene-break ornament and the new scene starts on page 7. A scene break must never be the last thing on a page: keep it with the following paragraph (e.g. `break-after: avoid` on the ornament, and if the browser ignores it in multicol, handle it in JS during pagination by moving it/adding top spacing so it starts the next page together with its paragraph). Also never let the ornament be the first thing after a plate page without its paragraph.

Acceptance: build 181/0; tests pass; report the changes.
