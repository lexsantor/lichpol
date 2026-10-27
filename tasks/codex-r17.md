# Codex task R17: official campaign synopses, 3 new covers, weekly stream calendar

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Static HTML/CSS/JS, no package.json, no new dependencies. No commits.
Files you may touch: index.html, css/home.css, js/home.js, new assets/campana-{1,2,4}*.webp, new tests/schedule.test.mjs (+ a tiny core module if needed, mirroring js/d20-core.js + tests/d20.test.mjs). Do NOT touch css/tokens.css, design.md, legacy pages, .vercelignore.
Read first: index.html (sections #campanas and #cronicas), css/home.css (.home-worlds*, .home-live), js/home.js, js/d20-core.js, tests/d20.test.mjs.

## Part A. Three new covers (use your image_generation tool)

Generate 3 illustrations, 16:9, no text/logos/borders/UI, using the MASTER PROMPT below with SCENE filled in. All three must look like the same art collection as assets/kuroto.webp, assets/xoltacan.webp, assets/brunami.webp (open them with view_image first).

SCENES:
- campana-1: "No despiertes lo que no ha de ser despertado". Deep inside a dangerous cave, a powerful and fearsome lich has just awakened on an ancient stone dais, cold necrotic light radiating from it; five small adventurer silhouettes with torches in the foreground realise their mistake. Lich is the single focal point.
- campana-2: "En la Bruma". Soldiers of a human army fleeing a battlefield against drow troops are swallowed by a dense, mysterious mist; through it, glimpses of a strange realm beyond known space and time. Focal point: the wall of mist where the battlefield dissolves.
- campana-4: "Tierra de Dragones". The continent of Urdar a century after a cataclysmic war between chromatic and metallic dragons: scorched northern wastes, burned plains, mountains reduced to rubble, a colossal ancient dragon skeleton half buried; far on the horizon, the southern kingdoms still standing under a broken sky. Focal point: the dragon skeleton.

MASTER PROMPT (owner-mandated, apply verbatim around each SCENE):
Premium, high-definition fantasy environment illustration, Stylized Cinematic Fantasy Illustration. High-end hand-painted fantasy environment concept art, ~60% cinematic fantasy concept art / 40% traditional stylized illustration, semi-realistic environments with stylized shapes and silhouettes, rich organic painted textures with subtle visible brushwork, premium tabletop RPG adventure book storytelling. Cinematic lighting with one strong believable light source, soft volumetric light, atmospheric haze, warm/cool relationships, atmospheric perspective. Cinematic composition, one dominant focal point, clear foreground/midground/background, natural framing, intentional negative space. Harmonized controlled-saturation palette, painterly materials, believable aging. Detail concentrated at the focal point, simplified distance, crisp silhouettes, no oversharpening. Edge-to-edge, aspect 16:9, no text, typography, logos, watermarks, UI or borders. Avoid: photorealism, generic AI fantasy look, excessive bloom, HDR, oversaturation, glossy CGI, plastic textures, excessive microdetail, flat backgrounds, heavy black outlines, cartoon proportions, anime styling, clutter.

Output per cover (same pipeline as existing covers): assets/campana-N.webp at 1672x941 (center crop to exactly that), assets/campana-N-960.webp (960w), assets/campana-N-640.webp (640w), WebP quality ~68. Keep the source PNGs OUT of assets/ (put them in tasks/art-src/ or delete them).

## Part B. Campaigns section (#campanas) restructure

Owner decision: two groups, using the channel's own naming.
1. h3 "Aventuras": Aventuras en Kuroto (keep as the feature card, existing image/links) + Aventuras en Xoltacan (card, existing image/links).
2. h3 "Campañas": four cards in order 1, 2, 3, 4, reusing `.home-worlds__card`. Campaña 3 is the existing Brunami card (keep its image/links), moved here.
Keep the section heading, intro paragraph and the "Otras mesas" index unchanged.

Meta line per card: Kuroto keeps "D&amp;D 5e · Mundo original"; Xoltacan keeps "D&amp;D 5e"; campaigns use "D&amp;D · Campaña 1" / "Campaña 2" / "Campaña 3" / "Campaña 4". No status labels (en curso/finalizada), no episode counts.

Synopses: OFFICIAL copy from the owner. Replace the current one-liners with these texts VERBATIM (only change: "Xoltacán" -> "Xoltacan" to match the site). Multi-paragraph texts become separate <p>. Do not trim or paraphrase. If a long synopsis breaks the card at 375 or 1440, wrap the extra paragraphs in a native <details><summary>Leer más</summary> rather than editing text; escalate if that is not enough.

- Campaña 1, h3 "No despiertes lo que no ha de ser despertado":
  En lo profundo de una peligrosa cueva, un grupo de cinco valientes aventureros cometió un error fatal: despertaron a un poderoso y temible Lich, una entidad cuyo poder oscuro y despiadado amenazó con sumir la isla de Anker en el caos. Los eventos de esta campaña estuvieron marcados por un frágil equilibrio entre la esperanza y la desesperación, mientras los héroes luchaban por corregir el daño causado. Esta historia quedó inscrita en los anales de Arghast como un recordatorio de los peligros de desatar fuerzas que no deberían ser perturbadas.
- Campaña 2, h3 "En la Bruma":
  El rugido de la batalla entre los soldados del ejército de Brunami y las tropas drow fue acallado por un giro inesperado. En su huida desesperada del campo de batalla, un grupo de soldados quedó atrapado en una espesa y misteriosa bruma que los transportó a un lugar más allá del espacio y el tiempo conocido. En este extraño reino, debieron enfrentar desafíos incomprensibles mientras buscaban respuestas sobre su destino y el camino de regreso a su hogar.
- Campaña 3, h3 "La Guerra de Brunami":
  En medio de una guerra devastadora, un grupo de soldados de las tropas del Este de Brunami cayó prisionero de las fuerzas drow. Encarcelados en las sombrías profundidades de la infraoscuridad, enfrentan un reto monumental: escapar de su cautiverio y regresar a su ejército para informar a los Generales sobre los movimientos del enemigo.
- Campaña 4, h3 "Tierra de Dragones":
  Hace un siglo, una guerra cataclísmica entre los Dragones Cromáticos, al mando de los siervos de Tiamat, y los Dragones Metálicos, guiados por la voluntad de Bahamut, redujo el continente de Urdar a un despojo de lo que alguna vez fue. Las tierras del norte quedaron convertidas en páramos ardientes, llanuras calcinadas y montañas hechas escombros, mientras que los reinos del sur aún resisten, aunque desgarrados y divididos por viejas heridas.
- Aventuras en Kuroto:
  La misteriosa isla de Kuroto, famosa por sus leyendas sobre criaturas místicas y mágicas conocidas como yokai, ha atraído a un numeroso grupo de aventureros en busca de gloria, riquezas y respuestas a los misterios de este lugar. Cada rincón de la isla guarda secretos por descubrir, desde aldeas ocultas bajo la protección de espíritus guardianes hasta bosques oscuros donde el peligro acecha en cada sombra. Esta serie de aventuras promete historias llenas de maravillas, riesgos y descubrimientos.
- Aventuras en Xoltacan (4 paragraphs):
  P1: La isla de Xoltacan se alza como un coloso verde en medio del océano: una selva tropical indómita, donde cada sombra oculta un secreto y cada rumor del viento habla de civilizaciones olvidadas. Entre sus árboles gigantescos y ruinas devoradas por la maleza, laten los ecos de un pasado que nunca debió despertar.
  P2: Porque Xoltacan no solo guarda misterios… también encierra peligros tan antiguos que preceden a la propia memoria de Arghast.
  P3: Aventureros llamados por sus tesoros y secretos vienen a esta isla para hacerse un nombre pero...
  P4: ¿Sobrevivirán lo suficiente para contarlo… o se convertirán en otra historia perdida entre sus sombras?

Links (verified 2026-10-27, HTTP 200; same markup as existing cards, external icon + visually-hidden "(se abre en una pestaña nueva)"):
- Campaña 1: only "Ver la campaña" -> https://www.youtube.com/playlist?list=PLelQK3I2Q5zxsWP218vCO_KNFB1fkG-xV (its chapter 1 is not in the playlist; NO chapter link).
- Campaña 2: "Ver la campaña" -> https://www.youtube.com/playlist?list=PLelQK3I2Q5zwGWoCqGK_mGnFpEHovcRAB ; "Capítulo 1" -> https://www.youtube.com/watch?v=PHRE2squ71Y&amp;list=PLelQK3I2Q5zwGWoCqGK_mGnFpEHovcRAB
- Campaña 4: "Ver la campaña" -> https://www.youtube.com/playlist?list=PLelQK3I2Q5zyVAjMT30fE26_1TvPQ_8vR ; "Capítulo 1" -> https://www.youtube.com/watch?v=mOJ7bDIALRw&amp;list=PLelQK3I2Q5zyVAjMT30fE26_1TvPQ_8vR
- Kuroto, Xoltacan, Brunami: keep existing links.

New images: same <img> pattern as existing cards (src, srcset 640/960/1672, sizes, width=1672 height=941, loading=lazy, decoding=async). Alt text describes what is actually in the generated picture (look at it), prefixed "Ilustración: ", no plot claims.

Layout: decide grid in css/home.css reusing existing card styles and tokens. Aventuras = feature + 1 card; Campañas = 2x2 on desktop, 1 column on mobile (2 cols at tablet if it fits). Clear visual separation between the two groups via the h3s. Must hold at 320, 375, 768, 1024, 1440 with no horizontal overflow.

## Part C. Weekly calendar inside the existing "Directos" article (#cronicas .home-live)

Source of truth: https://www.twitch.tv/lichpol_gamer/schedule (checked 2026-10-27, identical for 3 consecutive weeks):
- lunes: "Campañas de D&D", 20:30-23:00
- martes: "Campañas de D&D", 20:30-23:00
- miércoles: "Aventuras de D&D", 20:30-23:00
- jueves: "Aventuras de D&D", 20:30-23:00
- viernes-domingo: no stream
Times are Europe/Madrid wall clock all year. NEVER hardcode "CET", "GMT+1" or a UTC offset.

Requirements:
1. Static semantic markup that is complete without JS: a compact week calendar (7 days, Mon-Sun, the 4 stream days visually marked with title + "20:30-23:00", rest days quiet). Use a list or table with proper semantics; label "Hora de Madrid". Add a link "Ver el calendario en Twitch" (same external-link markup). Do not map days to specific campaigns (Twitch does not).
2. Keep the 4 slots in ONE data definition (HTML or one JS constant) so a schedule change is a one-line edit.
3. JS progressive enhancement in js/home.js (pure logic in a small core function, tested):
   - Highlight today's day (Madrid date).
   - Line "Próxima sesión programada: <día> a las 20:30" computed in Europe/Madrid via Intl.DateTimeFormat timeZone; during 20:30-23:00 on a stream day show "Sesión programada ahora (20:30-23:00)". Wording must say "programada" (we cannot know if the stream is actually live).
   - If the viewer's timezone renders that slot at a different wall-clock time, append "(en tu hora: HH:MM)" using the viewer's locale timezone.
   - Edge cases: Thursday after 23:00 and Fri-Sun roll to Monday; Monday-Wednesday after 23:00 roll to next day; exactly 23:00 is not "ahora".
4. tests/schedule.test.mjs with node:test covering: Mon 10:00 -> Mon; Mon 21:00 -> ahora; Thu 23:00 -> next Mon; Sat -> Mon; a summer date (CEST) and a winter date (CET) both give 20:30 Madrid. Run: node --test tests/
5. Accessibility: today/next marker not conveyed by color alone; respects prefers-reduced-motion; contrast >= 4.5:1 using existing tokens.

## Acceptance (report each with evidence)
- node --test tests/ passes (d20 + schedule).
- grep: 6 synopses present verbatim (Xoltacan spelling), 0 occurrences of "Xoltacán", "CET", "GMT+1" in index.html/js.
- 9 new image files exist with exact sizes (1672x941, 960w, 640w); list byte sizes.
- No new console errors when opening index.html over a local HTTP server.
- Short diff summary per file.

Stop and escalate (do not improvise) if: the layout needs changes outside .home-worlds/.home-live, a synopsis cannot fit without editing text, or image generation is unavailable.
