# Codex task R2 (Lichpol home, fix round 2)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No dependencies, no CDN, no commits.
Allowed: index.html, css/home.css, css/d20.css, js/d20.js, js/d20-core.js (PHRASES strings only), tasks/home-v1-spec.md (phrase list only, keep it in sync).
Protected: css/tokens.css, css/site.css, js/site.js, tests/*, assets/*, other *.html, design.md, docs/*.

## F1 (P1) Mobile H1 leaves the grid
Round 1 fixed the clipping with `width: calc(100% + 32px); margin-inline: -16px` at <=540px. That pushes the H1 out of the 20px gutter: its left edge sits at ~6px while the eyebrow, lead and CTAs sit at 20px. Remove the negative margin/width hack. Instead size the H1 so the unbreakable final unit "permiten regresar." (js/site.js joins the last two words with a no-break space) fits inside the normal content box at every width from 320 to 540px (e.g. a vw-based clamp tuned for the real Cinzel metrics and the current letter-spacing). Acceptance: at 320, 360, 375, 390, 414, 480, 540 px the H1 left edge equals the eyebrow left edge, `h1.scrollWidth <= h1.clientWidth`, no single-word last line. Keep it as large as that allows.

## F2 (P2) Live announcement repeats the label
The live text is "Has sacado un {n}. {Categoría}. {Frase}", so phrases that start by restating the result read twice ("Has sacado un 1. Pifia crítica. Has sacado un 1. Hasta..."). Replace exactly these strings in js/d20-core.js PHRASES and in tasks/home-v1-spec.md:
- fumble: "Has sacado un 1. Hasta el cadáver del suelo ha sentido vergüenza ajena." -> "Hasta el cadáver del suelo ha sentido vergüenza ajena."
- fumble: "Pifia. El bardo ya está componiendo la canción. No es una canción heroica." -> "El bardo ya está componiendo la canción. No es una canción heroica."
- good: "Buena tirada. El bardo toma notas, por si acaso." -> "El bardo toma notas, por si acaso."
- critical: "Crítico. Los dioses te favorecen. No te acostumbres, miserable." -> "Los dioses te favorecen. No te acostumbres, miserable."
- critical: "Un 20 natural. Por un instante, eres la leyenda que dices ser en la taberna." -> "Por un instante, eres la leyenda que dices ser en la taberna."
- critical: "Crítico. Hasta el Dungeon Master ha dejado de sonreír." -> "Hasta el Dungeon Master ha dejado de sonreír."
Change nothing else in d20-core.js. `node --test tests/d20.test.mjs` must still exit 0.

## F3 (P1, art direction) The d20 reads as a line drawing on a badge, not as a physical object
Current: thin brass wireframe icosahedron inside a circular bordered plate; the number is small (~1/5 of the die height) and sits in a small lower triangle, crossed by edges.
Target: a dark, solid, faceted die with weight. Redraw the inline SVG as a proper d20 front view:
- Hexagonal silhouette (flat-ish, vertex up), with the classic layout: one large central UPWARD triangle face (about 55-60% of the die width) holding the number, three adjacent trapezoid/triangle faces around it, and the outer ring of facets.
- Facets are FILLED planes with 3-4 tonal values from the ink scale (e.g. --ink-700 lit top-left faces, --ink-850 mid, --ink-950 shadow faces; a very subtle linear gradient per face is fine) so light reads as coming from the top-left like the candles in the art. Edges: 1-1.25px --brass-500 with a --brass-300 highlight only on the top-left edges.
- Number: Cinzel 600, --bone-100 (brass-300 on 20, rust-400 on 1 as already implemented), centred optically inside the central triangle (lower-centre of the triangle), about 34-38% of the die height, never touching or crossed by an edge. Two-digit numbers must fit.
- Remove the circular plate and its border. The button keeps a 64x64 (56x56 mobile) transparent hit area; the die itself carries a soft drop shadow (filter: drop-shadow with low-opacity black, plus at most a very faint warm rim on hover). Focus ring stays visible and themed (it may become a circle/rounded outline around the hit area).
- Keep the existing roll animation, flicker, lock, popover, live region, reduced-motion path and 1/20 treatments working with the new SVG (update selectors if needed).

## Acceptance
- `node --test tests/d20.test.mjs` exit 0.
- `node --check js/d20.js` exit 0; one h1; ids unique; aria/popover references resolve.
- Report selectors/values for F1 and the SVG structure for F3. Claude verifies in a real browser.
