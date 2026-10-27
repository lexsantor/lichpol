# Codex task template: Kuroto illustration batch (tandas 2-18)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Use your image_generation tool and view_image on every result. The invoking message gives TANDA N and its chapter list. Several batches run IN PARALLEL, so each batch writes ONLY its own files (below) and never edits shared files.

Batches (owner decision 2026-10-27; 181 chapters, 92 does not exist):
Tanda 1: 1-10 (done) · 2: 11-20 · 3: 21-30 · 4: 31-40 · 5: 41-50 · 6: 51-60 · 7: 61-70 · 8: 71-80 · 9: 81-90 · 10: 91-101 (no 92) · 11: 102-111 · 12: 112-121 · 13: 122-131 · 14: 132-141 · 15: 142-151 · 16: 152-161 · 17: 162-171 · 18: 172-182 (11 chapters).

## Fixed inputs (read-only, never edit)
- PLATE PROMPT and fidelity rules: tasks/codex-r44.md section C. Owner-approved style = the tanda 1 plates (tasks/art-src/lamina-001..010-attempt*.png).
- Character bible: tasks/art-src/biblia-personajes.md and sheets in tasks/art-src/referencias/. Owner confirmed (2026-10-27): Hayate is a human with wings (keep the bible descriptor).
- kuroto-novela/GUIA_ESTILO.md and the chapters in kuroto-novela/capitulos/.

## Your outputs (only these paths)
- `tasks/art-src/lamina-NNN-attemptK.png` (PNG only; Claude exports WebP after review; do NOT write to assets/).
- `tasks/art-src/tanda-NN.json`: JSON array of entries `{ "capitulo", "archivo": "lamina-NNN.webp", "alt", "pie", "fuente", "intento": K, "personajes": [...], "referencias_adjuntas": true|false }`.
- `tasks/art-src/biblia-tanda-NN.md`: proposed bible ADDITIONS for characters first appearing (or first described) in this batch, with quotes; never restate or change existing descriptors.
- `tasks/art-src/referencias/<nombre>-tNN.png`: reference sheets for NEW recurring characters (suffix with the batch number to avoid clashes with parallel batches).

## Steps
1. Read each chapter. Pick ONE scene per chapter that is literally narrated; vary scene types across the batch (place, action, creature, quiet character moment) so consecutive plates do not repeat compositions; avoid gore beyond what the text states.
2. Characters present: use the bible descriptor verbatim; for a new recurring character write the descriptor from the text only (quote it) into your biblia-tanda file, generate its sheet first, then use it.
3. Prompt = PLATE PROMPT + verbatim descriptors of characters present + SCENE. Attach as reference images (if your tool supports input images) the relevant character sheets + 2 tanda-1 plates for style. Record per entry whether references were actually attached.
4. View every result. Regenerate (max 3 attempts) any plate with text/lettering, colour other than sepia, frame/border, a character contradicting the bible, a different art style from tanda 1, or content not in the source sentence. Report failures, do not force.

## Report
Chapter list; per plate: chapter, quoted source sentence, SCENE, characters, references attached yes/no, attempts, alt, pie; proposed bible additions; conflicts or failures.
