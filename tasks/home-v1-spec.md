# LICHPOL HOME V1 · Content spec (verified 2026-10-22)

All copy is final Spanish (es-ES). Use it verbatim unless a line breaks layout; if so, report instead of rewriting meaning.
Never add facts, counts, schedules, dates, availability or status pills.

## Verified destinations (use exactly)

| Key | URL |
|---|---|
| TWITCH | https://www.twitch.tv/lichpol_gamer |
| YT_CHANNEL | https://www.youtube.com/@Lichpol |
| YT_PLAYLISTS | https://www.youtube.com/@Lichpol/playlists |
| PL_XOLTACAN | https://www.youtube.com/playlist?list=PLelQK3I2Q5zyXz8TBAs7MJ3shiS9jazby |
| PL_KUROTO | https://www.youtube.com/playlist?list=PLelQK3I2Q5zymJZ2e2SNmwxsnnFGjBCYb |
| PL_BRUNAMI | https://www.youtube.com/playlist?list=PLelQK3I2Q5zynIBwDBsv1I-T6EsYqAYxv |
| PL_STARWARS | https://www.youtube.com/playlist?list=PLelQK3I2Q5zxMBvbY2_-e7qDzcagql0tE |
| PL_ONESHOT | https://www.youtube.com/playlist?list=PLelQK3I2Q5zyEDQczR5YNpWX2t7kIftlM |
| EP_XOLTACAN_1 | https://www.youtube.com/watch?v=ZXhsunFOVdQ&list=PLelQK3I2Q5zyXz8TBAs7MJ3shiS9jazby |
| EP_KUROTO_1 | https://www.youtube.com/watch?v=KkZZR81onIw&list=PLelQK3I2Q5zymJZ2e2SNmwxsnnFGjBCYb |
| EP_BRUNAMI_1 | https://www.youtube.com/watch?v=6M9EkEvi1pw&list=PLelQK3I2Q5zynIBwDBsv1I-T6EsYqAYxv |
| EP_STARWARS_1 | https://www.youtube.com/watch?v=B26h-9dGnWU&list=PLelQK3I2Q5zxMBvbY2_-e7qDzcagql0tE |
| EP_KUROTO_55 | https://www.youtube.com/watch?v=f7E7uxoKseE |
| EP_C3_70 | https://www.youtube.com/watch?v=BzuYZqJdEFw |
| EP_TS_35 | https://www.youtube.com/watch?v=MEuZzIbuTNQ |
| DISCORD | https://discord.gg/qjqXeQGmXU |
| INSTAGRAM | https://www.instagram.com/lichpol_gamer/ |
| X | https://x.com/LichpolGamer |

All external links: `target="_blank" rel="noopener noreferrer"` plus a visually hidden "(se abre en una pestaña nueva)" or equivalent accessible hint; decorative arrow `↗` with `aria-hidden="true"`.

Official episode titles (quote exactly, from YouTube oEmbed):
- Xoltacan 1: «D&D Aventuras en Xoltacan - Capítulo 01 - Eso es un barco estampado en una taberna»
- Kuroto 1: «D&D Aventuras en Kuroto - Capítulo 1: El Bosque de Cuchillas»
- Brunami 1: «D&D Campaña 3 - En la Oscuridad - Capítulo 01»
- Star Wars 1: «Star Wars Aventuras Rebeldes - Capítulo 01: Sombras sobre Ord Mantle»
- «D&D Aventuras en Kuroto - Capítulo 55: El Mar de Kiushi»
- «D&D Campaña III - El Bosque Feérico - Capítulo 70»
- «D&D Campaña 3 - Tierras Salvajes - Capítulo 35»

## Head

- title: `Lichpol · Campañas de rol en directo | The Arcane Tavern`
- description: `Lichpol dirige campañas de Dungeons & Dragons en directo en Twitch y las archiva en YouTube: Xoltacan, Kuroto, La Guerra de Brunami y más. Entra en la taberna.`
- og:title / og:description / og:type=website / og:locale=es_ES / twitter:card=summary_large_image. NO og:image and NO canonical for now (added after deploy URL exists).
- favicon: assets/lichpol-logo-color.svg. theme-color #0D0D0E.

## Header

Brand lockup (existing `.brand` pattern, white logo, alt="") linking to `#inicio`.
Nav (anchors; the logo is the "Inicio" link): Campañas `#campanas` · El Dungeon Master `#dungeon-master` · Crónicas `#cronicas` · Comunidad `#comunidad`.
CTA: `Twitch` button → TWITCH, label "Ver en Twitch ↗".

## Hero `#inicio`

- Eyebrow: `LICHPOL · THE ARCANE TAVERN`
- H1 (only H1 on page): `No todas las historias permiten regresar.`
- Lead: `Campañas de Dungeons & Dragons en directo, mundos propios como Kuroto y Xoltacan, y decisiones que quizá lamentes. Aquí los dados deciden y el Dungeon Master disfruta de las consecuencias.`
- Primary CTA: `Explorar las campañas` → `#campanas`
- Secondary CTA: `Ver partidas en Twitch ↗` → TWITCH
- Channel strip (small, factual): `Directos en Twitch` · `Archivo en YouTube` · `Comunidad en Discord` (each a link to its destination).
- Art credit (tiny, subtle, bottom of hero): `Ilustración conceptual. No es una localización canónica.`

## El Dungeon Master `#dungeon-master`

- Eyebrow: `EL DUNGEON MASTER`
- H2: `Detrás de la pantalla, alguien toma notas.`
- P1: `Lichpol dirige partidas de rol y las comparte en directo. Su mesa gira alrededor de campañas largas de Dungeons & Dragons 5e, con incursiones en Star Wars FFG y one-shots ocasionales.`
- P2: `Las sesiones se emiten en Twitch y se archivan en YouTube, ordenadas por campaña. Kuroto, su mundo de inspiración japonesa, es creación propia.`
- Fact list (definition list, sans UI):
  - `Sistemas` → `D&D 5e · Star Wars FFG · One-shots`
  - `En directo` → `Twitch · lichpol_gamer` (link)
  - `Archivo` → `YouTube · @Lichpol` (link)
  - `Comunidad` → `Discord` (link to `#comunidad`)
- Visual: wizard.webp still life + official color logo (assets/lichpol-logo-color.svg, alt="Logotipo de Lichpol: mago con gafas y un d20 en llamas sobre un escudo"). Caption: `Bodegón conceptual: sombrero, gafas y d20. No es un retrato.`

## Campañas `#campanas` ("biblioteca de mundos")

- Eyebrow: `CAMPAÑAS`
- H2: `Cada mundo guarda sus propias formas de morir.`
- Intro: `Campañas largas, archivadas capítulo a capítulo en YouTube. Las ilustraciones son conceptuales; los mundos de verdad se descubren jugando.`

Protagonist (large, kuroto.webp, alt="Ilustración conceptual: fortaleza de inspiración japonesa entre cascadas y niebla"):
- Meta: `D&D 5e · Mundo original`
- H3: `Aventuras en Kuroto`
- P: `Un mundo de inspiración japonesa creado por Lichpol, donde los yokai no se quedan en las leyendas. Empieza en «El Bosque de Cuchillas» y descubre hasta dónde llega el camino.`
- Primary link: `Ver la campaña ↗` → PL_KUROTO
- Secondary link: `Empezar por el capítulo 1 ↗` → EP_KUROTO_1

Secondary A (Xoltacan, NO image; material/typographic treatment; obsidian or iron surface, large Cinzel title, subtle ornament):
- Meta: `D&D 5e`
- H3: `Aventuras en Xoltacan`
- P: `Todo empieza con un barco estampado en una taberna. A partir de ahí, la cosa se complica.`
- Links: `Ver la campaña ↗` → PL_XOLTACAN · `Capítulo 1 ↗` → EP_XOLTACAN_1
- Tiny note: `Sin ilustración: este mundo aún no tiene retrato.` (optional, only if it reads as intentional)

Secondary B (brunami.webp, alt="Ilustración conceptual: ciudadela gótica junto al mar bajo la tormenta"):
- Meta: `D&D 5e · Campaña III`
- H3: `La Guerra de Brunami`
- P: `La tercera gran campaña de D&D del canal. Arranca «En la Oscuridad», y el título no es una metáfora.`
- Links: `Ver la campaña ↗` → PL_BRUNAMI · `Capítulo 1 ↗` → EP_BRUNAMI_1

"Otras mesas" (compact typographic row, not cards):
- `Star Wars FFG · Aventuras Rebeldes` → PL_STARWARS
- `One-shots` → PL_ONESHOT
- `Todas las campañas del archivo` → YT_PLAYLISTS

## Crónicas `#cronicas`

- Eyebrow: `CRÓNICAS`
- H2: `Lo que pasa en la mesa queda grabado.`
- Intro: `Las partidas se juegan en directo en Twitch y se archivan en YouTube, ordenadas por campaña.`
- Block "Directos" (Twitch): `El canal lichpol_gamer emite las sesiones en directo. Si llegas tarde, el chat te pondrá al día. Más o menos.` CTA `Ir a Twitch ↗`.
- Block "El archivo" (ledger list, typographic, numbered with roman numerals or chapter marks; each row = official title + platform tag `YouTube`):
  1. Kuroto 55 → EP_KUROTO_55
  2. Campaña III 70 → EP_C3_70
  3. Tierras Salvajes 35 → EP_TS_35
  4. Xoltacan 1 → EP_XOLTACAN_1
  5. Star Wars 1 → EP_STARWARS_1
  Footer CTA: `Ver el canal de YouTube ↗` → YT_CHANNEL
- No thumbnails, no embeds, no "recent/new" labels, no dates.

## Únete a la partida `#comunidad`

- Eyebrow: `ÚNETE A LA PARTIDA`
- H2: `Toda party necesita a alguien que abra la puerta sin mirar.`
- P: `La comunidad de Lichpol se reúne en Discord. Entrar a saludar no requiere tirada de salvación.`
- What happens (small, explicit): `El botón abre la invitación oficial al servidor de Discord «Lichpol», en una pestaña nueva. Llegarás al canal de llegadas. Si hay partidas o plazas abiertas, se consultan allí.`
- Primary CTA: `Entrar en la comunidad ↗` → DISCORD
- Secondary text links: `Instagram` → INSTAGRAM · `X` → X

## Footer

- Brand lockup (white logo) + line: `Campañas de rol en directo, mundos propios y consecuencias.`
- Column "Explora": Campañas, El Dungeon Master, Crónicas, Comunidad (anchors).
- Column "Canales": Twitch, YouTube, Discord, Instagram, X.
- Base: `LICHPOL · The Arcane Tavern` · `Ilustraciones conceptuales, no canónicas. Esta web no usa cookies ni analítica.`
- No legal links (none exist; do not invent).

## Cursed D20

- Button accessible name: `Tirar el d20`; visible tooltip/hint text (hover + focus): `Tira el dado. ¿Qué podría salir mal?`
- Panel heading: the category label. Number large. Phrase below. Actions: `Volver a tirar` (button) and close (icon button, aria-label `Cerrar resultado`).
- Live announcement (aria-live polite, after animation): `Has sacado un {n}. {Categoría}. {Frase}`

Categories (id → label → range):
- `fumble` → `Pifia crítica` → 1
- `disaster` → `Desastre` → 2-5
- `bad` → `Mala suerte` → 6-10
- `survival` → `Supervivencia cuestionable` → 11-15
- `good` → `Buena tirada` → 16-19
- `critical` → `Éxito crítico` → 20

Phrase bank:

fumble
- Hasta el cadáver del suelo ha sentido vergüenza ajena.
- Tu espada sale volando y, por algún motivo, aterriza en tu bota.
- El bardo ya está componiendo la canción. No es una canción heroica.
- El dado no ha fallado: ha emitido un juicio.
- Has tropezado con tu propia sombra. La sombra ha pedido disculpas por ti.
- En algún plano lejano, un lich se ríe por primera vez en siglos.
- Tu personaje acaba de descubrir la gravedad. Con la cara.

disaster
- El Dungeon Master sonríe. Eso nunca ha terminado bien.
- Fallas con tal convicción que el enemigo duda de sí mismo.
- La puerta estaba abierta. La has cerrado. Con llave. Desde fuera.
- Tu plan era brillante. Tu ejecución, una tragedia en tres actos.
- El goblin te mira con lástima y te ofrece su daga. Por si acaso.
- Tus compañeros acaban de decidir que no te conocen.
- Has despertado a algo. No, no era el posadero.

bad
- Sigues vivo. Claramente ha habido un error administrativo en el inframundo.
- Casi. Esa palabra quedará muy bien en tu lápida.
- La flecha pasa rozando. Rozando a tu compañero.
- No es un fracaso. Es una lección con pérdida de puntos de golpe.
- El cofre no tenía trampa. Tenía dos.
- El destino ni siquiera se ha molestado en mirarte.
- Has encontrado la salida. Era la entrada al siguiente piso.

survival
- No has muerto. Tus compañeros todavía están debatiendo si eso es bueno.
- Lo consigues. Nadie sabe cómo, y tú menos.
- Sobrevives, que no es lo mismo que salir bien parado.
- Aprobado raspado. El examen consistía en no morir.
- Funciona. No preguntes por qué ni intentes repetirlo.
- El puente aguanta. Por ahora. No mires abajo.
- Lo justo para que el Dungeon Master tenga que improvisar. Le encanta.

good
- Impresionante. Por primera vez hoy, tu incompetencia no ha sido determinante.
- El bardo toma notas, por si acaso.
- Aciertas. El enemigo se replantea sus decisiones vitales.
- Hoy los dados te quieren. Mañana, ya veremos.
- Bien hecho. Disfrútalo: el Dungeon Master ya está reajustando el encuentro.
- Tu grupo te mira con un respeto nuevo y ligeramente incómodo.
- Éxito. Que no se te suba a la cabeza: ahí ya llevas el sombrero.

critical
- Los dioses te favorecen. No te acostumbres, miserable.
- Por un instante, eres la leyenda que dices ser en la taberna.
- Hasta el Dungeon Master ha dejado de sonreír.
- Los dragones susurran tu nombre. Mal pronunciado, pero lo susurran.
- Guarda este dado. No volverá a pasar.
- El destino revisa sus papeles: esta vez estás en la lista buena.
- Esta noche la ronda corre de tu cuenta. Las leyendas pagan.

---

# Visual direction (Claude, from design.md + Frontend Design lens)

Palette: ONLY css/tokens.css tokens (ink-950 canvas, ink-900/850 surfaces, bone-100/200/300 text, brass-400 action, brass-300 focus, arcane-400 for the nat-20 moment only, rust-400 for the nat-1 moment only). Brass is rare: primary CTA, focus, a few rules. No new hex palette; derived rgba of tokens allowed for overlays.
Type: Cinzel (500 headings, 600 brand) for h1-h3; Inter variable for UI/body; Cormorant Garamond 500 italic ONLY for editorial pull lines (e.g. episode titles in the archive ledger, DM caption). One family per heading, no mixed-family words in headings. Self-hosted woff2 in assets/fonts (latin), font-display: swap, preload only cinzel-latin-500.

Boldness is spent in ONE place: the hero (cinematic, huge Cinzel H1 bottom-left like a film title card over the dark left third of tavern.webp). Everything else quiet, editorial, disciplined. The D20 is the signature interaction, not decoration.

Layout (container 1200 / 12 cols desktop):

HERO (min-height: min(100svh, 940px); full bleed; header overlays it transparently)
+------------------------------------------------------------+
| [logo LICHPOL]     Inicio Campañas DM Crónicas Comunidad [Twitch] |
|                                                            |
|                                        (tavern hall, fire)  |
| LICHPOL · THE ARCANE TAVERN                                |
| No todas las historias                                     |
| permiten regresar.                                         |
| lead (max 52ch)                                            |
| [Explorar las campañas] [Ver partidas en Twitch ↗]         |
| ---- Directos en Twitch | Archivo en YouTube | Discord   |
+------------------------------------------------------------+
Copy anchored bottom-left (not vertically centered). Overlay: left-to-right ink gradient + bottom fade to canvas, tuned so text >= 4.5:1 on the real pixels. Mobile (<=540): object-position ~68% 50% so the lit hall and candles stay visible; copy at bottom over a stronger bottom gradient; H1 ~ clamp(2.5rem, 11vw, 3.4rem) with no widow; CTAs stacked full width.
Header: on home it starts transparent over the hero and gets the solid V6 background (rgba(15,14,14,.95) + border) once the hero top has scrolled past (IntersectionObserver sentinel, no scroll listeners). Mobile menu = existing V6 pattern (button, aria-expanded, Escape, focus return) — reuse js/site.js, do not duplicate.

DUNGEON MASTER (asymmetric 5/7)
+---------------------------+  +---------------------------+
| wizard.webp framed tall   |  | eyebrow / H2              |
|   [color logo seal plate  |  | P1, P2 (max 62ch)         |
|    overlapping corner]    |  | ledger <dl> 4 rows        |
| caption (Cormorant ital.) |  |                           |
+---------------------------+  +---------------------------+
Logo sits on a dark plate (surface + 1px line-strong) with >=10% clear space; never filtered.

CAMPAÑAS (library of worlds, asymmetric, NOT 3 equal cards)
+-------------------------------+ +---------------+
| KUROTO protagonist (8 cols,   | | XOLTACAN      |
| tall image, text overlaid     | | obsidian/iron |
| bottom-left, 2 links)         | | typographic   |
|                               | +---------------+
|                               | | BRUNAMI image |
+-------------------------------+ +---------------+
Otras mesas: ———— Star Wars FFG · Aventuras Rebeldes ↗ | One-shots ↗ | Todas las campañas ↗ (hairline index row)
Tablet (<=900): Kuroto full width; Xoltacan + Brunami side by side. Mobile: single column, Kuroto image ~4:5 crop with text below the image (not over it) if contrast demands.
Card hover: image scale 1.04 + border brightens (existing V6 behavior); the whole card is NOT one big link (two links per card); links have their own focus-visible.

CRÓNICAS (5/7)
left: "Directos" panel on --material-leather, Twitch copy + CTA.
right: archive ledger: rows [campaign/kind small sans] [official title in Cormorant italic] [YouTube ↗]; hairline separators; hover row warms (background rgba brass .06) and arrow nudges 2px. Then "Ver el canal de YouTube ↗".

COMUNIDAD (full-bleed band, reuses tavern.webp but cropped to the candle/map table at bottom-left: object-position 0% 100%, heavily darkened) — big H2 left, copy + "what happens" note + primary Discord CTA; Instagram/X as quiet text links.

FOOTER: V6 footer structure, 3 columns + base line.

Motion (respect tokens --quick 160ms, --normal 240ms, --reveal 620ms, --ease-ritual):
- ONE orchestrated hero entrance on load: eyebrow, H1, lead, CTAs, strip fade+rise 12px, staggered 80ms, total < 1s. Hero image settles from scale 1.04 to 1 over 1.6s once (no loop).
- data-reveal (existing) only on: campaign library block and archive ledger. Not on every section.
- No scroll-jacking, no parallax, no infinite loops (except none), no particles.
- prefers-reduced-motion: everything static and immediately visible (existing V6 block already covers transitions/animations; ensure new keyframes too).

Anti-slop rules: no identical card grids, no glows/blobs, no neon, no glassmorphism, no "→" on buttons (↗ only on external links, aria-hidden), no numbered 01/02/03 markers (content is not a sequence), no status pills, no fake thumbnails/embeds.
