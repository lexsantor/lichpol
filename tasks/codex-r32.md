# Codex task R32: header restructure ("La Taberna" dropdown, Aventuras ↗, music on/off switch)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser/computer-use tools (Claude verifies renders).
Files: index.html (header + remove the floating ambience button), css/site.css / css/home.css / css/d20.css (header, switch, remove floating-toggle CSS), js/ambience.js (retarget to the switch), js/site.js or js/home.js (dropdown behaviour), tests if logic changes. Type: only the existing tokens (Body 16 for nav/switch label, Button 12 for .btn, Small 12 for micro-labels). Icons: 1em rule.

## Owner decisions (2026-10-27)
Desktop (>=1024px):
`LICHPOL   La Taberna ▾   Aventuras ↗          ♪ Música [switch]   [VER EN TWITCH ↗]`
- "La Taberna ▾" groups the 4 home sections: El Dungeon Master, Campañas, Crónicas, Comunidad (same hrefs as today).
- "Aventuras" = external link to https://khr0mz.github.io/arghast/ ("Arghast · Archivo de campañas", HTTP 200 verified), target="_blank" rel="noopener noreferrer", external icon + visually-hidden "(se abre en una pestaña nueva)", same pattern as other external links.
- Music becomes an on/off switch in the header (right side, before the Twitch CTA). Remove the floating `.ambience-toggle` next to the d20 and all its CSS/tooltip.
- Structure must leave room for a future top-level "Personajes" page link between "La Taberna" and "Aventuras" (do NOT add it now).

Mobile/tablet (<=1023px): `LICHPOL            ♪[switch]  ☰`
- Switch stays visible in the bar (compact: icon + switch, label visually hidden).
- The drawer lists: a "La Taberna" group label (Small, uppercase) with the 4 links flat (no nested dropdown), then "Aventuras ↗", then the "Ver en Twitch" CTA.

## Dropdown ("La Taberna")
Use native `<details class="nav-group"><summary>La Taberna</summary><ul>…</ul></details>` (works without JS, keyboard accessible). Add small JS: close on Escape (return focus to summary), on outside click, and after choosing a link. Chevron icon rotates when open (respect reduced motion). Panel styled with the existing surface/border tokens, positioned under the summary, above page content (z-index below the d20 panel). Not a `role="menu"`.

## Music switch
- `<button type="button" role="switch" aria-checked="false" class="ambience-switch">` with a visible "Música" label on desktop (aria-label "Música de ambiente" always), a speaker/♪ icon and a visual track/knob. State must not rely on color alone (knob position + icon).
- Reuse js/ambience.js entirely: retarget it from `.ambience-toggle` to `.ambience-switch`, use `aria-checked` instead of `aria-pressed`. Keep: lazy fetch on first press, AudioContext created/resumed inside the click, crossfaded loop, fades, pause on hidden tab, `aria-busy` while loading, error -> back to off + announce "No se pudo cargar la música" in the existing `#ambience-live` region (keep that region). Hidden without JS / without Web Audio.
- Min touch target 44x44 on mobile.

## Constraints
- Keep the hamburger breakpoint at <=1023px unless the new desktop header fits lower; do not shrink type.
- Keep the existing mobile drawer behaviour (menu-toggle aria-expanded, Escape).
- Update tests/ambience.test.mjs only if core logic changes.

## Acceptance (report)
- node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs passes.
- 0 occurrences of `ambience-toggle` in index.html/css/js.
- Header markup summary (desktop + drawer).
