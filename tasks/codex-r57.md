# Codex task R57: clean URLs without .html (owner request)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browsers (Claude verifies). Files: new `vercel.json`, tools/novela-build.mjs, js/novela.js, tests/novela.test.mjs, index.html (only the "Leer novela" href if needed). Regenerate with `node tools/novela-build.mjs` (all chapters).

Owner wants https://lichpol.vercel.app/novela/kuroto/001 instead of .../001.html.

1. Create `vercel.json` at the repo root with exactly `{ "cleanUrls": true }` (Vercel then serves 001.html at /novela/kuroto/001 and 308-redirects *.html to the clean URL). No other keys. Make sure .vercelignore does not exclude vercel.json (Vercel reads it regardless, but confirm it is not listed).
2. Navigation links must be ROOT-ABSOLUTE and extensionless, because the TOC may be reached as /novela/kuroto (no trailing slash), where a relative "001" would resolve to /novela/001:
   - chapter links in the TOC, "Empezar a leer", the continue-reading link: `/novela/kuroto/001`
   - prev/next pagination blocks and `data-prev-href` / `data-next-href` (keyboard/swipe/end-of-chapter navigation, and the `#fin` variant: `/novela/kuroto/090#fin`)
   - links to the TOC ("Índice de Kuroto", breadcrumb "Kuroto", chapter 1's prev): `/novela/kuroto/`; breadcrumb book link: `/novela/kuroto/#libro-3`
   - links to the home page (brand, La Taberna items, breadcrumb "Lichpol"): `/` and `/#dungeon-master`, `/#campanas`, `/#cronicas`, `/#comunidad`
   - js/novela.js: wherever it builds or compares chapter hrefs (continue-reading record -> href, matching TOC links by href, prev/next navigation), use the same extensionless absolute form; keep backward compatibility when reading an old stored record.
   Keep asset URLs (css, js, fonts, images, og:image) exactly as they are (relative `../../...` assets work with or without the trailing slash).
3. Output files on disk stay `novela/kuroto/NNN.html` and `index.html` (Vercel maps them); only hrefs change. The stale-file cleanup in the generator must keep working.
4. Tests: update any test asserting `.html` hrefs and add one asserting the generated chapter 001 page has prev `/novela/kuroto/`, next `/novela/kuroto/002`, and no `href="...NNN.html"` navigation links.
5. Do not add `<link rel="canonical">` (accepted decision D6: no canonical until a custom domain is confirmed).

Acceptance: build 181/0 and 182 pages; `node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs tests/novela.test.mjs` passes; `grep -E 'href="[^"]*[0-9]{3}\.html' novela/kuroto/*.html` returns nothing. Report the changed spots.
