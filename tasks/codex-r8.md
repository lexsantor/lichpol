# Codex task R8: typography, removals and icons (owner feedback 2026-10-23)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No installs, no CDN, no commits.
Allowed files: index.html, css/home.css, css/d20.css, css/tokens.css (ONLY the --font-ui line), js/d20.js (only if an icon change requires it).
Protected: css/site.css, js/site.js, js/d20-core.js, tests/*, assets/*, other *.html, design.md, docs/*.
Read first: tasks/icons.md (ready-made single-colour SVGs + attribution), the current index.html, css/home.css, css/tokens.css.

The site owner reviewed the live page and decided the following. These are explicit owner decisions: apply them even where design.md says otherwise.

## 1. Cinzel on the elements marked by the owner
Set these in Cinzel (var(--font-title)), weight 600, no text-transform (Cinzel is already a capital-form face), letter-spacing about .04em:
- Primary navigation links: `.site-nav a` on the home (desktop header AND the mobile menu, it is the same element). Size 14px desktop, 15px in the mobile menu. Keep the existing hover/current states and the 47px min-height rows of the mobile menu.
- The Dungeon Master fact list labels: the four `<dt>` (Sistemas, En directo, Archivo, Comunidad). 13-14px, colour unchanged.
- The archive ledger campaign labels: `.home-archive__campaign` (Kuroto, Campaña III, Tierras Salvajes, Xoltacan, Star Wars). 13px, colour unchanged.
Scope the rules to the home (css/home.css); do not change css/site.css.

## 2. Remove
- The hero credit paragraph `p.home-hero__credit` ("Ilustración conceptual. No es una localización canónica.") and any CSS that only serves it. Keep the hero entrance animation working for the remaining steps.
- The Dungeon Master image `<figcaption>` ("Bodegón conceptual: sombrero, gafas y d20. No es un retrato.") and its CSS. Keep the <figure>/<img> and its alt text.
Do not remove other transparency copy (the campaigns intro sentence and the footer base line stay).

## 3. Replace Inter with DM Sans everywhere
- css/tokens.css: change only the --font-ui line to `--font-ui: 'DM Sans','Segoe UI',Arial,sans-serif;`.
- css/home.css: replace the Inter @font-face with `font-family: "DM Sans"; src: url("../assets/fonts/dm-sans-latin-wght.woff2") format("woff2"); font-weight: 100 1000; font-style: normal; font-display: swap;` (the file already exists). Remove any other reference to Inter.
- After the switch, check that no UI text overflows or wraps worse (buttons, nav, pills, ledger rows, d20 panel); adjust only spacing/size if something breaks.

## 4. Icons from Reicon (tasks/icons.md)
- Add ONE hidden inline SVG sprite right after <body> opening (before the skip link is fine): `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">` with a `<symbol id="i-twitch|i-youtube|i-discord|i-instagram|i-x|i-external" viewBox="...">` per icon, using the exact path data from tasks/icons.md (keep each symbol's viewBox, fill/stroke and fill-rule attributes). Put this comment immediately before the sprite: `<!-- Icons: Reicon (MIT) https://github.com/dqev/reicon, includes elements from Solar Icons by 480 Design (CC BY 4.0). Brand marks are trademarks of their owners. -->`
- Use them with `<svg class="icon icon--NAME" aria-hidden="true" focusable="false"><use href="#i-NAME"/></svg>`. Icons are always decorative: link text stays as the accessible name.
- Replace EVERY decorative `↗` (all `<span aria-hidden="true">↗</span>`) with the i-external icon.
- Add the brand icon before the link text where the link goes to that platform and is a channel/CTA link: header "Ver en Twitch" (twitch), hero "Ver partidas en Twitch" (twitch), the hero channel strip (twitch / youtube / discord), the DM fact links (twitch / youtube; the "Discord" fact is an in-page anchor: discord icon, no external arrow), Crónicas "Ir a Twitch" (twitch) and "Ver el canal de YouTube" (youtube), the archive row source tag "YouTube" (youtube icon before the word, external arrow after), community "Entrar en la comunidad" (discord), the Instagram and X text links (instagram / x), and the footer "Canales" list (one brand icon per item). Campaign links ("Ver la campaña", "Capítulo 1", "Empezar por el capítulo 1", "Otras mesas") get ONLY the external arrow, no brand icon (avoid icon repetition).
- CSS (home.css): `.icon{width:1em;height:1em;flex:none;display:inline-block;vertical-align:-.125em}`; brand icons in buttons 16px, in text links 1.05em, external arrow .85em; links that combine icon + text become inline-flex with gap 8px (arrow gap 4px) and align-items center. Colour always currentColor (inherits link/button colour, including hover). No colour brand fills.

## Acceptance (report evidence)
- One h1; ids unique; every `<use href>` points to an existing symbol id; zero `↗` characters left in index.html (`grep -c "↗" index.html` = 0); no "Inter" left in index.html, css/home.css, css/d20.css, css/tokens.css.
- `node --test tests/d20.test.mjs` exit 0; `node --check js/d20.js`.
- Report every changed selector/value and the list of links that received which icon. Claude verifies rendering, overflow, contrast and keyboard in a real browser.
