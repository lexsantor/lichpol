# Codex task R33: two R32 render defects (CSS/markup only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Files: index.html (header only if needed), css/home.css and/or css/site.css.

Measured by Claude in Chromium:
1. Desktop (>=1024): "Aventuras ↗" is rendered TWICE inside `.site-nav` (both links visible). The drawer-only copy must be hidden on desktop and the desktop copy hidden in the drawer, or better: keep a single "Aventuras" link in the markup and place it correctly for both layouts. Exactly one visible "Aventuras" link at every width.
2. Mobile drawer (<=1023): the "Ver en Twitch" CTA (`.btn.btn-primary.btn-sm.nav-drawer-cta`) inherits the drawer link styles: color rgb(220,208,191) on rgb(209,170,102) = 1.43:1 contrast, 16px, no uppercase. It must look exactly like the other `.btn-primary` buttons: dark text (the existing `.btn-primary` color), `--text-button` 12px, uppercase, tracking, icon 1em. Fix the selector specificity (e.g. scope drawer link styles to `#main-menu a:not(.btn)`), do not duplicate button styles. Contrast must be >= 4.5:1.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs); report selectors changed.
