# LICHPOL · Content provenance and integration contract

## Verified public context (accessed Oct 22, 2026)
- https://lichpol.es/ : Pol uses the alias Lichpol, plays and DMs tabletop RPGs, holds weekly community game listings; Discord is the primary community hub; Twitch/YouTube are publishing platforms; Foundry VTT is the main online tool. Systems cited: D&D 5e, Star Wars FFG, The Troubleshooters.
- https://lichpol.es/?p=57 : community origins, Kuroto as an original Japanese-inspired D&D world by Lichpol, mentions Brunami and other games, community members may post their own games.

## Not verified in real time
- Discord invite URL, campaign schedules, dates, current slots, registration completion, fees, activity counts, platform availability.
- Therefore: every campaign says "Consultar plazas"; all joining CTAs go to the official site, not to a fabricated registration form.
- For Twitch the public handle shown is @lichpol_gamer; official source remains `lichpol.es`.

## To launch
1. Confirm logos, hero art and copy with Pol.
2. Supply canonical verified Discord/Twitch/YouTube links and decide CTA routing.
3. Supply campaign source-of-truth content with status/slots, session dates, system details, links, and image licenses.
4. Publish privacy/cookies/legal information if needed based on real features and jurisdiction.
5. If registrations are wanted, choose backend and abuse protection; do not turn demo forms into real data capture by default.
6. Verify external hyperlinks, browser keyboard flows, screen readers and user-reduced-motion settings.

## Verificación 2026-10-22 (home V1)
Comprobado directamente contra las APIs públicas (YouTube oEmbed, Discord invites API, HTTP):
- Twitch `https://www.twitch.tv/lichpol_gamer`: responde 200.
- YouTube: el canal real es `@Lichpol` (author_url de oEmbed). Los handles `@zaknafein2009` y `@Lichpol_Gamer` de `content-lichpol.md` devuelven 404.
- Playlists oficiales de `@Lichpol`: Aventuras en Xoltacan `PLelQK3I2Q5zyXz8TBAs7MJ3shiS9jazby`, Aventuras en Kuroto `PLelQK3I2Q5zymJZ2e2SNmwxsnnFGjBCYb`, Campaña 3 La Guerra de Brunami `PLelQK3I2Q5zynIBwDBsv1I-T6EsYqAYxv`, Star Wars FFG Aventuras Rebeldes `PLelQK3I2Q5zxMBvbY2_-e7qDzcagql0tE`, One Shot `PLelQK3I2Q5zyEDQczR5YNpWX2t7kIftlM`.
- Primeros capítulos (títulos oficiales): Xoltacan `ZXhsunFOVdQ`, Kuroto `KkZZR81onIw`, La Guerra de Brunami `6M9EkEvi1pw`, Star Wars `B26h-9dGnWU`.
- Episodios citados: `f7E7uxoKseE` (Kuroto cap. 55), `BzuYZqJdEFw` (Campaña III cap. 70), `MEuZzIbuTNQ` (Campaña 3 Tierras Salvajes cap. 35; no aparece como playlist propia, sin tarjeta de campaña).
- Discord: `discord.gg/qjqXeQGmXU` válida, sin caducidad, servidor «Lichpol», canal de llegadas. La invitación de Linktree `8MGMue85nG` está caducada.
- No publicado por no verificable hoy: horarios, número de capítulos, plazas, estado de campañas.

## Verificación 2026-10-27 (sinopsis oficiales + calendario)
- Sinopsis de las 6 historias (Campañas 1-4, Aventuras en Kuroto y Xoltacan): texto oficial entregado por el propietario el 2026-10-27. Se publica literal; única normalización: "Xoltacán" -> "Xoltacan" (convención de YouTube, Twitch y la web).
- Playlists nuevas en `@Lichpol` (HTTP 200): Campaña 1 No despiertes lo que no ha de ser despertado `PLelQK3I2Q5zxsWP218vCO_KNFB1fkG-xV`, Campaña 2 En la Bruma `PLelQK3I2Q5zwGWoCqGK_mGnFpEHovcRAB`, Campaña 4 Tierra de Dragones `PLelQK3I2Q5zyVAjMT30fE26_1TvPQ_8vR`.
- Primeros vídeos (oEmbed): C1 `vHBN_coPYGw` = "Capítulo 2, Los Bandidos" (el capítulo 1 no está en la playlist, sin enlace a capítulo); C2 `PHRE2squ71Y` = "Capítulo 1: Un Lugar Extraño"; C4 `mOJ7bDIALRw` = "El Huevo - Capítulo 01".
- Horario: `https://www.twitch.tv/lichpol_gamer/schedule`, idéntico 3 semanas seguidas (26 oct - 15 nov 2026): lun y mar "Campañas de D&D", mié y jue "Aventuras de D&D", 20:30-23:00 hora de Madrid. La bio de X (`content-lichpol.md`) dice lun-mié; prevalece Twitch por ser la fuente que indicó el propietario.
- Siguen sin publicarse: número de capítulos, plazas, estado (en curso/finalizada).

## Audio (2026-10-27)
- Música de ambiente: "Cathedral in the forest (ambient loop)" de congusbongus, OpenGameArt (https://opengameart.org/content/cathedral-in-the-forest-ambient-loop), licencia CC0. Original `forest_2.ogg` (2,9 MB, 2:17, 44,1 kHz estéreo) aportado por el propietario; fuera de Git en `tasks/audio-src/`.
- Derivados (ffmpeg 9.0.2, gyan.dev): `assets/audio/ambiente.webm` (Opus 40k, 930 KB) y `assets/audio/ambiente.m4a` (AAC 64k, 1,1 MB, para Safari).
- Uso: solo bajo demanda (botón junto al d20), apagado por defecto, sin autoplay.
