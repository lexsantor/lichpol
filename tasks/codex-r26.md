# Codex task R26 (trivial, CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. No browser tools. Edit only the CSS files that hold the hamburger breakpoint set in R24 (css/site.css and/or css/home.css).

Measured by Claude (Chromium, real fonts): with the full desktop header (brand + 4 nav links at 16px + "VER EN TWITCH" CTA), the CTA exceeds the container gutter below ~1011px and leaves the viewport below 968px (e.g. +23px at 941px; brand and nav touch). R24 set the hamburger to <=920px.

Fix: switch to the hamburger/mobile header at max-width 1023px (desktop header from 1024px up). Change every media query that belongs to the header/nav breakpoint consistently (menu toggle visibility, nav drawer, CTA visibility). Do not change other breakpoints or type sizes.

Acceptance: tests pass (node --test tests/d20.test.mjs tests/schedule.test.mjs); report each media query changed (before/after).
