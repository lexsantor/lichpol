# Codex task R56: hyphenation in Safari + safe fallback on narrow pages (CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Edit css/novela.css only. Do not touch assets/, tools/novela-laminas.json, tasks/art-src/. No browsers. Regenerate with `node tools/novela-build.mjs`.

Measured by Claude in Playwright WebKit 26.5 at 390x844 (chapter 003, page 2): justified text on the single mobile page shows very wide word gaps ("fue   un   mono   despatarrado   sobre   una"), because no word is hyphenated. css/novela.css declares `hyphens: auto` (line ~625) and `text-align: justify` (~659) but not `-webkit-hyphens: auto`, which Safari/iOS needs.

1. Add `-webkit-hyphens: auto;` next to every `hyphens: auto;` in the reader prose, plus `hyphenate-limit-chars: 6 3 2;` (and `-webkit-hyphenate-limit-before: 3; -webkit-hyphenate-limit-after: 2;` for older Safari). `lang="es"` is already on <html>.
2. Fallback: on single-page widths (< 1024px), only justify when hyphenation is supported: `@supports not ((hyphens: auto) or (-webkit-hyphens: auto)) { ... text-align: left }`, and on very narrow pages (< 400px) use `text-align: left` with `hyphens: auto` regardless, since justified 28-35 character lines produce rivers even with hyphenation. Keep desktop spreads justified.
3. Do not change font size, line height or margins (line snapping must stay intact).

Acceptance: build 181/0, 182 pages; tests pass; paste the changed rules.
