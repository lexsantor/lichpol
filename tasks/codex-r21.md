# Codex task R21: modular type scale, 16px floor, icon-label pairing, direct CTAs

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Do not use computer-use/browser tools (Claude verifies rendering).
Files: css/tokens.css, css/site.css, css/home.css, css/d20.css, index.html (CTA copy only), design.md (section 07.3 only).
Legacy pages (campanas.html, etc.) share site.css but are excluded from deploy; do not test or adapt them.

## 1. The scale (owner decision)
Modular scale, ratio 1.125, base 16, rounded: 14, 16, 18, 20, 23, 26, 29, 32, 36, 41, 46, 52, 58, 66, 74, 83.
Define it ONCE in css/tokens.css as custom properties. Keep `--text-sm:14px`, `--text-base:16px`, `--text-lg:18px`; change `--text-xl` to 20px; delete `--text-xs`; add the remaining steps (`--text-2xl:23px` ... up to 83px, one token per step, consistent naming).
Every `font-size` (including `font:` shorthands) in site.css, home.css and d20.css must use one of these tokens. No raw px, rem, em or vw font sizes remain, except `.brand small` ("THE ARCANE TAVERN" logotype lockup, leave untouched).

## 2. No fluid clamps for type
`clamp(..., Nvw, ...)` produces off-scale sizes (57, 61, 72px...). Replace each with stepped scale values at the breakpoints the CSS already uses (<=540, <=900/1050 where applicable, desktop). For each heading pick the scale steps nearest to today's min (mobile) and max (desktop) so the visual hierarchy stays the same (e.g. hero h1 ~52 mobile -> 83 desktop; h2 36 -> 58; h3 20/23 -> 29). Line-height may be adjusted per step for good rhythm.

## 3. Readability floor
- 16px minimum for anything read as text: body, intros, nav links, `.text-link`, `.btn` labels (all sizes incl. `.btn-sm` and the header CTA), `.home-inline-link`, calendar rows and quips, schedule status, archive titles, card meta lines, card synopses, footer text and links, d20 panel text.
- 14px allowed ONLY for tracked uppercase micro-labels: `.eyebrow`, `.pill`, the HOY / PRÓXIMA badges, archive roman numerals, "HORA DE MADRID" label, footer column headings (uppercase).
- Nothing below 14 (except `.brand small`).
- Remove the overlapping nav size hacks (13/12/11px for `.site-nav a`).

## 4. Icon-label pairing (owner rule: icon height == label height)
One global rule: `.icon { width: 1em; height: 1em; }` (flex-shrink 0) and a gap of `.3125em` (5px at 16px, matching the reference: gap = 5/16 of font size) between icon and label in `.btn`, `.text-link`, `.home-inline-link`, footer channel links and any other icon+label container. Icons inherit the label's font-size; do not set per-icon px sizes. Icon-only buttons (menu toggle, footer icon links, d20 trigger) keep their touch target (>=44px) and may set font-size on the container from the scale.

## 5. CTA copy (index.html, visible text only; keep visually-hidden helper text)
- "Explorar las campañas" -> "Explorar campañas"
- "Ver partidas en Twitch" -> "Ver en Twitch"
- "Ver el canal de YouTube" -> "Ver en YouTube"
- "Ver el calendario en Twitch" -> "Calendario en Twitch"
- "Empezar por el capítulo 1" (Kuroto) -> "Capítulo 1"
- every "Ver la campaña" -> "Ver campaña"
Leave "Ir a Twitch", "Entrar en la comunidad" and everything else unchanged.

## 6. design.md section 07.3
Replace the type table with the new scale, the 16px floor + 14px exception list, the icon rule (1em, gap .3125em) and the "no vw-fluid type, step at breakpoints" rule. Remove the 13/12/11px guidance it contradicts. Spanish, concise.

## Stop rules (escalate, do not improvise)
- If the header (4 nav links at 16px + CTA at 16px) cannot fit at 1024px: report it with the measured widths and propose either moving the hamburger breakpoint up or dropping uppercase/letter-spacing on `.btn-sm`. Do NOT shrink below 16.
- If any section would need layout changes beyond font sizes/line-heights/gaps, report instead of redesigning.

## Acceptance
- `grep -nE "font(-size)?:[^;]*([0-9.]+(px|rem|em|vw))" css/site.css css/home.css css/d20.css` shows only token usages (and `.brand small`); paste the residual list.
- node --test tests/d20.test.mjs tests/schedule.test.mjs passes.
- List of CTA strings before/after.
- Claude will run a computed-style audit (every element's font-size must be in the scale) at 375/768/1024/1440.
