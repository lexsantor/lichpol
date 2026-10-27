# Codex task R24: three render defects after R23 (CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser/computer-use tools. Files: css/home.css, css/site.css (and design.md 07.3 only if a stepping rule changes). Use only the 8 type tokens.

Defects observed by Claude in real renders (Chromium):
1. 375px: `.home-hero h1` at 40px (Cinzel uppercase) overflows the viewport; "REGRESAR." is clipped at the right edge. Fix: at <=540 the hero h1 uses the H4 token (32px). Also make sure long words cannot overflow (`overflow-wrap: break-word` as safety, no hyphenation). Update design.md 07.3 stepping note: "H1 de hero en móvil: H4 (32)".
2. 1024px: header CTA "VER EN TWITCH" wraps onto 2 lines. Fix: `.header-cta`/`.btn` labels never wrap (`white-space: nowrap`); then make the header fit at 1024 by reducing nav gaps (min 16px) and the header gap. If it still cannot fit between 901 and ~1100px, move the existing hamburger breakpoint up to the smallest width where the full header fits, instead of shrinking type. Report the chosen breakpoint.
3. 375px: hero channel links (`Directos en Twitch`, `Archivo en YouTube`, `Comunidad en Discord`) wrap to two lines and the external arrow drifts to the far edge. Fix: at <=540 show them as a single column list, one link per row, each link `white-space: nowrap` with icon + label + arrow kept together (inline-flex, gap .3125em, no justify space-between). Remove the vertical separators in that layout.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs); report the exact selectors changed and the hamburger breakpoint value.
