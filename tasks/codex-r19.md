# Codex task R19: Crónicas 50/50 + DM voice quips

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Touch only index.html, css/home.css, js/schedule-core.js, tests/schedule.test.mjs.

## 1. Layout (owner request)
`.home-chronicles__layout` (css/home.css ~line 692) is `minmax(0, 5fr) minmax(0, 7fr)`. Make it 50/50: `minmax(0, 1fr) minmax(0, 1fr)`. Keep the existing mobile single-column breakpoint. Check the calendar rows and archive titles still read well at 1024 and 1440 (calendar has more room now: day / title / time can stay on one row).

## 2. Quips in the DM's voice (owner: dark, acid, satirical, "hater" humor)
Exact strings below, Spanish, no em dashes. Information must stay explicit; quips are additions, never replacements of facts.

a) Campaigns intro (#campanas section-heading paragraph) becomes exactly:
   `Campañas largas, archivadas capítulo a capítulo en YouTube. Los personajes no duran tanto.`
b) DM section (.home-dm__prose): append a third paragraph exactly:
   `Es justo con todos sus jugadores: los odia a todos por igual.`
c) Archive block ("El archivo" h3 in #cronicas): add right under the h3 a short paragraph, styled like the Directos intro paragraph:
   `Cada muerte, debidamente documentada y con enlace.`
d) Calendar rest days: replace each "Sin directo programado" with:
   - viernes: `Sin directo. Tiempo de sobra para llorar a tus personajes.`
   - sábado: `Sin directo. El DM afila los dados.`
   - domingo: `Sin directo. Ni un lich trabaja en domingo.`
e) Calendar status line (js/schedule-core.js message), keep the factual part identical and append the quip after it (after the optional "(en tu hora: HH:MM)"):
   - next session: `Próxima sesión programada: martes a las 20:30. Ve preparando una ficha de repuesto.`
   - in slot: `Sesión programada ahora (20:30-23:00). Llegas tarde, para variar.`
   Update tests/schedule.test.mjs expectations accordingly.

Do not change any campaign synopsis, card text, links, Twitch titles or the footer.

## Acceptance
- node --test tests/d20.test.mjs tests/schedule.test.mjs passes.
- grep each quip string: exactly 1 occurrence (status quips in js/schedule-core.js).
- grep "Sin directo programado" in index.html = 0; "5fr" in the chronicles rule = 0.
- Report diff summary. Stop and escalate if the 50/50 layout breaks the calendar at 1024.
