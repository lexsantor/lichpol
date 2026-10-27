# Codex task R43: closed tome cover + 3D page flip (Kuroto reader v2)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Builds on R42 (tasks/codex-r42.md, implemented and verified by Claude). Files: tools/novela-build.mjs (chapter template), css/novela.css, js/novela.js, tests/novela.test.mjs. Regenerate with `node tools/novela-build.mjs --limit 3`. Same protected scope as R42. Body font is Alegreya (owner accepted).

## Owner request (2026-10-27)
"Al entrar por primera vez a leer la novela, que se vea la portada como un libro antiguo de una biblioteca de alguna torre maldita y olvidada; al hacer click la portada se desvela y se pasa a leer el libro; que se vean los lomos laterales una vez desplegado el libro. Autenticidad dark-fantasy."

## 0. Fix first: defects measured by Claude on the R42 render (Chromium)
- CRITICAL, mobile column drift: at 375px the first two column lefts are 45 and 330 (pitch 285px) but each turn translates by the viewport width (~335px). From page 2 on, the visible area shows slices of two pages side by side. The translate step must equal the real column pitch (column width + column-gap) on every breakpoint; derive it from the computed/measured column positions, not from the viewport width. Desktop happens to be correct (fold centred at 720/720 and 512/512) and must stay so. Add a unit test for the step math.
- Breadcrumb regression: on chapter pages the breadcrumb now renders as a default ordered list ("1. Lichpol 2. Kuroto 3. Libro I"). Restore the previous inline style (no list markers, › separators) aligned with the book's left edge.
- Resize anchor: at 1440, on spread 5-6 the first visible paragraph index is 13; after resizing to 1024x800 and back to 1440x900 it shows paragraph 7. Restore the anchor correctly (store the anchor paragraph index before repaginating and compute the page that contains its first line after repagination; skip storing a new anchor while a repagination is pending).

## 1. Closed tome (cover)
- Shown on a chapter page when the reader enters from outside the reader: no `#p=`/`#fin` hash AND sessionStorage `lichpol:kuroto:abierto` not set (try/catch; if storage fails, show it). Chapter-to-chapter navigation sets the flag, so the cover appears once per browsing session. Never shown without JS.
- Composition, centred where the book will open, same height as the open book, width = one page (a closed book is half the spread) positioned on the RIGHT half so it opens naturally around the fold (spine at the container centre line):
  - Front board: aged dark leather from `--material-leather` (+ darker worn edges, subtle scuffs via gradients only), brass corner pieces on the outer corners and a brass clasp on the fore-edge (CSS shapes using brass pigments), a thin gilt double-rule frame inset.
  - Title "Aventuras en Kuroto" in Cinzel 600, gilt (brass-300 to brass-500 gradient text or solid brass-300 with a soft dark emboss shadow), "Lichpol" small below; no all-caps tracked eyebrow.
  - A small inset plate with the existing art `assets/kuroto-640.webp` aged with CSS filters (sepia, low saturation, contrast, vignette) inside a brass bezel. Decorative: alt="" and aria-hidden on the plate.
  - Spine visible on the left edge of the closed book (rounded leather band with raised bands/ribs in a slightly lighter leather) and the page block edge visible on the right and bottom (parchment lines).
  - Atmosphere around it: a faint dust/vignette pool of light on the desk, no particles animation by default.
- The whole cover is a `<button type="button">` with accessible name "Abrir el libro" and visible focus; also opens on click anywhere on the cover, Enter and Space. While closed, page controls below are hidden or disabled; the live region announces "Libro abierto" after opening, then focus moves to the "Página siguiente" control.
- Opening motion: the front board rotates around the spine (rotateY 0 -> -180deg, transform-origin at the spine, perspective on the book stage, backface: the inside of the board shows a marbled/endpaper pattern built with gradients), ~1000-1200ms ease-in-out, while the book shifts from "closed right half" to the centred open spread. Transform/opacity only. After the animation the cover elements are removed or `hidden` and the reader is fully interactive. Reduced motion: 200ms opacity fade, no rotation.

## 2. Open book: visible boards and edges
- When open, the leather boards (same material as the cover) extend a few px beyond the pages on top, bottom and outer sides, with the spine shadow in the fold, so the open book reads as a bound tome, not two cards.
- Page-block edges: 3-5 stacked parchment lines on the outer sides; their apparent thickness should reflect progress through the chapter (left stack grows, right stack shrinks as pages turn). Keep it subtle and cheap (box-shadows or pseudo-elements).
- Mobile (< 1024px, single page): no cover rotation around a centre spine; the cover opens with the board rotating around its left edge to the left and fading. Boards and edges scaled down.

## 3. 3D page flip (replaces R42 slide on desktop)
- Implement the flip animator behind R42's `turn(direction)` hook. Forward: a leaf hinged at the fold rotates from the right page over to the left (rotateY 0 -> -180deg, origin at the fold), front face = clone of the current right page, back face = clone of the next left page; underneath, the next spread is already in place. Backward mirrors it. Each face is an `overflow:hidden` box holding a clone of the paginated article translated to show the right column; clones get `aria-hidden="true"` and `inert` and are removed after the animation. `backface-visibility: hidden`, perspective on the stage, a moving shade gradient on the leaf (darker near the fold mid-turn) for realism. 650-800ms, transform-only. Ignore input while a flip runs (or queue at most one).
- Mobile single page: page slides/curls off to the left (rotateY around the left edge with fade), next page underneath. 
- Reduced motion: instant (R42 behaviour).
- Performance: clones only during the flip, `will-change` only on the leaf while animating, no layout thrash per frame.

## Acceptance
Build 181/0 and 4 pages; `node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs tests/novela.test.mjs` pass (add tests for the cover-visibility rule as a pure function: hash + storage flag -> show/hide). Report what you built per section and anything not achieved.

## Stop and escalate
If the clone-based flip cannot show the exact same text as the underlying pages (column offset drift), report measurements instead of faking it with blank leaves.
