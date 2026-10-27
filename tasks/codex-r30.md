# Codex task R30 (trivial, CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only the `.ambience-tooltip` rules (css/d20.css).

Defect (measured by Claude in Chromium): the tooltip "Música de ambiente · Desactivada" grows to the RIGHT of the 48px toggle and is clipped by the viewport at every width (text right edge = viewport + 13..21px; e.g. 396px at a 375px viewport). Visible on hover/focus.

Fix: anchor the tooltip to the toggle's right edge and let it grow LEFTWARD (`right: 0; left: auto;` or equivalent, consistent with how `.d20-tooltip` is positioned), keep it above the button, `white-space: nowrap`, and cap it with `max-width: calc(100vw - 32px)` so it can never leave the viewport. No other visual changes.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs); report the diff.
