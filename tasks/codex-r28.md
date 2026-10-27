# Codex task R28 (trivial)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools.

Owner decision: button labels are still too prominent at 14px. Set `--text-button` in css/tokens.css to 12px (keep the token and its usages on `.btn`/`.btn-sm`; do not touch anything else, button heights/touch targets unchanged). In design.md 07.3 change the button row from 14px to 12px.

Acceptance: grep shows `--text-button:12px` (or with spaces); tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs).
