# Codex task R45: character bible + illustration batch 1 (chapters 1-10)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Use your image_generation tool and view_image on every result. Runs IN PARALLEL with R44 (code task): you may write ONLY assets/novela/lamina-*.webp, tools/novela-laminas.json, tasks/art-src/** . Do not edit any code, CSS, HTML, tests or other assets.

Read first: tasks/codex-r44.md section C (PLATE PROMPT, scene-selection fidelity rules, file format, JSON schema) and kuroto-novela/GUIA_ESTILO.md.

## Batch 1 and the coherence system
Owner decision 2026-10-27: plates are produced in 18 batches (17 x 10 chapters, last batch 11), all through Codex, with visual coherence between plates. This task does batch 1 = chapters 1-10 and sets up the system; batches 2-18 follow tasks/codex-laminas-tanda.md.
1. Character bible FIRST: create `tasks/art-src/biblia-personajes.md`. For every character who appears in at least two of chapters 1-10 (at minimum Tokugawa, Leonardo, Sun Gukon, Talos, Kitaro), write a canonical visual descriptor using ONLY details stated in the novel text (quote the source lines and chapter numbers); where the text is silent, fix a neutral, non-contradicting choice once (e.g. colour of a robe) and mark it `[decisión de estilo]` so it stays identical forever. Then generate one reference sheet per main character in the exact plate style (full figure, front and three-quarter, plain cream background) at `tasks/art-src/referencias/<nombre>.png` and view each.
2. Every plate prompt = PLATE PROMPT + the verbatim descriptors of the characters present + SCENE. If your image tool accepts input/reference images, attach the relevant character sheets and up to 2 previously accepted plates as style references; state in the report whether references were actually attached or only text descriptors were used.
3. Generate plates for chapters 1-10, view every result, regenerate any plate that shows text, colour, frames, a character contradicting the bible, or anything not in the source sentence (max 3 attempts each; report failures instead of forcing).
4. Append each plate to `tools/novela-laminas.json` (JSON array; fields: capitulo, archivo, alt, pie, fuente — see R44 section C). If R44 already created the file as `[]`, append to it; never remove entries.

## Acceptance
Plates for chapters 1-10 in assets/novela/ (each < 300 KB, ~1200x1600, WebP q~72; source PNGs in tasks/art-src/), 10 entries in tools/novela-laminas.json (valid JSON), bible + reference sheets in tasks/art-src/. Report per tasks/codex-laminas-tanda.md "Report" section, plus the bible summary.

## Stop and escalate
image_generation unavailable or unable to keep text/colour/frames out after 3 attempts; a scene that cannot be grounded in a literal sentence.
