# Codex task T2-fix + T3 (Lichpol home)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Static HTML/CSS/JS, no build, no new dependencies, no CDN, no git commits.
Read first: tasks/home-v1-spec.md (sections "Cursed D20" and "Visual direction"), js/d20-core.js (already done and tested, do NOT modify), the current index.html, css/home.css, js/home.js, and css/site.css / css/tokens.css (read-only).

Protected (do not modify): css/tokens.css, css/site.css, js/site.js, js/d20-core.js, tests/*, assets/*, every other *.html, design.md, content-lichpol.md, docs/*.
Allowed: index.html, css/home.css, js/home.js, NEW css/d20.css, NEW js/d20.js.

## Part A: fixes from Claude's rendered QA of T2 (Chromium, real screenshots)

A1 (P0) Hero H1 is clipped. js/site.js joins the last two words of every h1-h3 with a no-break space, so "permiten regresar." is one unbreakable unit. At 320/360/375/390/414 px the H1 scrollWidth exceeds its box by ~56 px and the hero's overflow hides "R." ("PERMITEN REGRESA"). At 1920 px it is 857 > 800. Fix the H1 font-size clamp and max-width in css/home.css so the unit always fits. Acceptance: `h1.scrollWidth <= h1.clientWidth` at 320, 360, 375, 390, 414, 600, 768, 1024, 1280, 1440, 1920; no single-word last line; keep it visually dominant (on 375 it should still be roughly 2.4rem or more, three lines is fine).

A2 (P2) Every archive ledger row (li in the Crónicas archive list) overflows its own box by 10 px at all widths (scrollWidth = clientWidth + 10). Find the cause (likely the arrow nudge transform, a negative margin, or a min-width) and fix it without changing the look.

A3 (P1, art direction) The hero image is underexposed: on desktop/tablet the firelit hall on the right half is barely readable, the scene loses its cinematic depth. Lighten the overlay over the right ~55% (and the image itself only if needed, e.g. a mild brightness/contrast on the <img>, never on logos) while keeping hero copy contrast >= 4.5:1 for body text and >= 3:1 for the H1 against the real pixels behind them. On mobile (<= 540 px) the image is almost invisible: let the lit hall/chandelier read in the top ~40% of the hero, concentrating the dark gradient behind the copy block at the bottom.

A4 (P2) Community band ("Únete a la partida"): the reused tavern image is practically invisible on mobile and very dark on desktop. Let the candle/table detail read on the side (desktop) or top (mobile) away from the copy, same contrast guarantees for the copy.

## Part B: T3, the Cursed D20 widget

Mount point: replace the comment `<!-- D20: Cursed D20 widget mounts here (T3) -->` in index.html. Load `css/d20.css` in <head> after home.css and `<script type="module" src="js/d20.js"></script>` before </body>.

Markup (in index.html, outside <main>, after the footer):
- A real `<button type="button" class="d20-trigger" hidden>` (the `hidden` attribute is removed by js/d20.js, so without JS no dead control is shown). Accessible name "Tirar el d20" (visible text may be visually hidden). Contains an inline SVG d20 (aria-hidden="true", focusable="false"): a recognisable icosahedron front view (hexagonal silhouette with the triangular facets of a d20: one central upward triangle face plus surrounding facets), dark material (gradient from --ink-800 to --ink-950) with thin brass edges (--brass-500, highlight --brass-300) and the current number in the central face in Cinzel 600. Initial number 20. Not an emoji, not a hexagon with a number only.
- A tooltip/hint element shown on :hover and :focus-visible of the trigger, text "Tira el dado. ¿Qué podría salir mal?" (aria-hidden="true" because the button has aria-describedby pointing at a visually hidden copy of the same text, or use aria-describedby directly on the hint; pick one, no duplicate announcements).
- A result panel using the native Popover API: `<div id="d20-result" class="d20-panel" popover="auto" aria-labelledby="d20-result-label">`. Contents: number (large, Cinzel), category label (id d20-result-label, sans 13px 600 uppercase tracked like .eyebrow), phrase (Cormorant Garamond 500 italic ~20px, bone-100), actions: "Volver a tirar" (.btn .btn-secondary .btn-sm) and a close icon button (44x44, aria-label "Cerrar resultado", uses popovertarget="d20-result" popovertargetaction="hide").
- A persistent live region outside the popover: `<p class="visually-hidden" role="status" aria-live="polite" id="d20-live"></p>`.

Positioning and sizing (css/d20.css, tokens only):
- Trigger: position fixed; right: calc(16px + env(safe-area-inset-right)); bottom: calc(16px + env(safe-area-inset-bottom)); 64x64 desktop, 56x56 at <= 540 px (both >= 44). z-index 60 (above header 40 and the body::before noise layer at 50). Themed focus-visible ring (2px --focus, offset 4px). Hover: lifts 2px and edges brighten. Must never cause layout shift.
- Panel: top layer via popover; position fixed; right and bottom aligned with the trigger, sitting above it (bottom = trigger bottom + trigger size + 12px). Width min(340px, calc(100vw - 32px - safe-area insets)). On <= 540 px: left and right 16px (+ safe areas), still above the trigger, max-height calc(100dvh - 120px) with overflow auto and the themed thin scrollbar (thumb brass, track dark) like site.css .arcane-select__list. Surface --material-leather, 1px --line-strong border, radius --radius-sm, shadow like dialog in site.css. Override UA popover defaults (inset, margin, padding, border, color, background).

Behaviour (js/d20.js, ES module, import { createRoll } from './d20-core.js'):
- Keep only UI state here: `isRolling` flag and `lastIndexByCategory` object. All randomness/classification/phrase choice comes from createRoll.
- Click/Enter/Space on the trigger (native button) or "Volver a tirar": if isRolling, ignore (do not queue). Else: isRolling = true, set aria-busy="true" on the trigger (never set disabled: that drops focus), compute the roll up front with createRoll, hide the panel if open, run the animation, then on finish: update the die face number, fill the panel, show it with showPopover(), write the live text `Has sacado un ${n}. ${label}. ${text}` into #d20-live, aria-busy="false", isRolling = false.
- Animation (CSS keyframes on the SVG wrapper, transform/opacity only, ≈ 950 ms total, max 1.2 s): anticipation (scale .9, rotate -10deg, ~120 ms) → spin (about 2 full turns with a small hop, ease-out) → deceleration with a slight overshoot and settle → reveal (number fades/scales in). During the spin the face number may flicker through random values purely visually (setInterval ~70 ms, always cleared). End the roll on `animationend` with a safety timeout fallback (1500 ms) so the lock can never get stuck.
- prefers-reduced-motion: reduce (check matchMedia at roll time): no keyframes, no flicker; reveal the result immediately (still through the same code path).
- Natural 1: panel gets `.d20-panel--fumble`: number and a thin top rule in --rust-400, the die gets a single short shake (skipped under reduced motion). Natural 20: `.d20-panel--critical`: number in --brass-300 with one brief arcane flash (a single 600 ms pulse of a soft --arcane-400 box-shadow on the panel border, not repeated). Other results: neutral. No confetti, no particles.
- Focus: when the panel opens, move focus to the "Volver a tirar" button. When the panel closes (Escape, close button, light dismiss) and focus was inside it or on body, return focus to the trigger (listen to the popover `toggle` event with newState === 'closed'). Escape must close it (native for popover="auto"; verify).
- Fallback if `!HTMLElement.prototype.hasOwnProperty('popover')`: toggle the `hidden` attribute instead, and handle Escape + close button manually. Keep it short.
- No storage, no network, no timers left running, listeners attached once.

Do not change the footer padding added in T2 (it reserves space for the trigger); verify the trigger does not cover footer links at 375 and 1440 when scrolled to the bottom.

## Acceptance (report evidence for each)
1. `node --test tests/d20.test.mjs` still exits 0 (you must not change the core).
2. Serve with `python -m http.server 8765` and curl 200 for css/d20.css and js/d20.js.
3. Static checks: one h1; ids unique; every aria-labelledby/aria-describedby/popovertarget references an existing id; `node --check js/d20.js` (or an ESM syntax check) passes.
4. Describe how A1-A4 were fixed (selectors and values).
5. List anything you could not verify. Claude will verify in a real browser (screenshots at 320-1920, keyboard, reduced motion, 1 and 20 states).

Stop and report (do not decide silently) if any requirement conflicts with design.md or needs a protected file.
