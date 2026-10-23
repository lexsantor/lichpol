# Codex task R12 (trivial, css/home.css only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Edit ONLY css/home.css. No other file, no commits.

Measured in Chromium after R11 (new, much brighter Kuroto cover):
- Kuroto feature meta line (`.home-worlds__feature .home-worlds__meta`, 13px) at 768px: worst-pixel contrast 2.57:1 (avg 5.40); at 1440px worst 3.66. Pink blossoms and cream sky show through the veil at the height of the meta line (around 40-60% from the bottom of the card).
- At <=540px the Kuroto image is a cropped strip above the copy; with `object-position: 53% center` the volcano peak (about 28% from the left of the image) is cut at the left edge.

Changes:
1. In the base `.home-worlds__feature-media::after` vertical gradient (line ~464), raise the middle stops so the band behind the meta/title is darker: 27% stop .91 -> .94 and 57% stop .53 -> .72, add a stop `rgba(13, 13, 14, .30) 80%` before the 100% stop (keep 100% at .08). Leave the 90deg gradient and the <=540px override untouched.
2. Inside the existing `@media (max-width: 540px)` block, set `.home-worlds__feature-media img { object-position: 30% center; }` (put it next to the existing mobile .home-worlds__feature-media rules).

Report the exact before/after declarations.
