# Codex task R42: Kuroto reader v2, open-book spread (layout, pagination, slide turn)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools (Claude verifies the render). Context: tasks/codex-r39.md, r40.md, r41.md (implemented). Regenerate with `node tools/novela-build.mjs --limit 3`; never hand-edit novela/kuroto/*.html.

## Why
Owner reviewed the sneak peek: the single reading column in Cormorant Garamond is "sosillo", not state of the art. New direction (owner's words): an open book, two pages 50/50 with the fold in the centre, parchment pages, motion when turning pages, dark-fantasy register fitting the site. The book must span the site container width (same left/right edges as the header content: brand left edge to Twitch CTA right edge) with the fold exactly on the container centre line.

## Keep (verified, do not regress)
Generator + validation of all 181 chapters, static pre-rendered pages, TOC page structure, card CTA in index.html, header (same as index.html incl. music switch), breadcrumb, `<title>`/meta, no-JS readability, ArrowLeft/ArrowRight, continue-reading on the TOC, rel prev/next links. Accepted decisions D7, D9, D10, D11, D12 stay protected (no changes to tokens.css, site.css, home.css, index.html beyond what already exists).

## Scope (files)
tools/novela-build.mjs (chapter template only), css/novela.css (rewrite the chapter reading styles; TOC styles may stay), js/novela.js (rewrite the chapter-page enhancement), tests/novela.test.mjs (add tests for any new pure helpers, e.g. page/line math, hash parsing).

## Visual system (chapter page)
- The book sits on the dark page like an object on a table: a subtle desk surface behind it built from the existing `--material-wood` or `--material-leather` recipe (low contrast, it must not compete), the book with a soft drop shadow.
- Pages: parchment. Do NOT use `--material-parchment` as is (its corner reaches #6C543E, too dark for text). Define a component-local page material in css/novela.css (custom properties on the reader root, e.g. `--page-paper`, `--page-ink`, `--page-accent`), marked with a comment "PROPOSED (D13 v2)": light warm parchment in the #DCCFAE-#CDBB92 range in the text area, darker only as a vignette at the outer margins, faint fibre/grain allowed only if cheap (gradients, no images). Text ink from existing pigments (`--ink-900`/`--ink-850`), drop cap and ornaments in `--rust-600` or `--brass-700`. Text contrast on the lightest AND darkest part of the text area >= 4.5:1.
- Fold: a spine shadow down the centre (gradient darkening into the gutter on both pages) so it reads as a bound book. A thin stack of page edges on the outer sides (2-4 offset lines) is welcome; keep it subtle.
- Typography inside the book: body in `--font-book` (new component variable, set to "Alegreya" 400 with its italic; files already in assets/fonts/alegreya-latin-400-normal.woff2 and -400-italic.woff2, license OFL-alegreya.txt; add @font-face with font-display swap and preload the normal face). The owner has NOT chosen the font yet; the family must be swappable by changing only `--font-book` and the @font-face. Size: on-scale token (`--text-body` 16px or `--text-h6` 20px; choose for a comfortable 55-70 characters per page line at 1440 and say which). Line-height ~1.55. `text-align: justify; hyphens: auto;` (lang="es" already on html). First-line paragraph indent, flush after headings and scene breaks (current rule). Drop cap on the first paragraph in Cinzel, rust/brass. Scene break ornament ✦ centred in accent colour. Chapter opening at the top of the first page: "Capítulo N" + chapter title in Cinzel (ink colour), small book line; no tracked all-caps eyebrow inside the book.
- Running heads (overlays, not in the text flow): left page "Kuroto" + book title, right page chapter title, Cinzel small, accent colour. Folios (page numbers) at the bottom outer corners. Hide running heads on the chapter's first page.
- Outside the book (below it, not inside the paged area): page controls (previous page / next page buttons with accessible names, >= 44px), a status "Páginas 3-4 de 18" (single page on mobile: "Página 3 de 18"), then "Ver el directo original", then chapter prev/next blocks (existing), then breadcrumb stays above the book. No focusable element may live inside the paged content.

## Pagination (the core)
- Enhancement only with JS: add a class on the reader root after `document.fonts.ready`; without it, the chapter renders as a continuous parchment sheet that scrolls (one page width, no columns), fully readable.
- Use CSS multi-column on the article: fixed height, `column-width` = page text width, `column-gap` = fold gutter + both inner margins (so column N and N+1 sit on the left and right page of the same spread), `column-fill: auto`. A spread = 2 columns on desktop, 1 column on < 1024px (header breakpoint). Turning = `transform: translateX()` by one spread on an inner wrapper. Page count = from scrollWidth.
- Snap the column height to a whole number of lines: floor(available / lineHeightPx) * lineHeightPx, so no line is ever clipped at a page bottom. Headings, drop cap and scene breaks must not break the baseline grid badly: give them heights/margins that are multiples of the line height where practical, `break-inside: avoid` on scene breaks, `break-after: avoid` on the chapter heading.
- Book height = viewport height minus header minus the controls band, clamped (e.g. min 520px, max 860px) on desktop; on mobile use the small viewport height (svh) and ignore height-only resizes under ~120px (mobile URL bar) to avoid repagination while scrolling.
- Resize: debounce, repaginate, restore the position by anchoring to the first paragraph visible on the current left page (store its index), not by page number.
- State: `#p=N` (1-based page) in the URL hash with history.replaceState so refresh keeps the page; `#fin` opens the last spread. Coming back from the next chapter (left/previous on the first spread) navigates to `prev.html#fin`; next on the last spread navigates to the next chapter. On the TOC "Continuar" store chapter + page (localStorage key `lichpol:kuroto:ultimo`, JSON `{c, p}`, wrapped in try/catch, keep backwards compatibility with the old numeric value).
- Input: existing ArrowLeft/ArrowRight now turn pages (and cross chapters at the ends), PageUp/PageDown too; click/tap on the outer half of each page turns back/forward (not on text selection: ignore if the selection is non-empty); horizontal swipe (pointer events, threshold ~50px, vertical-scroll friendly); the two buttons.
- Turn animation in this task: a short slide/fade of the spread (transform/opacity only, 280-380ms, ease-out) plus a fold shadow pulse. The real 3D leaf flip comes in R43; structure the code so a `turn(direction)` function can later delegate to a flip animator.
- prefers-reduced-motion: instant page change.
- Live region (polite) announces "Páginas 3-4 de 18" after each turn. Off-screen columns stay in the DOM (screen readers read linearly).
- Reading progress bar at the top: now reflects page / pageCount.

## Mobile (< 1024px)
Single page (no fold), same parchment and mechanism, full width minus the site gutter, slide turn, swipe. No horizontal page scroll.

## Acceptance
- Build: 181 validated, 0 errors, 4 pages written. Tests: `node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs tests/novela.test.mjs` pass (add tests for the new pure helpers).
- Report: chosen body size and resulting characters per line estimate, the page material values, how line snapping is done, and anything you could not satisfy.

## Stop and escalate
If CSS columns cannot give a stable spread (e.g. column positions drift from the fold), stop and report what you measured instead of switching to manual text splitting.
