import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  escapeHtml,
  insertPlateAtParagraphMidpoint,
  markdownToHtml,
  parseFrontMatter,
  validateChapterSource,
  validateNovelSources,
} from '../tools/novela-build.mjs';

const readerSource = await readFile(new URL('../js/novela.js', import.meta.url), 'utf8');
const readerHelpers = await import(`data:text/javascript;base64,${Buffer.from(readerSource).toString('base64')}`);

test('HTML text is escaped before italic markers become emphasis', () => {
  assert.equal(escapeHtml('<tag a="b"> & \'c\''), '&lt;tag a=&quot;b&quot;&gt; &amp; &#39;c&#39;');
  assert.equal(markdownToHtml('Una <marca> & *idea*.'), '<p>Una &lt;marca&gt; &amp; <em>idea</em>.</p>');
});

test('scene breaks render as decorative separators rather than asterisks', () => {
  assert.equal(
    markdownToHtml('Antes.\n\n* * *\n\nDespués.'),
    '<p>Antes.</p>\n<div class="novela-scene-break" role="separator" aria-label="Cambio de escena"><span aria-hidden="true">✦</span></div>\n<p>Después.</p>',
  );
});

test('a chapter plate is placed near the word midpoint at a paragraph boundary', () => {
  const sceneBreak = '<div class="novela-scene-break" role="separator" aria-label="Cambio de escena"><span aria-hidden="true">✦</span></div>';
  const prose = `<p>Uno dos tres.</p>\n${sceneBreak}\n<p>Cuatro cinco.</p>\n<p>Seis siete ocho nueve diez.</p>\n${sceneBreak}\n<p>Once doce trece.</p>`;
  const plate = { archivo: 'lamina-001.webp', alt: 'Ilustración: una escena en sepia.', pie: 'Una escena.' };
  const result = insertPlateAtParagraphMidpoint(prose, plate);
  const figureIndex = result.indexOf('<figure class="novela-plate"');
  assert.ok(figureIndex > result.indexOf('<p>Cuatro cinco.</p>'));
  assert.ok(figureIndex < result.indexOf('<p>Seis siete ocho nueve diez.</p>'));
  assert.ok(result.slice(0, figureIndex).trimEnd().endsWith('</p>'));
  assert.equal((result.match(/<figure class="novela-plate"/gu) ?? []).length, 1);
});

test('a chapter without a plate entry renders no illustration figure', () => {
  const prose = '<p>Un párrafo.</p>';
  assert.equal(insertPlateAtParagraphMidpoint(prose, null), prose);
  assert.equal(insertPlateAtParagraphMidpoint(prose, undefined).includes('<figure'), false);
});

test('blank-line-separated text becomes separate paragraphs', () => {
  assert.equal(markdownToHtml('Primer párrafo.\ncontinúa aquí.\n\nSegundo párrafo.'), '<p>Primer párrafo. continúa aquí.</p>\n<p>Segundo párrafo.</p>');
});

test('front matter returns metadata and the Markdown body', () => {
  const parsed = parseFrontMatter('---\ncapitulo: 7\ntitulo: "Un título: sereno"\ninterludio: true\n---\n\n# Un título: sereno\n\nTexto.');
  assert.deepEqual(parsed.metadata, { capitulo: 7, titulo: 'Un título: sereno', interludio: true });
  assert.equal(parsed.body, '# Un título: sereno\n\nTexto.');
});

test('chapter validation catches a mismatched title and a stray asterisk', () => {
  const entry = { numero: 1 };
  const badTitle = '---\ncapitulo: 1\ntitulo: "Título correcto"\n---\n\n# Otro título\n\nTexto.';
  const strayAsterisk = '---\ncapitulo: 1\ntitulo: "Título correcto"\n---\n\n# Título correcto\n\nTexto con *asterisco suelto.';
  assert.ok(validateChapterSource({ source: badTitle, entry, filename: '001.md' }).some(error => error.includes('does not match front matter titulo')));
  assert.ok(validateChapterSource({ source: strayAsterisk, entry, filename: '001.md' }).some(error => error.includes('unbalanced * marker')));
});

test('reader height snaps down to a whole number of text lines', () => {
  assert.equal(readerHelpers.snapToWholeLines(99, 24), 96);
  assert.equal(readerHelpers.snapToWholeLines(99, 24.8), 74.4);
  assert.equal(readerHelpers.snapToWholeLines(12, 24), 0);
});

test('reader flow height is snapped from the resized book height and vertical padding', () => {
  assert.equal(readerHelpers.computeSnappedFlowHeight(702, 48, 52, 24), 700);
  assert.equal(readerHelpers.computeSnappedFlowHeight(700, 48, 52, 24), 700);
  assert.equal(readerHelpers.computeSnappedFlowHeight(110, 48, 52, 24), 100);
});

test('reader flow height reads the book box after applying its new height', () => {
  const events = [];
  let bookHeight = 586;
  const flow = { style: {} };
  const height = readerHelpers.resizeFlowHeightToBook({
    sizeBook() {
      events.push('resize book');
      bookHeight = 702;
    },
    book: {
      getBoundingClientRect() {
        events.push('measure book');
        return { height: bookHeight };
      },
    },
    flow,
    measureBlockMetrics() {
      events.push('measure margins');
      return { paddingTop: 48, paddingBottom: 52, lineHeight: 24 };
    },
  });

  assert.deepEqual(events, ['resize book', 'measure book', 'measure margins']);
  assert.equal(height, 700);
  assert.equal(flow.style.height, '700px');
});

test('reader height recomputes on width or breakpoint changes despite small height deltas', () => {
  assert.equal(readerHelpers.shouldRecomputeReaderHeight(true, false, 88), true);
  assert.equal(readerHelpers.shouldRecomputeReaderHeight(false, true, 0), true);
  assert.equal(readerHelpers.shouldRecomputeReaderHeight(false, false, 88), false);
  assert.equal(readerHelpers.shouldRecomputeReaderHeight(false, false, 120), true);
});

test('reader page count comes from multicolumn scroll width', () => {
  assert.equal(readerHelpers.countPagesFromScrollWidth(1200, 480, 120, 120), 2);
  assert.equal(readerHelpers.countPagesFromScrollWidth(2280, 480, 120, 120), 4);
  assert.equal(readerHelpers.countPagesFromScrollWidth(0, 0, 0, 0), 1);
});

test('page hashes open a page, its spread, or the final spread', () => {
  assert.equal(readerHelpers.pageFromHash('#p=4', 18, 2), 3);
  assert.equal(readerHelpers.pageFromHash('#p=4', 18, 1), 4);
  assert.equal(readerHelpers.pageFromHash('#fin', 18, 2), 17);
  assert.equal(readerHelpers.pageFromHash('#fin', 18, 1), 18);
  assert.equal(readerHelpers.pageFromHash('#unknown', 18, 2), 1);
  assert.equal(readerHelpers.formatPageStatus(3, 18, true), 'Páginas 3-4 de 18');
  assert.equal(readerHelpers.formatPageStatus(3, 18, false), 'Página 3 de 18');
});

test('spread offsets use measured column pitch instead of the viewport width', () => {
  const pitch = readerHelpers.columnPitchFromPositions([45, 330, 615], 335, 0);
  assert.equal(pitch, 285);
  assert.equal(readerHelpers.pageOffsetForSpread(1, pitch, 2), 0);
  assert.equal(readerHelpers.pageOffsetForSpread(3, pitch, 2), -570);
  assert.equal(readerHelpers.pageOffsetForSpread(5, pitch, 2), -1140);
  assert.equal(readerHelpers.columnOffsetFromPositions([45, 330, 615], 2, pitch), 570);
  assert.equal(readerHelpers.columnPitchFromPositions([24, 24, 24], 335, 0), 335);
});

test('plate column selection follows the chapter word midpoint and excludes the first and last columns', () => {
  const ends = [
    { columnIndex: 0, wordsBefore: 20 },
    { columnIndex: 1, wordsBefore: 44 },
    { columnIndex: 2, wordsBefore: 51 },
    { columnIndex: 3, wordsBefore: 75 },
    { columnIndex: 4, wordsBefore: 100 },
  ];
  assert.equal(readerHelpers.choosePlateColumn(ends, 150, 2).columnIndex, 3);
  assert.equal(readerHelpers.choosePlateColumn(ends, 95, 2).columnIndex, 2);
  assert.equal(readerHelpers.choosePlateColumn([
    { columnIndex: 0, wordsBefore: 8 },
    { columnIndex: 1, wordsBefore: 10 },
  ], 20, 1), null);
});

test('paragraph splitting clones inline ancestors when the offset falls inside emphasis', () => {
  const inline = [
    { type: 'text', text: 'A ' },
    { type: 'element', tag: 'em', attributes: { class: 'voice' }, children: [{ type: 'text', text: 'bruma' }] },
    { type: 'text', text: ' final' },
  ];
  const result = readerHelpers.splitInlineContentAtOffset(inline, 4);
  assert.deepEqual(result, {
    left: [
      { type: 'text', text: 'A ' },
      { type: 'element', tag: 'em', attributes: { class: 'voice' }, children: [{ type: 'text', text: 'br' }] },
    ],
    right: [
      { type: 'element', tag: 'em', attributes: { class: 'voice' }, children: [{ type: 'text', text: 'uma' }] },
      { type: 'text', text: ' final' },
    ],
    offset: 4,
  });
  assert.equal(readerHelpers.splitInlineContentAtOffset([{ type: 'text', text: 'A 🦊B' }], 3).offset, 2);
});

test('cover appears only on an unpositioned first reader visit', () => {
  assert.equal(readerHelpers.shouldShowCover('', false), true);
  assert.equal(readerHelpers.shouldShowCover('#p=4', false), false);
  assert.equal(readerHelpers.shouldShowCover('#fin', false), false);
  assert.equal(readerHelpers.shouldShowCover('', true), false);
});

test('continue-reading records accept the current object and the old numeric value', () => {
  assert.deepEqual(readerHelpers.readContinueRecord('{"c": 7, "p": 4}'), { chapter: 7, page: 4 });
  assert.deepEqual(readerHelpers.readContinueRecord('7'), { chapter: 7, page: 1 });
  assert.deepEqual(readerHelpers.readContinueRecord('001'), { chapter: 1, page: 1 });
  assert.equal(readerHelpers.readContinueRecord('invalid'), null);
});

test('all real Kuroto chapter sources validate cleanly', async () => {
  const result = await validateNovelSources();
  assert.equal(result.chapters.length, 181);
  assert.deepEqual(result.errors, []);
});
