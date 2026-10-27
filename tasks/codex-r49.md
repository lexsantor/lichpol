# Codex task R49: plate as its own page by splitting the paragraph at the column boundary

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Files: js/novela.js, css/novela.css, tests/novela.test.mjs (and tools/novela-build.mjs only if needed). Do not touch assets/, tools/novela-laminas.json, tasks/art-src/. No browsers (Claude verifies). Regenerate with `node tools/novela-build.mjs --limit 3`.

Measured by Claude after R48 at 1440x900: chapter 001 is now fine, but in chapter 003 the left page of spread 5-6 holds only the scene-break ornament and one short sentence ("Cerca de la medianoche se oyó un maullido.") and is otherwise blank; the plate is on the right page. Moving the figure between paragraph boundaries cannot fix this in general, because columns almost never end at a paragraph boundary.

Approach (replace the R48 candidate search):
1. Paginate the text WITHOUT the figure in the flow (keep the figure element detached or display:none during measurement).
2. Choose the target column K: the column whose end is closest to the chapter's word midpoint (or the generator's default position), never the chapter's first column, never K such that the plate would be the last page.
3. Find the exact break point at the end of column K: the last text position rendered in column K (use Range.getClientRects over text nodes / caretPositionFromPoint or a binary search on character offsets within the paragraph that crosses the column boundary). If a paragraph straddles the boundary, split that paragraph's text node at that offset into two <p> elements: the second gets class `novela-p--cont` (no first-line indent, no drop cap) and `data-split-from` pointing to the first. If column K ends exactly at a paragraph or scene-break boundary, no split is needed.
4. Insert the figure right after the split point (`break-before: column; break-after: column`, full page height as today) and repaginate. The text before the plate must fill column K to its last line; the text after continues at the top of the page after the plate.
5. On resize/repagination: undo (merge the split paragraphs back, detach the figure), repaginate, redo. Keep the reading-position anchor logic working (anchor by paragraph index BEFORE splitting, i.e. on the merged DOM).
6. Never split inside an <em> boundary in a way that breaks markup: split at text-node level and clone the inline ancestors (em) on both sides if the offset is inside an <em>.
7. Screen readers: the two halves are adjacent <p>s with the figure between; acceptable. No-JS/continuous mode keeps the generator's default figure position, no split.
8. Unit-test the pure helpers (choosing K from column ends and midpoint; splitting a paragraph's text at an offset including inside <em>), with jsdom-free logic (operate on plain data structures).

Acceptance: build 181/0; tests pass. Report the algorithm and any limitation.
