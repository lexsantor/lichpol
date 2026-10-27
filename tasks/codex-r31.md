# Codex task R31 (trivial, CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only `.ambience-tooltip` in css/d20.css.

After R30 the tooltip is right-anchored (good), but with `white-space: nowrap` the text "Música de ambiente · Desactivada" (~260px + padding) is wider than the space to the LEFT of the toggle at a 320px viewport (toggle right edge ~236px), so the text overflows the viewport on the left. `max-width` does not help because nowrap text overflows its box.

Fix: let it wrap when space is short: `white-space: normal; width: max-content; max-width: calc(100vw - 100px); text-wrap: balance;` (100px = toggle-to-viewport-right distance (~84px) + 16px gutter). At wide viewports it must stay on one line (max-content). Keep everything else.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs); report the diff.
