# Codex task R38 (regression from R32, CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only css/home.css.

Accepted decision D7: navigation uses Cinzel (`--font-title`). R32 added a later rule (home.css ~1411):
`.home-header .site-nav a:not(.btn), .home-header .nav-group summary { font-family: var(--font-ui); font-weight: 500; letter-spacing: 0; ... }`
which overrides the original (~72): `font-family: var(--font-title); font-weight: 600; letter-spacing: .04em; text-transform: none;`.

Fix: in that ~1411 rule use the original typography: `font-family: var(--font-title); font-weight: 600; letter-spacing: .04em;` (size stays `--text-body`). This must apply to: the "La Taberna" summary, the 4 dropdown links, "Aventuras" (desktop), and the drawer links on mobile. Do NOT change: the Twitch CTA (`.btn`), the drawer group label "La Taberna" (Small micro-label, keep DM Sans), the music switch. Remove any now-duplicate declarations rather than adding new rules.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs); paste the final rule.
