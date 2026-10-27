# Codex task R34 (one-line CSS regression from R33)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only css/home.css.

`.nav-drawer-cta { display: none; }` (home.css ~1480) hides the drawer CTA everywhere; R33 simplified the mobile rule `.home-header .nav-drawer-cta` (~1689) to width/spacing and dropped the display value, so "Ver en Twitch" no longer appears in the mobile drawer (verified in Chromium at 375px).

Fix: in the <=1023px rule `.home-header .nav-drawer-cta`, add `display: flex;` (buttons are flex in `.btn`). Nothing else.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs); paste the final rule.
