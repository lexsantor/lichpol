# Codex task R11: new campaign covers for Kuroto and Xoltacan (owner, 2026-10-24)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No installs, no CDN, no commits.
Allowed files: index.html, css/home.css. Protected: everything else (assets are already generated, do not touch them).

The owner supplied official cover art for both campaigns. Claude already wrote the files:
- assets/kuroto.webp (1672x941), kuroto-960.webp (960x540), kuroto-640.webp (640x360): REPLACED in place with the new Kuroto cover (ukiyo-e style: snowy volcano, cherry blossoms, pines). Same names and dimensions, so the existing srcset stays valid.
- assets/xoltacan.webp (1672x941), xoltacan-960.webp (960x540), xoltacan-640.webp (640x360): NEW, Xoltacan cover (stepped pyramids in a jungle with waterfalls, bright blue sky).

## 1. Kuroto feature (index.html)
- Change only the img alt to: `Portada de Aventuras en Kuroto: monte nevado y cerezos en flor en estilo de grabado japonés`.
- The new art is much brighter (cream sky, pink blossoms) than the old one. The copy sits over the image bottom. Keep the existing veil (.home-worlds__feature-media::after) unless text contrast fails; Claude will measure real-pixel contrast after your change. Check object-position so the volcano peak stays visible on desktop (currently 53% center); adjust only if the peak is cropped.

## 2. Xoltacan card becomes an image card
Currently `article.home-worlds__xoltacan` is a typographic card with an ornament and the note `<p class="home-worlds__note">Sin ilustración: este mundo aún no tiene retrato.</p>`.
- Remove the note paragraph and the ornament span, and their CSS if nothing else uses them (`.home-worlds__note`, `.home-worlds__ornament`; grep first).
- Give it the same structure and visual treatment as the Brunami card that sits right below it: a media block with the image (same `img` attributes pattern as Brunami: src assets/xoltacan.webp, srcset with 640w/960w/1672w, same `sizes` as Brunami, width="1672" height="941", loading="lazy", decoding="async", alt `Portada de Aventuras en Xoltacan: pirámides escalonadas entre la selva y cascadas`), then a copy block with meta (`D&D 5e`), h3, paragraph and the two existing links unchanged.
- Preferred implementation: reuse the Brunami classes by making both cards share one set of rules (e.g. a shared modifier or grouping selectors) rather than duplicating the CSS block. Keep the class `home-worlds__xoltacan` on the article. Same hover zoom as Brunami.
- The supporting column (`.home-worlds__supporting`) stacks Xoltacan over Brunami on desktop (grid rows minmax(300px,auto) / minmax(340px,auto)); with two image cards both rows should get equal treatment. At 541-900px they sit side by side (2 columns) and must have matching heights; at <=540px they stack. The desktop total height of the supporting column must not exceed the Kuroto feature height by much (feature min-height 640px); if two 16:8 image cards plus copy overflow, reduce the media aspect ratio for both (e.g. 16/7) rather than truncating copy.
- Media aspect and object-position: keep the main pyramid (right half of the image) visible; try object-position around 65% center for Xoltacan.

## 3. Campaigns intro sentence
Leave `Las ilustraciones son conceptuales; los mundos de verdad se descubren jugando.` unchanged (owner decision pending).

## Acceptance (report evidence)
- One h1, ids unique, every img has width/height/alt, `grep -c "home-worlds__note" index.html css/home.css` = 0.
- `node --test tests/d20.test.mjs` exit 0.
- Report every changed selector/value. Claude verifies rendering at 320-1440, overflow and contrast in a real browser.
