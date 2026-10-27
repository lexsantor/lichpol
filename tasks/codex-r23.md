# Codex task R23: replace the modular scale with the owner's fixed type scale

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Do not use computer-use/browser tools (Claude verifies rendering).
Files: css/tokens.css, css/site.css, css/home.css, css/d20.css, design.md (section 07.3 only). No HTML/copy changes.
This supersedes the R21 scale (1.125 modular). Keep everything else from R21: tokens-only font sizes, no vw-fluid type, icon = 1em with gap .3125em, CTA copy.

## Owner scale (2026-10-27), the ONLY allowed font sizes
| Style | px |
|---|---|
| H1 | 62 |
| H2 | 48 |
| H3 | 40 |
| H4 | 32 |
| H5 | 26 |
| H6 | 20 |
| Body | 16 |
| Small | 12 |
(`.brand small` logotype lockup stays as is; it is the only exception.)

Replace the R21 tokens in css/tokens.css with exactly these 8 tokens (e.g. --text-h1 ... --text-h6, --text-body, --text-small). Delete the other scale tokens. Every font-size in site.css/home.css/d20.css references one of them.

## Rules
1. Default by semantic level: h1=H1, h2=H2, h3=H3, h4=H4, h5=H5, h6=H6.
2. Components may apply a SMALLER heading style from the same table when their role requires it (e.g. "Otras mesas" index label -> H6; small group labels). Never a size outside the table.
3. Responsive stepping, only with values from the table, at the existing breakpoints:
   - desktop (>900): as table.
   - tablet (541-900): every heading style one step down (H1 48, H2 40, H3 32, H4 26, H5 20, H6 20).
   - mobile (<=540): two steps down (H1 40, H2 32, H3 26, H4 20, H5 20, H6 16).
   Body and Small never change.
4. Body 16: everything read as text (paragraphs, hero lead, nav, buttons incl. header CTA, text links, inline links, card meta, synopses, calendar rows/quips/status, archive titles, footer text/links, d20 panel text).
5. Small 12: captions, helper text, timestamps, and uppercase tracked micro-labels only: `.eyebrow`, `.pill`, HOY/PRÓXIMA badges, archive roman numerals, "Hora de Madrid", footer column headings. Nothing else at 12.
6. Large display numerals (d20 result) use H1.
7. Line-heights: headings ~1.1-1.2, body 1.6-1.7; adjust so nothing clips.
8. #campanas group headings ("Campañas", "Aventuras"): use H5 (26) on desktop so they sit clearly below the section H2 but above card titles (h4 -> H6 20 inside cards is acceptable if H4 32 overwhelms a half-width card; pick one and apply consistently to all six cards).

## design.md 07.3
Replace the R21 modular-scale text with this table, the stepping rule, the Body/Small usage lists and the "semantic level vs visual style" rule. Spanish, concise.

## Stop rules
- Header at 1024 (nav + CTA at 16) must not overflow; if it does, report, do not shrink below 16.
- No layout restructuring; only sizes, line-heights, gaps.

## Acceptance
- grep of font/font-size declarations in the 3 CSS files shows only the 8 tokens (+ `.brand small`); paste residuals.
- node --test tests/d20.test.mjs tests/schedule.test.mjs passes.
- List: which selectors use each token.
