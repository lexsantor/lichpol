# Codex task R16 (trivial, index.html only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Edit ONLY index.html. No commits.

Owner decision: remove the sentence "Las ilustraciones son conceptuales; los mundos de verdad se descubren jugando." from the Campaigns intro (index.html, around line 177).

The paragraph must become exactly:
`<p>Campañas largas, archivadas capítulo a capítulo en YouTube.</p>`
Change nothing else.

Acceptance: `grep -c "ilustraciones son conceptuales" index.html` = 0; report the before/after line.
