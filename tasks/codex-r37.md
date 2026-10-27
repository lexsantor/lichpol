# Codex task R37 (small): "Finalizada" badge on the Kuroto card

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Files: index.html (Kuroto card only), css/home.css (badge placement only; reuse the existing `.pill` component from css/site.css).

Owner decision (2026-10-27): "Aventuras en Kuroto" has ended. Add a status badge with the text "Finalizada" (rendered uppercase by the pill style) to the Kuroto card ONLY. No other card gets a status. No other copy changes (the novel adaptation will come later; do not mention it).

Design:
- Reuse `.pill` (Small 12px, uppercase, tracked). Use an existing pill variant or a new modifier built only from existing tokens; solid background so it reads on top of the image; text contrast >= 4.5:1.
- Position: overlaid on the card image, top-left corner, inset 16px (same inset at all widths). It must not cover the card's focusable links.
- Markup inside the Kuroto `<article>`, before the h4 in DOM order is fine; screen readers should hear "Finalizada" as plain text (no aria-hidden).

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs); report markup + CSS added.
