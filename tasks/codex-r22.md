# Codex task R22: reorder #campanas groups, campaigns 2x2 reversed, Aventuras 50/50

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Do not use computer-use/browser tools (Claude verifies rendering).
Files: index.html (#campanas section only), css/home.css (.home-worlds* rules only). Keep the R21 type scale tokens; no raw font sizes.

Owner decisions (2026-10-27):
1. Group order inside #campanas: the "Campañas" group (h3) comes FIRST, then the "Aventuras" group (h3), then "Otras mesas" (unchanged).
2. Campañas: keep the 2x2 grid (a 4-column row was measured at 284x881px per card at 1440, too elongated; owner rule says fall back to 2x2). New card order: Tierra de Dragones (Campaña 4), La Guerra de Brunami (Campaña 3), En la Bruma (Campaña 2), No despiertes lo que no ha de ser despertado (Campaña 1). Move the markup, do not change card content.
3. Aventuras: two equal columns (50/50), order Xoltacan first, Kuroto second. Both use the SAME card component as the campaign cards (`.home-worlds__card`: image on top, meta, h4, synopsis, links). Kuroto stops being the overlay "feature" card; keep its image, meta, h4, synopsis paragraph and links exactly. Update its <img> `sizes` to match a half-width card. Remove CSS that becomes unused (the feature-only rules), nothing else.
4. Mobile (<=540) and tablet: single column for Aventuras is fine below the breakpoint the campaigns grid already uses; keep consistent with the campaigns grid behaviour.
5. Equal heights per row are fine; links aligned at the bottom of each card as the campaign cards already do.

Acceptance:
- In index.html, order of h3/h4 inside #campanas: Campañas > Tierra de Dragones, La Guerra de Brunami, En la Bruma, No despiertes...; Aventuras > Aventuras en Xoltacan, Aventuras en Kuroto; Otras mesas.
- 0 occurrences of `home-worlds__feature` left in index.html and css/home.css (or report why one must remain).
- node --test tests/d20.test.mjs tests/schedule.test.mjs passes.
- Diff summary.
