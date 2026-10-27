# Codex task R18 (small follow-up to R17, index.html + css/home.css only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Touch only index.html and css/home.css.

1. Heading hierarchy in #campanas: the group headings "Aventuras" and "Campañas" stay h3; the six card titles (Aventuras en Kuroto, Aventuras en Xoltacan, No despiertes..., En la Bruma, La Guerra de Brunami, Tierra de Dragones) become h4. Update CSS selectors so the rendered look is pixel-identical to now. "Otras mesas" stays h3.
2. Xoltacan card: remove the <details>/<summary>"Leer más" wrapper; all 4 synopsis paragraphs visible as plain <p>, text unchanged. Remove now-unused details CSS only if nothing else uses it.
3. Calendar (.home-live__calendar): give the wrapper role="group" (keep its aria-label). In each day name, ensure assistive tech reads the day and the markers as separate words (e.g. visually-hidden ", " separators before the "Hoy"/"Próxima" markers, or equivalent) with no visual change.

Acceptance: node --test tests/d20.test.mjs tests/schedule.test.mjs passes; grep shows 6 <h4 in #campanas and 0 "<details" inside .home-worlds__xoltacan; no layout overflow at 320/375/1440. Report the diff summary.
