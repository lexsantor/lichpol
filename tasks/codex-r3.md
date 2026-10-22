# Codex task R3 (trivial, css/home.css only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Edit ONLY css/home.css. No other file, no dependencies, no commits.

Measured in Chromium after R2:
- At <=540px the hero H1 uses `font-size: clamp(1.75rem, 10vw, 3.4rem); letter-spacing: -.06em`. The tracking is so tight that Cinzel letters touch ("HISTORIAS"), and it still overflows its box: scrollWidth 342>335 at 375px, 356>350 at 390, 377>374 at 414.
- At 375px the community band paragraph (#comunidad p) has a worst-pixel contrast of 3.61:1 (candle highlights behind the copy), average 9.68:1.

Changes:
1. In the `@media (max-width: 540px)` rule for `.home-hero h1`: set `font-size: clamp(1.75rem, 9.2vw, 3.4rem)` and `letter-spacing: -.03em`. In the `max-width: 360px` rule keep `clamp(1.75rem, 8.75vw, 2.25rem)` and set `letter-spacing: -.03em` too. Do not reintroduce negative margins or width hacks.
2. In the mobile (<=540px) community band veil, darken the gradient only in the zone behind the copy block (raise the stops that sit under the heading/paragraph by about .08-.12 opacity) so the candle highlights no longer show through the paragraph, keeping the upper part of the image visible.

Report the exact before/after declarations.
