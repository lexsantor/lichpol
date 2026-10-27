# Codex task R25 (trivial, CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only css/site.css and/or css/home.css.

Regression from R24: the global `.btn { white-space: nowrap; }` makes "Entrar en la comunidad" (16px uppercase, tracked) 322px wide at a 320px viewport; it stretches `.home-community__copy` and the whole community section overflows (text clipped at right=341).

Fix: keep `white-space: nowrap` only for `.header-cta` (the case R24 targeted). All other `.btn` labels may wrap again (`white-space: normal`, centered text). Make sure grid/flex children in `.home-community` have `min-width: 0` so content can never widen the column.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs); report the diff.
