export function snapToWholeLines(availableHeight, lineHeightPx) {
  const available = Number(availableHeight);
  const lineHeight = Number(lineHeightPx);
  if (!Number.isFinite(available) || !Number.isFinite(lineHeight) || available <= 0 || lineHeight <= 0) return 0;
  return Math.floor((available + 1e-7) / lineHeight) * lineHeight;
}

export function computeSnappedFlowHeight(bookHeight, paddingTop, paddingBottom, lineHeightPx) {
  const height = Number(bookHeight);
  const top = Math.max(0, Number(paddingTop) || 0);
  const bottom = Math.max(0, Number(paddingBottom) || 0);
  if (!Number.isFinite(height) || height <= 0) return 0;
  const paddingBlock = top + bottom;
  const contentHeight = Math.max(0, height - paddingBlock);
  return snapToWholeLines(contentHeight, lineHeightPx) + paddingBlock;
}

export function resizeFlowHeightToBook({ sizeBook, book, flow, measureBlockMetrics }) {
  sizeBook();
  const bookHeight = book.getBoundingClientRect().height;
  const { paddingTop, paddingBottom, lineHeight } = measureBlockMetrics();
  const height = computeSnappedFlowHeight(bookHeight, paddingTop, paddingBottom, lineHeight);
  flow.style.height = `${height}px`;
  return height;
}

export function shouldRecomputeReaderHeight(widthChanged, breakpointChanged, heightDelta) {
  const delta = Math.abs(Number(heightDelta));
  return Boolean(widthChanged || breakpointChanged) || (Number.isFinite(delta) && delta >= 120);
}

export function countPagesFromScrollWidth(scrollWidth, columnWidth, columnGap = 0, paddingInline = 0) {
  const totalWidth = Number(scrollWidth);
  const pageWidth = Number(columnWidth);
  const gap = Math.max(0, Number(columnGap) || 0);
  const padding = Math.max(0, Number(paddingInline) || 0);
  if (!Number.isFinite(totalWidth) || !Number.isFinite(pageWidth) || pageWidth <= 0) return 1;
  const contentWidth = Math.max(0, totalWidth - padding);
  const columnCount = Math.ceil((contentWidth + gap - .5) / (pageWidth + gap));
  return Math.max(1, columnCount);
}

export function startPageForSpread(page, pageCount, pagesPerSpread = 2) {
  const total = Math.max(1, Math.floor(Number(pageCount) || 1));
  const spreadSize = Math.max(1, Math.floor(Number(pagesPerSpread) || 1));
  const clampedPage = Math.min(total, Math.max(1, Math.floor(Number(page) || 1)));
  return Math.floor((clampedPage - 1) / spreadSize) * spreadSize + 1;
}

export function pageFromHash(hash, pageCount, pagesPerSpread = 2) {
  const total = Math.max(1, Math.floor(Number(pageCount) || 1));
  if (String(hash).toLowerCase() === '#fin') return startPageForSpread(total, total, pagesPerSpread);
  const match = String(hash).match(/^#p=(\d+)$/iu);
  if (!match) return 1;
  return startPageForSpread(Number(match[1]), total, pagesPerSpread);
}

export function columnPitchFromPositions(positions, fallbackWidth = 0, fallbackGap = 0) {
  const starts = [...new Set((Array.isArray(positions) ? positions : [])
    .map(Number)
    .filter(Number.isFinite)
    .map(value => Math.round(value * 100) / 100))].sort((a, b) => a - b);
  const pitches = starts.slice(1).map((start, index) => start - starts[index]).filter(pitch => pitch > 1);
  if (pitches.length) return Math.min(...pitches);
  const width = Number(fallbackWidth);
  const gap = Number(fallbackGap);
  return (Number.isFinite(width) && width > 0 ? width : 0) + (Number.isFinite(gap) && gap > 0 ? gap : 0);
}

export function columnOffsetFromPositions(positions, columnIndex, fallbackPitch = 0) {
  const index = Math.max(0, Math.floor(Number(columnIndex) || 0));
  const pitch = Math.max(0, Number(fallbackPitch) || 0);
  const starts = [...new Set((Array.isArray(positions) ? positions : [])
    .map(Number)
    .filter(Number.isFinite)
    .map(value => Math.round(value * 100) / 100))].sort((a, b) => a - b);
  return starts[index] !== undefined && starts[0] !== undefined
    ? starts[index] - starts[0]
    : index * pitch;
}

export function pageOffsetForSpread(page, columnPitch, pagesPerSpread = 2) {
  const spreadSize = Math.max(1, Math.floor(Number(pagesPerSpread) || 1));
  const currentPage = Math.max(1, Math.floor(Number(page) || 1));
  const pitch = Math.max(0, Number(columnPitch) || 0);
  const firstColumn = Math.floor((currentPage - 1) / spreadSize) * spreadSize;
  return firstColumn === 0 ? 0 : -firstColumn * pitch;
}

function inlineNodeLength(node) {
  if (!node || typeof node !== 'object') return 0;
  if (node.type === 'text') return String(node.text ?? '').length;
  return Array.isArray(node.children) ? node.children.reduce((total, child) => total + inlineNodeLength(child), 0) : 0;
}

function copyInlineElement(node, children) {
  return { ...node, attributes: { ...(node.attributes ?? {}) }, children };
}

function splitInlineNode(node, offset) {
  if (node?.type === 'text') {
    const text = String(node.text ?? '');
    const split = Math.max(0, Math.min(text.length, offset));
    return [
      split > 0 ? [{ ...node, text: text.slice(0, split) }] : [],
      split < text.length ? [{ ...node, text: text.slice(split) }] : [],
    ];
  }
  if (!node || node.type !== 'element' || !Array.isArray(node.children)) return [[], []];

  const left = [];
  const right = [];
  let consumed = 0;
  for (const child of node.children) {
    const childLength = inlineNodeLength(child);
    if (consumed + childLength <= offset) {
      if (childLength > 0) left.push(child);
    } else if (consumed >= offset) {
      if (childLength > 0) right.push(child);
    } else {
      const [childLeft, childRight] = splitInlineNode(child, offset - consumed);
      left.push(...childLeft);
      right.push(...childRight);
    }
    consumed += childLength;
  }
  return [
    left.length ? [copyInlineElement(node, left)] : [],
    right.length ? [copyInlineElement(node, right)] : [],
  ];
}

function inlineText(nodes) {
  return (Array.isArray(nodes) ? nodes : []).map(node => (
    node?.type === 'text' ? String(node.text ?? '') : inlineText(node?.children)
  )).join('');
}

export function splitInlineContentAtOffset(nodes, requestedOffset) {
  const source = Array.isArray(nodes) ? nodes : [];
  const text = inlineText(source);
  let offset = Math.max(0, Math.min(text.length, Math.floor(Number(requestedOffset) || 0)));
  if (offset > 0 && offset < text.length
    && /[\uD800-\uDBFF]/u.test(text[offset - 1]) && /[\uDC00-\uDFFF]/u.test(text[offset])) offset--;

  const left = [];
  const right = [];
  let consumed = 0;
  for (const node of source) {
    const nodeLength = inlineNodeLength(node);
    if (consumed + nodeLength <= offset) {
      if (nodeLength > 0) left.push(node);
    } else if (consumed >= offset) {
      if (nodeLength > 0) right.push(node);
    } else {
      const [nodeLeft, nodeRight] = splitInlineNode(node, offset - consumed);
      left.push(...nodeLeft);
      right.push(...nodeRight);
    }
    consumed += nodeLength;
  }
  return { left, right, offset };
}

export function choosePlateColumn(columnEnds, totalWords, defaultColumnIndex = 0) {
  const ends = (Array.isArray(columnEnds) ? columnEnds : [])
    .filter(end => end && Number.isInteger(end.columnIndex) && Number.isFinite(end.wordsBefore))
    .reduce((byColumn, end) => {
      const current = byColumn.get(end.columnIndex);
      if (!current || end.wordsBefore >= current.wordsBefore) byColumn.set(end.columnIndex, end);
      return byColumn;
    }, new Map());
  if (!ends.size) return null;

  const lastColumn = Math.max(...ends.keys());
  const midpoint = Math.max(0, Number(totalWords) || 0) / 2;
  const defaultColumn = Number.isInteger(defaultColumnIndex) ? defaultColumnIndex : 0;
  return [...ends.values()]
    .filter(end => end.columnIndex > 0 && end.columnIndex < lastColumn)
    .sort((left, right) => (
      Math.abs(left.wordsBefore - midpoint) - Math.abs(right.wordsBefore - midpoint)
      || Math.abs(left.columnIndex - defaultColumn) - Math.abs(right.columnIndex - defaultColumn)
      || left.columnIndex - right.columnIndex
    ))[0] ?? null;
}

export function shouldShowCover(hash, alreadyOpened = false) {
  const value = String(hash ?? '').toLowerCase();
  const hasReadingPosition = value.startsWith('#p=') || value === '#fin';
  return !hasReadingPosition && !alreadyOpened;
}

export function formatPageStatus(page, pageCount, desktopSpread = true) {
  const total = Math.max(1, Math.floor(Number(pageCount) || 1));
  const current = startPageForSpread(page, total, desktopSpread ? 2 : 1);
  if (!desktopSpread) return `Página ${current} de ${total}`;
  const last = Math.min(total, current + 1);
  if (last === current) return `Página ${current} de ${total}`;
  return `Páginas ${current}-${last} de ${total}`;
}

function isFormControl(target) {
  return target instanceof Element && Boolean(target.closest(
    'input, textarea, select, button, [contenteditable="true"], [role="textbox"]',
  ));
}

function hasSelection() {
  return Boolean(window.getSelection()?.toString());
}

export function readContinueRecord(raw) {
  if (raw === null || raw === '') return null;
  try {
    const parsed = JSON.parse(raw);
    if (Number.isInteger(parsed) && parsed > 0) return { chapter: parsed, page: 1 };
    if (parsed && typeof parsed === 'object') {
      const chapter = Number(parsed.c);
      const page = Number(parsed.p);
      if (Number.isInteger(chapter) && chapter > 0) {
        return { chapter, page: Number.isInteger(page) && page > 0 ? page : 1 };
      }
    }
  } catch {
    // Older values were stored as plain numeric strings.
  }
  const legacyChapter = Number(raw);
  return Number.isInteger(legacyChapter) && legacyChapter > 0
    ? { chapter: legacyChapter, page: 1 }
    : null;
}

export function chapterHref(chapterNumber) {
  return `/novela/kuroto/${String(chapterNumber).padStart(3, '0')}`;
}

function enhanceContinueLink() {
  const continueLink = document.querySelector('[data-continue-reading]');
  if (!continueLink) return;
  try {
    const record = readContinueRecord(window.localStorage.getItem('lichpol:kuroto:ultimo'));
    if (!record) return;
    const href = chapterHref(record.chapter);
    const chapterLink = [...document.querySelectorAll('[data-chapter-number]')]
      .find(link => Number(link.dataset.chapterNumber) === record.chapter && link.getAttribute('href') === href);
    if (!chapterLink) return;
    const title = chapterLink.querySelector('.novela-chapter-title')?.textContent?.trim() ?? '';
    continueLink.href = `${href}#p=${record.page}`;
    continueLink.textContent = `Continuar: Capítulo ${record.chapter} · ${title}`;
    continueLink.hidden = false;
  } catch {
    // The table of contents remains usable if storage is unavailable.
  }
}

function sourceParagraphIndex(paragraph, sourceParagraphs) {
  const directIndex = sourceParagraphs.indexOf(paragraph);
  if (directIndex >= 0) return directIndex;
  const sourceId = paragraph.dataset.splitFrom;
  return sourceId ? sourceParagraphs.findIndex(source => source.id === sourceId) : -1;
}

function getVisibleParagraphIndex(flow, book, pagesPerSpread, sourceParagraphs = [...flow.querySelectorAll(':scope > p')]) {
  const paragraphs = [...flow.querySelectorAll(':scope > p')];
  const bookRect = book.getBoundingClientRect();
  const pageWidth = bookRect.width / pagesPerSpread;
  const left = bookRect.left;
  const right = left + pageWidth;
  const top = bookRect.top;
  const bottom = bookRect.bottom;

  for (let index = 0; index < paragraphs.length; index++) {
    const rects = [...paragraphs[index].getClientRects()];
    if (rects.some(rect => rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom)) {
      const sourceIndex = sourceParagraphIndex(paragraphs[index], sourceParagraphs);
      if (sourceIndex >= 0) return sourceIndex;
    }
  }
  return 0;
}

function getColumnPositions(flow, columnWidth, columnGap, paddingLeft) {
  const pitch = Math.max(1, columnWidth + columnGap);
  const firstColumnLeft = flow.getBoundingClientRect().left + paddingLeft;
  const blocks = flow.querySelectorAll(':scope > header, :scope > p, :scope > .novela-scene-break, :scope > figure');
  let lastColumnIndex = 0;
  for (const block of blocks) {
    for (const rect of block.getClientRects()) {
      const index = Math.max(0, Math.round((rect.left - firstColumnLeft) / pitch));
      lastColumnIndex = Math.max(lastColumnIndex, index);
    }
  }
  return Array.from({ length: lastColumnIndex + 1 }, (_, index) => firstColumnLeft + index * pitch);
}

function pageForParagraph(flow, paragraphIndex, metrics, pageCount, pagesPerSpread, sourceParagraphs = null) {
  const paragraphs = sourceParagraphs ?? flow.querySelectorAll(':scope > p');
  const paragraph = paragraphs[paragraphIndex];
  if (!paragraph) return 1;
  const fragment = paragraph.getClientRects()[0];
  if (!fragment) return 1;
  const columnIndex = metrics.columnPositions.length
    ? metrics.columnPositions.reduce((nearestIndex, position, index, positions) => (
      Math.abs(position - fragment.left) < Math.abs(positions[nearestIndex] - fragment.left) ? index : nearestIndex
    ), 0)
    : Math.max(0, Math.round((fragment.left - flow.getBoundingClientRect().left - metrics.paddingLeft) / metrics.stride));
  return startPageForSpread(Math.min(pageCount, columnIndex + 1), pageCount, pagesPerSpread);
}

const OPEN_BOOK_SESSION_KEY = 'lichpol:kuroto:abierto';

function wasBookOpenedThisSession() {
  try {
    return window.sessionStorage.getItem(OPEN_BOOK_SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

function rememberBookOpened() {
  try {
    window.sessionStorage.setItem(OPEN_BOOK_SESSION_KEY, '1');
  } catch {
    // A blocked session store still gets the requested first-visit cover.
  }
}

function enhanceChapterReader() {
  const root = document.querySelector('[data-reader-root]');
  if (!root) return;

  const book = root.querySelector('[data-reader-book]');
  const viewport = root.querySelector('[data-reader-viewport]');
  const flow = root.querySelector('#novela-prose');
  const controls = root.querySelector('[data-page-controls]');
  const previousButton = root.querySelector('[data-page-previous]');
  const nextButton = root.querySelector('[data-page-next]');
  const pageStatus = root.querySelector('[data-page-status]');
  const liveRegion = root.querySelector('[data-reader-live]');
  const cover = root.querySelector('[data-reader-cover]');
  const coverButton = root.querySelector('[data-open-book]');
  const leftRunningHead = root.querySelector('[data-running-left]');
  const rightRunningHead = root.querySelector('[data-running-right]');
  const leftFolio = root.querySelector('[data-folio-left]');
  const rightFolio = root.querySelector('[data-folio-right]');
  const progress = document.querySelector('[data-reading-progress]');
  const progressFill = progress?.querySelector('span');
  if (!book || !viewport || !flow || !controls || !previousButton || !nextButton || !pageStatus) return;

  const plateFigure = flow.querySelector(':scope > figure[data-novela-plate]');
  const plateParagraphs = [...flow.querySelectorAll(':scope > p')];
  const plateDefaultPosition = plateFigure
    ? plateParagraphs.indexOf(plateFigure.previousElementSibling)
    : -1;
  const plateDefaultParagraph = plateDefaultPosition >= 0 ? plateParagraphs[plateDefaultPosition] : null;

  const chapterNumber = Number(document.body.dataset.chapterNumber);
  const previousHref = document.body.dataset.prevHref || '';
  const nextHref = document.body.dataset.nextHref || '';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isCovered = Boolean(cover && coverButton && shouldShowCover(window.location.hash, wasBookOpenedThisSession()));
  let isOpening = false;
  let isFlipping = false;
  if (isCovered) {
    cover.hidden = false;
    root.classList.add('is-covered');
    root.setAttribute('aria-label', 'Libro cerrado');
  }
  let pagesPerSpread = window.matchMedia('(min-width: 1024px)').matches ? 2 : 1;
  let pageCount = 1;
  let currentPage = 1;
  let currentAnchorIndex = 0;
  let platePage = 0;
  let plateSplit = null;
  let lastMetrics = { stride: 1, columnPositions: [] };
  let suppressClick = false;
  let startPointer = null;
  let resizeTimer = 0;
  let previousWidth = window.innerWidth;
  let previousHeight = window.innerHeight;
  let previousPagesPerSpread = pagesPerSpread;
  let repaginationPending = false;

  function measureFlowBlockMetrics() {
    const style = window.getComputedStyle(flow);
    const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
    const paddingRight = Number.parseFloat(style.paddingRight) || 0;
    const lineHeight = Number.parseFloat(style.lineHeight) || 24;
    return {
      paddingLeft,
      paddingRight,
      paddingTop: Number.parseFloat(style.paddingTop) || 0,
      paddingBottom: Number.parseFloat(style.paddingBottom) || 0,
      paddingBlock: (Number.parseFloat(style.paddingTop) || 0) + (Number.parseFloat(style.paddingBottom) || 0),
      lineHeight,
    };
  }

  function measureColumns() {
    const blockMetrics = measureFlowBlockMetrics();
    const style = window.getComputedStyle(flow);
    const columnGap = Number.parseFloat(style.columnGap) || 0;
    const declaredColumnWidth = Number.parseFloat(style.columnWidth);
    const columnWidth = Number.isFinite(declaredColumnWidth) && declaredColumnWidth > 0
      ? declaredColumnWidth
      : Math.max(1, book.clientWidth - blockMetrics.paddingLeft - blockMetrics.paddingRight);
    const columnPositions = getColumnPositions(flow, columnWidth, columnGap, blockMetrics.paddingLeft);
    const stride = columnPitchFromPositions(columnPositions, columnWidth, columnGap);
    return {
      ...blockMetrics,
      columnWidth,
      columnGap,
      stride,
      columnPositions,
    };
  }

  function countWords(text) {
    return String(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  }

  function columnIndexForRect(rect, metrics) {
    if (metrics.columnPositions.length) {
      return metrics.columnPositions.reduce((nearestIndex, position, index, positions) => (
        Math.abs(position - rect.left) < Math.abs(positions[nearestIndex] - rect.left) ? index : nearestIndex
      ), 0);
    }
    const firstColumnLeft = flow.getBoundingClientRect().left + metrics.paddingLeft;
    return Math.max(0, Math.round((rect.left - firstColumnLeft) / metrics.stride));
  }

  function inlineModelFromDom(node) {
    if (node.nodeType === 3) return { type: 'text', text: node.nodeValue ?? '' };
    if (node.nodeType !== 1) return null;
    return {
      type: 'element',
      tag: node.localName,
      attributes: Object.fromEntries([...node.attributes].map(attribute => [attribute.name, attribute.value])),
      children: [...node.childNodes].map(inlineModelFromDom).filter(Boolean),
    };
  }

  function inlineModelToDom(node) {
    if (node.type === 'text') return document.createTextNode(node.text);
    const element = document.createElement(node.tag);
    for (const [name, value] of Object.entries(node.attributes ?? {})) element.setAttribute(name, value);
    element.append(...node.children.map(inlineModelToDom));
    return element;
  }

  function lastTextOffsetInColumn(textNode, targetColumn, metrics, visibleColumns) {
    if (Math.max(...visibleColumns) <= targetColumn) return textNode.length;
    let low = 0;
    let high = textNode.length;
    let best = 0;
    const range = document.createRange();
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      range.setStart(textNode, 0);
      range.setEnd(textNode, middle);
      const rects = [...range.getClientRects()];
      const column = rects.length ? columnIndexForRect(rects[rects.length - 1], metrics) : null;
      if (column !== null && column <= targetColumn) {
        best = middle;
        low = middle + 1;
      } else {
        high = middle - 1;
      }
    }
    return best;
  }

  function measurePlateColumnEnds(metrics) {
    const endsByColumn = new Map();
    let flattenedText = '';
    for (const [paragraphIndex, paragraph] of plateParagraphs.entries()) {
      if (paragraphIndex > 0) flattenedText += '\n';
      const paragraphStart = flattenedText.length;
      flattenedText += paragraph.textContent ?? '';
      const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
      let localOffset = 0;
      let textNode;
      while ((textNode = walker.nextNode())) {
        const textNodeStart = localOffset;
        localOffset += textNode.nodeValue?.length ?? 0;
        if (!textNode.length) continue;
        const range = document.createRange();
        range.selectNodeContents(textNode);
        const rects = [...range.getClientRects()];
        if (!rects.length) continue;
        const visibleColumns = [...new Set(rects.map(rect => columnIndexForRect(rect, metrics)))];
        for (const columnIndex of visibleColumns) {
          const textOffset = lastTextOffsetInColumn(textNode, columnIndex, metrics, visibleColumns);
          if (!textOffset) continue;
          const globalOffset = paragraphStart + textNodeStart + textOffset;
          const candidate = {
            columnIndex,
            wordsBefore: countWords(flattenedText.slice(0, globalOffset)),
            paragraph,
            paragraphIndex,
            paragraphOffset: textNodeStart + textOffset,
          };
          const previous = endsByColumn.get(columnIndex);
          if (!previous || globalOffset >= previous.globalOffset) endsByColumn.set(columnIndex, { ...candidate, globalOffset });
        }
      }
      const sceneBreak = paragraph.nextElementSibling?.matches('.novela-scene-break')
        ? paragraph.nextElementSibling
        : null;
      if (sceneBreak) {
        const sceneRange = document.createRange();
        sceneRange.selectNodeContents(sceneBreak);
        const sceneRects = [...sceneRange.getClientRects()];
        const globalOffset = paragraphStart + (paragraph.textContent?.length ?? 0);
        for (const columnIndex of new Set(sceneRects.map(rect => columnIndexForRect(rect, metrics)))) {
          const candidate = {
            columnIndex,
            wordsBefore: countWords(flattenedText.slice(0, globalOffset)),
            paragraph,
            paragraphIndex,
            paragraphOffset: paragraph.textContent?.length ?? 0,
            sceneBreak,
          };
          const previous = endsByColumn.get(columnIndex);
          if (!previous || globalOffset >= previous.globalOffset) endsByColumn.set(columnIndex, { ...candidate, globalOffset });
        }
      }
    }
    return {
      ends: [...endsByColumn.values()].map(({ globalOffset, ...end }) => end),
      totalWords: countWords(flattenedText),
    };
  }

  function defaultPlateColumn(metrics) {
    const paragraph = plateParagraphs[plateDefaultPosition + 1] ?? plateDefaultParagraph;
    if (!paragraph) return 0;
    const range = document.createRange();
    range.selectNodeContents(paragraph);
    const rects = [...range.getClientRects()];
    return rects.length ? columnIndexForRect(rects[0], metrics) : 0;
  }

  function domIdForSplit(paragraphIndex) {
    const base = `novela-split-${chapterNumber}-${paragraphIndex + 1}`;
    let candidate = base;
    let suffix = 2;
    while (document.getElementById(candidate)) candidate = `${base}-${suffix++}`;
    return candidate;
  }

  function splitParagraphAtOffset(paragraph, paragraphIndex, requestedOffset) {
    const originalChildren = [...paragraph.childNodes];
    const model = originalChildren.map(inlineModelFromDom).filter(Boolean);
    const split = splitInlineContentAtOffset(model, requestedOffset);
    if (!split.left.length || !split.right.length) return false;

    const originalId = paragraph.hasAttribute('id') ? paragraph.id : null;
    const createdId = originalId === null;
    if (createdId) paragraph.id = domIdForSplit(paragraphIndex);
    const continuation = paragraph.cloneNode(false);
    continuation.removeAttribute('id');
    continuation.classList.add('novela-p--cont');
    continuation.dataset.splitFrom = paragraph.id;
    paragraph.replaceChildren(...split.left.map(inlineModelToDom));
    continuation.replaceChildren(...split.right.map(inlineModelToDom));
    paragraph.after(continuation);
    plateSplit = { paragraph, continuation, originalChildren, originalId, createdId };
    return true;
  }

  function mergePlateSplit() {
    if (!plateSplit) return;
    const { paragraph, continuation, originalChildren, originalId } = plateSplit;
    continuation.remove();
    paragraph.replaceChildren(...originalChildren);
    if (originalId === null) paragraph.removeAttribute('id');
    else paragraph.id = originalId;
    plateSplit = null;
  }

  function keepSceneBreaksWithFollowingParagraph(metrics) {
    let changed = false;
    for (const sceneBreak of flow.querySelectorAll(':scope > .novela-scene-break')) {
      const paragraph = sceneBreak.nextElementSibling;
      if (!paragraph?.matches('p')) continue;
      const sceneRect = sceneBreak.getClientRects()[0];
      const paragraphRect = paragraph.getClientRects()[0];
      if (!sceneRect || !paragraphRect) continue;
      if (columnIndexForRect(paragraphRect, metrics) <= columnIndexForRect(sceneRect, metrics)) continue;
      if (!sceneBreak.classList.contains('novela-scene-break--keep-with-next')) {
        sceneBreak.classList.add('novela-scene-break--keep-with-next');
        changed = true;
      }
    }
    return changed;
  }

  function placePlateAtDefault() {
    if (!plateFigure) return;
    if (plateDefaultParagraph) plateDefaultParagraph.after(plateFigure);
    else flow.append(plateFigure);
  }

  function placePlateAtColumnEnd(end) {
    if (!plateFigure || !end?.paragraph) return false;
    if (end.sceneBreak) {
      end.paragraph.after(plateFigure);
      return true;
    }
    const paragraphText = end.paragraph.textContent ?? '';
    const remainder = paragraphText.slice(end.paragraphOffset);
    const atParagraphEnd = !remainder.trim();
    if (!atParagraphEnd) splitParagraphAtOffset(end.paragraph, end.paragraphIndex, end.paragraphOffset);
    end.paragraph.after(plateFigure);
    return true;
  }

  function sizeBookForViewport() {
    const controlsStyle = window.getComputedStyle(controls);
    const controlsHeight = Math.max(
      controls.getBoundingClientRect().height,
      Number.parseFloat(controlsStyle.minHeight) || 0,
    );
    const rootStyle = window.getComputedStyle(root);
    const bottomClearance = Number.parseFloat(rootStyle.getPropertyValue('--novela-reader-bottom-clearance')) || 16;
    const documentTop = book.getBoundingClientRect().top + window.scrollY;
    const availableHeight = Math.max(0, window.innerHeight - documentTop - controlsHeight - bottomClearance);
    const width = book.clientWidth;
    const preferredHeight = pagesPerSpread === 2
      ? Math.max(width * .61, Math.min(width * .69, availableHeight))
      : Math.min(width * 1.75, availableHeight);
    book.style.height = `${Math.min(availableHeight, preferredHeight)}px`;
  }

  function updateProgress() {
    const lastVisiblePage = Math.min(pageCount, currentPage + pagesPerSpread - 1);
    const ratio = pageCount > 0 ? lastVisiblePage / pageCount : 0;
    if (progressFill) progressFill.style.transform = `scaleX(${ratio})`;
    if (progress) progress.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
  }

  function writePageHash() {
    const nextHash = `#p=${currentPage}`;
    if (window.location.hash === nextHash) return;
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${nextHash}`);
  }

  function saveLastRead() {
    try {
      window.localStorage.setItem('lichpol:kuroto:ultimo', JSON.stringify({ c: chapterNumber, p: currentPage }));
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
  }

  function setPage(requestedPage, { writeHash = true, save = true } = {}) {
    currentPage = startPageForSpread(requestedPage, pageCount, pagesPerSpread);
    flow.style.setProperty('--reader-offset', `${pageOffsetForSpread(currentPage, lastMetrics.stride, pagesPerSpread)}px`);
    const progressRatio = pageCount > 1 ? (currentPage - 1) / (pageCount - 1) : 0;
    const stackRange = pagesPerSpread === 1 ? 2 : 8;
    const minimumStack = pagesPerSpread === 1 ? 6 : 20;
    book.style.setProperty('--reader-stack-left', `${(minimumStack + progressRatio * stackRange).toFixed(1)}px`);
    book.style.setProperty('--reader-stack-right', `${(minimumStack + (1 - progressRatio) * stackRange).toFixed(1)}px`);
    book.style.setProperty('--reader-stack-bottom', `${(18 + progressRatio * 2).toFixed(1)}px`);
    book.classList.toggle('is-first-spread', currentPage === 1);
    const plateInSpread = platePage > 0 && platePage >= currentPage && platePage < currentPage + pagesPerSpread;
    book.classList.toggle('is-plate-spread', plateInSpread);
    if (leftRunningHead) {
      const leftPage = currentPage;
      leftRunningHead.style.visibility = pagesPerSpread === 2 && leftPage > 1 && !plateInSpread ? 'visible' : 'hidden';
    }
    if (rightRunningHead) {
      const rightPage = pagesPerSpread === 2 ? currentPage + 1 : currentPage;
      rightRunningHead.style.visibility = rightPage <= pageCount && rightPage > 1 && !plateInSpread ? 'visible' : 'hidden';
    }
    pageStatus.textContent = formatPageStatus(currentPage, pageCount, pagesPerSpread === 2);
    if (leftFolio) leftFolio.textContent = String(currentPage);
    if (rightFolio) {
      const rightPage = currentPage + 1;
      rightFolio.hidden = pagesPerSpread !== 2 || rightPage > pageCount;
      rightFolio.textContent = String(rightPage);
    }
    previousButton.disabled = currentPage === 1 && !previousHref;
    nextButton.disabled = currentPage + pagesPerSpread > pageCount && !nextHref;
    updateProgress();
    if (writeHash) writePageHash();
    if (save) saveLastRead();
    if (!repaginationPending && !isFlipping) {
      window.requestAnimationFrame(() => {
        if (!repaginationPending && !isFlipping) currentAnchorIndex = getVisibleParagraphIndex(flow, book, pagesPerSpread, plateParagraphs);
      });
    }
  }

  function navigateChapter(direction) {
    const destination = direction === 'previous' ? previousHref : nextHref;
    if (!destination) return false;
    const url = new URL(destination, window.location.href);
    if (direction === 'previous' && chapterNumber > 1) url.hash = 'fin';
    rememberBookOpened();
    window.location.assign(url.href);
    return true;
  }

  function openBook() {
    if (!isCovered || isOpening || !cover || !coverButton) return;
    isOpening = true;
    rememberBookOpened();
    coverButton.disabled = true;
    const duration = reducedMotion ? 200 : 1120;
    root.classList.add(reducedMotion ? 'is-cover-fading' : 'is-cover-opening');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cover.hidden = true;
      coverButton.disabled = false;
      root.classList.remove('is-covered', 'is-cover-opening', 'is-cover-fading');
      root.setAttribute('aria-label', 'Libro abierto');
      isCovered = false;
      isOpening = false;
      controls.hidden = false;
      if (progress) progress.hidden = false;
      if (liveRegion) liveRegion.textContent = 'Libro abierto';
      writePageHash();
      nextButton.focus({ preventScroll: true });
    };
    coverButton.addEventListener('transitionend', event => {
      if (event.target === coverButton && (event.propertyName === 'transform' || event.propertyName === 'opacity')) finish();
    }, { once: true });
    window.setTimeout(finish, duration + 80);
  }

  function makeFlipFace(pageNumber, side, metrics) {
    const face = document.createElement('div');
    const leftPage = pagesPerSpread === 2 && pageNumber % 2 === 1;
    face.className = `novela-reader__flip-face novela-reader__flip-face--${side}${leftPage ? ' novela-reader__flip-face--left-page' : ''}`;
    const clone = flow.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    clone.classList.add('novela-reader__flip-copy');
    const pageColumn = Math.max(0, pageNumber - 1);
    const isRightPage = pagesPerSpread === 2 && pageNumber % 2 === 0;
    const desiredTextLeft = pagesPerSpread === 1 || !isRightPage
      ? metrics.paddingLeft
      : metrics.columnGap / 2;
    const sourceColumnOffset = columnOffsetFromPositions(metrics.columnPositions, pageColumn, metrics.stride);
    const cloneLeft = desiredTextLeft - metrics.paddingLeft - sourceColumnOffset;
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = `${cloneLeft}px`;
    const flowRect = flow.getBoundingClientRect();
    clone.style.width = `${flowRect.width}px`;
    clone.style.height = `${flowRect.height}px`;
    clone.style.maxWidth = 'none';
    clone.style.margin = '0';
    clone.style.setProperty('--reader-offset', '0px');
    clone.style.transform = 'none';
    clone.style.transition = 'none';
    face.append(clone);
    return face;
  }

  function animatePageFlip(direction, targetPage) {
    if (reducedMotion) {
      setPage(targetPage);
      return;
    }
    isFlipping = true;
    const forward = direction === 'next';
    const leaf = document.createElement('div');
    leaf.className = `novela-reader__flip-leaf novela-reader__flip-leaf--${forward ? 'forward' : 'backward'}${pagesPerSpread === 1 ? ' is-single-page' : ''}`;
    leaf.setAttribute('aria-hidden', 'true');
    leaf.inert = true;
    const frontPage = forward ? currentPage + pagesPerSpread - 1 : currentPage;
    const backPage = forward ? targetPage : targetPage + (pagesPerSpread === 2 ? 1 : 0);
    leaf.append(makeFlipFace(frontPage, 'front', lastMetrics), makeFlipFace(backPage, 'back', lastMetrics));
    leaf.style.willChange = 'transform';
    viewport.append(leaf);
    setPage(targetPage);
    leaf.getBoundingClientRect();

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      leaf.remove();
      isFlipping = false;
      currentAnchorIndex = getVisibleParagraphIndex(flow, book, pagesPerSpread, plateParagraphs);
    };
    leaf.addEventListener('transitionend', event => {
      if (event.target === leaf && event.propertyName === 'transform') finish();
    });
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        leaf.classList.add('is-turning');
        leaf.style.willChange = 'transform';
      });
    });
    window.setTimeout(finish, 820);
  }

  function turn(direction) {
    if (isCovered || isOpening || isFlipping) return;
    const delta = direction === 'next' ? pagesPerSpread : -pagesPerSpread;
    const target = currentPage + delta;
    if (target < 1) {
      navigateChapter('previous');
      return;
    }
    if (target > pageCount) {
      navigateChapter('next');
      return;
    }
    animatePageFlip(direction, target);
  }

  function reflow({ preserveAnchor = true, initialHash = '' } = {}) {
    const anchorIndex = repaginationPending
      ? currentAnchorIndex
      : getVisibleParagraphIndex(flow, book, pagesPerSpread, plateParagraphs);
    mergePlateSplit();
    plateFigure?.remove();
    flow.querySelectorAll(':scope > .novela-scene-break--keep-with-next')
      .forEach(sceneBreak => sceneBreak.classList.remove('novela-scene-break--keep-with-next'));
    pagesPerSpread = window.matchMedia('(min-width: 1024px)').matches ? 2 : 1;
    flow.style.transition = 'none';
    flow.style.opacity = '1';
    flow.style.setProperty('--reader-offset', '0px');
    flow.style.height = '100%';
    resizeFlowHeightToBook({
      sizeBook: sizeBookForViewport,
      book,
      flow,
      measureBlockMetrics: measureFlowBlockMetrics,
    });
    flow.getBoundingClientRect();
    let metrics = measureColumns();
    lastMetrics = metrics;
    if (plateFigure) {
      const { ends, totalWords } = measurePlateColumnEnds(metrics);
      const targetEnd = choosePlateColumn(ends, totalWords, defaultPlateColumn(metrics));
      if (targetEnd) placePlateAtColumnEnd(targetEnd);
      else placePlateAtDefault();
      flow.getBoundingClientRect();
    }
    metrics = measureColumns();
    const sceneBreakCount = flow.querySelectorAll(':scope > .novela-scene-break').length;
    for (let attempt = 0; attempt <= sceneBreakCount; attempt++) {
      if (!keepSceneBreaksWithFollowingParagraph(metrics)) break;
      flow.getBoundingClientRect();
      metrics = measureColumns();
    }
    lastMetrics = metrics;
    pageCount = countPagesFromScrollWidth(flow.scrollWidth, metrics.columnWidth, metrics.columnGap, metrics.paddingLeft + metrics.paddingRight);
    const plateRect = plateFigure?.getClientRects()[0];
    if (plateRect) {
      const firstColumnLeft = flow.getBoundingClientRect().left + metrics.paddingLeft;
      platePage = Math.max(1, Math.round((plateRect.left - firstColumnLeft) / metrics.stride) + 1);
    } else {
      platePage = 0;
    }

    let targetPage;
    if (initialHash !== null) {
      targetPage = pageFromHash(initialHash, pageCount, pagesPerSpread);
    } else if (preserveAnchor) {
      targetPage = pageForParagraph(flow, anchorIndex, metrics, pageCount, pagesPerSpread, plateParagraphs);
    } else {
      targetPage = Math.min(currentPage, pageCount);
    }
    setPage(targetPage, { writeHash: !isCovered && (initialHash === '' || initialHash === null), save: true });
    if (progress) progress.hidden = false;
    controls.hidden = isCovered;
    if (progress) progress.hidden = isCovered;
    root.classList.remove('is-paginating');
    window.requestAnimationFrame(() => {
      flow.style.transition = '';
      repaginationPending = false;
      currentAnchorIndex = preserveAnchor && initialHash === null
        ? anchorIndex
        : getVisibleParagraphIndex(flow, book, pagesPerSpread, plateParagraphs);
    });
  }

  root.classList.add('is-paginating', 'is-paginated');
  window.requestAnimationFrame(() => reflow({ preserveAnchor: false, initialHash: window.location.hash }));

  previousButton.addEventListener('click', () => turn('previous'));
  nextButton.addEventListener('click', () => turn('next'));
  coverButton?.addEventListener('click', openBook);
  root.querySelector('.novela-pagination')?.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('a[rel="prev"], a[rel="next"]') : null;
    if (target) rememberBookOpened();
  });

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || isFormControl(event.target)) return;
    if (!['ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown'].includes(event.key)) return;
    event.preventDefault();
    turn(event.key === 'ArrowLeft' || event.key === 'PageUp' ? 'previous' : 'next');
  });

  viewport.addEventListener('click', event => {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    const target = event.target instanceof Element ? event.target : null;
    if (hasSelection() || target?.closest('a, button, input, select, textarea')) return;
    const bounds = book.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const width = bounds.width;
    if (pagesPerSpread === 2) {
      if (x < width * .25) turn('previous');
      else if (x > width * .75) turn('next');
    } else if (x < width * .25) {
      turn('previous');
    } else if (x > width * .75) {
      turn('next');
    }
  });

  viewport.addEventListener('pointerdown', event => {
    if (event.button !== undefined && event.button !== 0) return;
    startPointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }, { passive: true });

  viewport.addEventListener('pointerup', event => {
    if (!startPointer || event.pointerId !== startPointer.id) return;
    const deltaX = event.clientX - startPointer.x;
    const deltaY = event.clientY - startPointer.y;
    startPointer = null;
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2 || hasSelection()) return;
    suppressClick = true;
    window.setTimeout(() => { suppressClick = false; }, 500);
    turn(deltaX < 0 ? 'next' : 'previous');
  }, { passive: true });

  viewport.addEventListener('pointercancel', () => { startPointer = null; }, { passive: true });

  window.addEventListener('hashchange', () => {
    const targetPage = pageFromHash(window.location.hash, pageCount, pagesPerSpread);
    setPage(targetPage, { writeHash: false, save: true });
  });

  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const widthChanged = Math.abs(width - previousWidth) >= 1;
    const nextPagesPerSpread = window.matchMedia('(min-width: 1024px)').matches ? 2 : 1;
    const breakpointChanged = nextPagesPerSpread !== previousPagesPerSpread;
    const heightDelta = Math.abs(height - previousHeight);
    previousWidth = width;
    previousHeight = height;
    previousPagesPerSpread = nextPagesPerSpread;
    if (!shouldRecomputeReaderHeight(widthChanged, breakpointChanged, heightDelta)) return;
    // Keep the last stable page anchor; responsive CSS may already have changed by this event.
    repaginationPending = true;
    root.classList.add('is-paginating');
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => reflow({ preserveAnchor: true, initialHash: null }), 180);
  }, { passive: true });
}

if (typeof document !== 'undefined') {
  enhanceContinueLink();
  if (document.querySelector('[data-reader-root]')) {
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => enhanceChapterReader());
  }
}
