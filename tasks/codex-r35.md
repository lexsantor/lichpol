# Codex task R35: music switch restyled as a bare toggle (Crayons-style)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Files: index.html (switch markup only), css/home.css (switch styles only), icon sprite in index.html if an icon is missing. js/ambience.js must keep working unchanged (selector `.ambience-switch`, `role="switch"`, `aria-checked`, `aria-busy`).

Owner reference: https://crayons.freshworks.com/components/core/toggle/ (the toggle with an icon inside the knob).

## Required look
- ONLY the toggle: a pill track + round knob. No visible "Música" label, no outline/bordered button box, no separate speaker icon outside the toggle. Same on desktop and mobile.
- Knob icon: OFF = speaker with an X (existing `#i-speaker-off`); ON = speaker with sound waves (existing `#i-speaker-on`). The icon sits inside the knob and swaps with the state; the knob slides left (off) / right (on).
- Size: track 44x24px, knob 20px with ~2px inset, icon 12px inside the knob. Hit area at least 44x44 (extend with padding or a pseudo-element; the visible toggle stays 44x24).
- Colours from existing tokens: OFF track = a neutral dark surface with a visible edge (non-text contrast >= 3:1 against the header background, WCAG 1.4.11); ON track = brass (`--brass-400`); knob = light bone; icon inside the knob = dark ink so it reads on the knob.
- Focus-visible ring using the existing focus token. Hover: subtle brightness change only. Loading (`aria-busy="true"`): reduced opacity / knob pulse (no animation under prefers-reduced-motion). Knob slide transition ~150ms, disabled under reduced motion.
- Keep `aria-label="Música de ambiente"`; remove any visible label element and its CSS.

## Acceptance
- node --test tests/d20.test.mjs tests/schedule.test.mjs tests/ambience.test.mjs passes.
- Report final markup of the switch and the selectors changed/removed.
