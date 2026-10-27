import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, '..');
const SOURCE_DIRECTORY = path.join(REPOSITORY_ROOT, 'kuroto-novela');
const CAMPAIGN_PLAYLIST = 'https://www.youtube.com/playlist?list=PLelQK3I2Q5zymJZ2e2SNmwxsnnFGjBCYb';
const OG_COVER = 'https://lichpol.vercel.app/assets/kuroto.webp';

const HTML_ENTITIES = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
});

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/gu, character => HTML_ENTITIES[character]);
}

function parseYamlScalar(rawValue) {
  const value = rawValue.trim();
  if (!value) return '';
  if (value === '[]') return [];
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null' || value === '~') return null;
  if (/^-?\d+(?:\.\d+)?$/u.test(value)) return Number(value);
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1).replace(/\\"/gu, '"').replace(/\\\\/gu, '\\');
    }
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/gu, "'");
  }
  return value;
}

export function parseFrontMatter(source) {
  const normalized = String(source).replace(/^\uFEFF/u, '').replace(/\r\n?/gu, '\n');
  const lines = normalized.split('\n');
  if (lines[0]?.trim() !== '---') {
    throw new Error('front matter must begin with --- on the first line');
  }

  const closingLine = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (closingLine === -1) throw new Error('front matter is missing its closing --- line');

  const metadata = {};
  for (const [offset, line] of lines.slice(1, closingLine).entries()) {
    if (!line.trim()) continue;
    const match = line.match(/^([A-Za-z_][\w-]*):(?:\s*(.*))?$/u);
    if (!match) {
      throw new Error(`invalid front matter field on line ${offset + 2}: ${line}`);
    }
    metadata[match[1]] = parseYamlScalar(match[2] ?? '');
  }

  return {
    metadata,
    body: lines.slice(closingLine + 1).join('\n').replace(/^\n/u, ''),
  };
}

function convertEscapedItalics(escapedText) {
  const html = escapedText.replace(/\*([^*\r\n]+)\*/gu, '<em>$1</em>');
  if (html.includes('*')) throw new Error('unbalanced * marker after italic conversion');
  return html;
}

export function markdownToHtml(markdown) {
  const lines = String(markdown).replace(/\r\n?/gu, '\n').split('\n');
  const blocks = [];
  let paragraph = [];

  const flushParagraph = () => {
    const text = paragraph.join(' ').replace(/\s+/gu, ' ').trim();
    paragraph = [];
    if (!text) return;
    blocks.push(`<p>${convertEscapedItalics(escapeHtml(text))}</p>`);
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '* * *') {
      flushParagraph();
      blocks.push('<div class="novela-scene-break" role="separator" aria-label="Cambio de escena"><span aria-hidden="true">✦</span></div>');
      continue;
    }
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    paragraph.push(trimmed);
  }
  flushParagraph();
  return blocks.join('\n');
}

function countHtmlWords(markup) {
  const text = String(markup)
    .replace(/<[^>]*>/gu, ' ')
    .replace(/&(?:amp|lt|gt|quot|#39|#\d+|#x[\da-f]+);/giu, ' ');
  return text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

export function insertPlateAtParagraphMidpoint(proseHtml, plate) {
  if (!plate || !/^lamina-\d{3}\.webp$/u.test(String(plate.archivo ?? ''))
    || typeof plate.alt !== 'string' || !plate.alt.trim()
    || typeof plate.pie !== 'string' || !plate.pie.trim()) return String(proseHtml);

  const blocks = String(proseHtml).split('\n');
  const paragraphIndices = blocks
    .map((block, index) => block.startsWith('<p>') && block.endsWith('</p>') ? index : -1)
    .filter(index => index >= 0);
  if (!paragraphIndices.length) return String(proseHtml);

  const totalWords = paragraphIndices.reduce((sum, index) => sum + countHtmlWords(blocks[index]), 0);
  const midpoint = totalWords / 2;
  let wordsBefore = 0;
  let closestParagraph = paragraphIndices[0];
  let closestDistance = Number.POSITIVE_INFINITY;
  for (const index of paragraphIndices) {
    wordsBefore += countHtmlWords(blocks[index]);
    const precedesSceneBreak = blocks[index + 1]?.includes('novela-scene-break') ?? false;
    if (precedesSceneBreak) continue;
    const distance = Math.abs(wordsBefore - midpoint);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestParagraph = index;
    }
  }

  const figure = `<figure class="novela-plate" data-novela-plate><img src="../../assets/novela/${escapeHtml(plate.archivo)}" alt="${escapeHtml(plate.alt.trim())}" width="1200" height="1600" loading="lazy"><figcaption>${escapeHtml(plate.pie.trim())}</figcaption></figure>`;
  blocks.splice(closestParagraph + 1, 0, figure);
  return blocks.join('\n');
}

// Keep the previous named export available to callers that used the old helper.
export const insertPlateAtClosestSceneBreak = insertPlateAtParagraphMidpoint;

function getHeadingLines(body) {
  return String(body).replace(/\r\n?/gu, '\n').split('\n')
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.startsWith('# '));
}

export function validateChapterSource({ source, entry, filename }) {
  const errors = [];
  const fileNumberMatch = path.basename(filename ?? '').match(/^(\d{3})\.md$/u);
  const fileNumber = fileNumberMatch ? Number(fileNumberMatch[1]) : null;
  const displayFile = filename ?? 'chapter source';

  if (!fileNumberMatch) errors.push(`${displayFile}: filename must be NNN.md`);

  let parsed;
  try {
    parsed = parseFrontMatter(source);
  } catch (error) {
    errors.push(`${displayFile}: ${error.message}`);
    return errors;
  }

  const { metadata, body } = parsed;
  if (!Number.isInteger(metadata.capitulo)) {
    errors.push(`${displayFile}: front matter capitulo must be an integer`);
  } else {
    if (fileNumber !== null && metadata.capitulo !== fileNumber) {
      errors.push(`${displayFile}: capitulo ${metadata.capitulo} does not match filename number ${fileNumber}`);
    }
    if (entry && metadata.capitulo !== entry.numero) {
      errors.push(`${displayFile}: capitulo ${metadata.capitulo} does not match indice.json number ${entry.numero}`);
    }
  }

  const headings = getHeadingLines(body);
  if (headings.length !== 1) {
    errors.push(`${displayFile}: expected exactly one # title line, found ${headings.length}`);
  } else {
    const title = headings[0].line.slice(2).trim();
    if (typeof metadata.titulo !== 'string' || title !== metadata.titulo) {
      errors.push(`${displayFile}: # title does not match front matter titulo`);
    }
  }

  const lines = body.replace(/\r\n?/gu, '\n').split('\n');
  for (let index = 0; index < lines.length; index++) {
    if (lines[index].includes('* * *') && lines[index].trim() !== '* * *') {
      errors.push(`${displayFile}:${index + 1}: * * * must appear alone on its line`);
    }
  }

  const prose = lines.filter(line => !line.startsWith('# ')).join('\n').trim();
  const proseWithoutBreaks = prose.split('\n').filter(line => line.trim() !== '* * *').join('\n').trim();
  if (!proseWithoutBreaks) errors.push(`${displayFile}: chapter body is empty`);

  if (proseWithoutBreaks) {
    try {
      markdownToHtml(proseWithoutBreaks);
    } catch (error) {
      errors.push(`${displayFile}: ${error.message}`);
    }
  }
  return errors;
}

function safeChapterPath(chapterPath, sourceRoot = SOURCE_DIRECTORY) {
  if (typeof chapterPath !== 'string' || !chapterPath.startsWith('capitulos/')) return null;
  const resolved = path.resolve(sourceRoot, chapterPath);
  const relative = path.relative(path.join(sourceRoot, 'capitulos'), resolved);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative) ? resolved : null;
}

export async function validateNovelSources(root = REPOSITORY_ROOT) {
  const sourceRoot = path.join(root, 'kuroto-novela');
  const chapterRoot = path.join(sourceRoot, 'capitulos');
  const errors = [];
  let index;
  try {
    index = JSON.parse(await readFile(path.join(sourceRoot, 'indice.json'), 'utf8'));
  } catch (error) {
    return { errors: [`kuroto-novela/indice.json: ${error.message}`], chapters: [], index: null };
  }

  const entries = Array.isArray(index.capitulos) ? index.capitulos : [];
  const books = Array.isArray(index.libros) ? index.libros : [];
  if (!Array.isArray(index.capitulos)) errors.push('kuroto-novela/indice.json: capitulos must be an array');
  if (!Array.isArray(index.libros)) errors.push('kuroto-novela/indice.json: libros must be an array');

  const entriesByPath = new Map();
  const entriesByNumber = new Map();
  for (const entry of entries) {
    if (!Number.isInteger(entry.numero)) {
      errors.push(`kuroto-novela/indice.json: chapter has invalid numero ${String(entry.numero)}`);
      continue;
    }
    if (entriesByNumber.has(entry.numero)) {
      errors.push(`kuroto-novela/indice.json: duplicate chapter numero ${entry.numero}`);
    }
    entriesByNumber.set(entry.numero, entry);
    const resolved = safeChapterPath(entry.archivo, sourceRoot);
    if (!resolved) {
      errors.push(`kuroto-novela/indice.json: unsafe or invalid archivo for chapter ${entry.numero}: ${String(entry.archivo)}`);
      continue;
    }
    const key = path.relative(chapterRoot, resolved).replaceAll(path.sep, '/');
    if (entriesByPath.has(key)) errors.push(`kuroto-novela/indice.json: duplicate archivo ${entry.archivo}`);
    entriesByPath.set(key, entry);
  }

  let filenames;
  try {
    filenames = await readdir(chapterRoot);
  } catch (error) {
    return { errors: [...errors, `kuroto-novela/capitulos: ${error.message}`], chapters: [], index };
  }
  const chapterFiles = filenames.filter(filename => filename.toLowerCase().endsWith('.md'));
  const validated = [];
  for (const filename of chapterFiles) {
    const relativePath = `capitulos/${filename}`;
    const fullPath = path.join(chapterRoot, filename);
    if (!/^\d{3}\.md$/iu.test(filename)) {
      errors.push(`${relativePath}: filename must be NNN.md`);
      continue;
    }
    const fileNumber = Number(filename.slice(0, 3));
    const entry = entriesByPath.get(filename);
    const numberEntry = entriesByNumber.get(fileNumber);
    if (!entry) errors.push(`${relativePath}: no matching archivo in indice.json`);
    if (!numberEntry) errors.push(`${relativePath}: chapter ${fileNumber} is missing from indice.json`);
    if (entry && numberEntry && entry !== numberEntry) {
      errors.push(`${relativePath}: archivo and numero in indice.json point to different chapter entries`);
    }

    const source = await readFile(fullPath, 'utf8');
    errors.push(...validateChapterSource({ source, entry: numberEntry, filename }));
    if (numberEntry) {
      try {
        const parsed = parseFrontMatter(source);
        validated.push({ ...numberEntry, interludio: numberEntry.interludio === true, source, body: parsed.body, metadata: parsed.metadata, filename });
      } catch {
        // The parsing error is already included in the validation list above.
      }
    }
  }

  for (const entry of entries) {
    const resolved = safeChapterPath(entry.archivo, sourceRoot);
    if (!resolved) continue;
    try {
      await readFile(resolved);
    } catch {
      errors.push(`kuroto-novela/indice.json: missing file ${entry.archivo} for chapter ${entry.numero}`);
    }
  }

  const numericChapterNumbers = chapterFiles
    .filter(filename => /^\d{3}\.md$/iu.test(filename))
    .map(filename => Number(filename.slice(0, 3)));
  const expectedNumbers = new Set(entries.map(entry => entry.numero));
  for (const entry of entries) {
    if (!numericChapterNumbers.includes(entry.numero)) {
      errors.push(`kuroto-novela/indice.json: chapter ${entry.numero} has no source file`);
    }
  }
  for (const number of numericChapterNumbers) {
    if (!expectedNumbers.has(number)) errors.push(`kuroto-novela/capitulos/${String(number).padStart(3, '0')}.md: no matching indice.json chapter`);
  }

  validated.sort((a, b) => a.numero - b.numero);
  return { errors, chapters: validated, index: { ...index, libros: books, capitulos: entries } };
}

export function truncateAtWordBoundary(value, maximumLength = 150) {
  const normalized = String(value).replace(/\s+/gu, ' ').trim();
  if (normalized.length <= maximumLength) return normalized;
  const prefix = normalized.slice(0, maximumLength + 1);
  const boundary = prefix.lastIndexOf(' ');
  const clipped = (boundary > 0 ? prefix.slice(0, boundary) : prefix.slice(0, maximumLength)).trimEnd();
  return `${clipped}…`;
}

function getProse(body) {
  return String(body).replace(/\r\n?/gu, '\n')
    .split('\n')
    .filter(line => !line.startsWith('# '))
    .join('\n')
    .trim();
}

function getPlainDescription(body) {
  const text = getProse(body)
    .replace(/^\s*\* \* \*\s*$/gmu, ' ')
    .replace(/\*([^*\r\n]+)\*/gu, '$1')
    .replace(/\s+/gu, ' ')
    .trim();
  return truncateAtWordBoundary(text, 150);
}

export function toRoman(number) {
  if (!Number.isInteger(number) || number < 1 || number > 3999) throw new RangeError('Roman numerals require an integer from 1 to 3999');
  const numerals = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let remaining = number;
  let output = '';
  for (const [value, numeral] of numerals) {
    while (remaining >= value) {
      output += numeral;
      remaining -= value;
    }
  }
  return output;
}

function pageHead({ title, description, preloadStoryFont = false }) {
  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);
  return `<!doctype html>
<html lang="es" class="novela-html">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0D0D0E">
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDescription}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDescription}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="es_ES">
  <meta property="og:image" content="${OG_COVER}">
  <meta property="og:image:alt" content="Portada de Aventuras en Kuroto: monte nevado y cerezos en flor en estilo de grabado japonés">
  <link rel="icon" type="image/svg+xml" href="../../assets/lichpol-logo-color.svg">
  ${preloadStoryFont ? '<link rel="preload" as="font" type="font/woff2" crossorigin href="../../assets/fonts/alegreya-latin-400-normal.woff2">' : ''}
  <link rel="stylesheet" href="../../css/tokens.css">
  <link rel="stylesheet" href="../../css/site.css">
  <link rel="stylesheet" href="../../css/home.css">
  <link rel="stylesheet" href="../../css/novela.css">
  <script defer src="../../js/site.js"></script>
  <script type="module" src="../../js/novela.js"></script>
  <script type="module" src="../../js/ambience.js"></script>
</head>`;
}

function renderIcon(name, classes = 'icon') {
  return `<svg class="${classes}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
}

export function renderSharedHeader() {
  return `  <!-- Iconos: sprite de la cabecera Lichpol. -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
    <symbol id="i-twitch" viewBox="0 0 2400 2800" fill="currentColor"><path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z"/><path d="M1700 550h200v600h-200zm-550 0h200v600h-200z"/></symbol>
    <symbol id="i-youtube" viewBox="0 0 256 180" fill="currentColor"><path fill-rule="evenodd" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134ZM102.421 128.06l66.328-38.418-66.328-38.418z"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H18C18.4142 5.25 18.75 5.58579 18.75 6V15C18.75 15.4142 18.4142 15.75 18 15.75C17.5858 15.75 17.25 15.4142 17.25 15V7.81066L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303L5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L16.1893 6.75H9Z" fill="currentColor"/></symbol>
    <symbol id="i-speaker-off" viewBox="0 0 24 24" fill="none"><path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
    <symbol id="i-speaker-on" viewBox="0 0 24 24" fill="none"><path d="M11 5 6 9H3v6h3l5 4V5Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></symbol>
  </svg>
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <header class="site-header home-header">
    <div class="container header-inner">
      <a class="brand" href="../../index.html" aria-label="Lichpol, The Arcane Tavern: inicio">
        <img src="../../assets/lichpol-logo-white.svg" alt="" width="48" height="48">
        <span class="brand-stack"><strong>LICHPOL</strong><small>THE ARCANE TAVERN</small></span>
      </a>
      <div class="header-controls">
        <button class="ambience-switch" type="button" role="switch" aria-checked="false" aria-label="Música de ambiente" aria-busy="false" hidden>
          <span class="ambience-switch__track" aria-hidden="true"><span class="ambience-switch__knob">
            <svg class="icon ambience-switch__icon ambience-switch__icon--off" focusable="false"><use href="#i-speaker-off"/></svg>
            <svg class="icon ambience-switch__icon ambience-switch__icon--on" focusable="false"><use href="#i-speaker-on"/></svg>
          </span></span>
        </button>
        <a class="btn btn-primary btn-sm header-cta" href="https://www.twitch.tv/lichpol_gamer" target="_blank" rel="noopener noreferrer">
          ${renderIcon('twitch', 'icon icon--twitch')} Ver en Twitch ${renderIcon('external', 'icon icon--external')}<span class="visually-hidden">(se abre en una pestaña nueva)</span>
        </a>
        <button class="menu-toggle" type="button" data-menu-toggle aria-controls="main-menu" aria-expanded="false" aria-label="Abrir menú">☰</button>
      </div>
      <nav class="site-nav" id="main-menu" aria-label="Navegación principal">
        <details class="nav-group">
          <summary>La Taberna <svg class="icon nav-group__chevron" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
          <ul class="nav-group__panel">
            <li><a href="../../index.html#dungeon-master">El Dungeon Master</a></li>
            <li><a href="../../index.html#campanas">Campañas</a></li>
            <li><a href="../../index.html#cronicas">Crónicas</a></li>
            <li><a href="../../index.html#comunidad">Comunidad</a></li>
          </ul>
        </details>
        <div class="nav-mobile-group">
          <p class="nav-drawer-label">La Taberna</p>
          <ul class="nav-mobile-links">
            <li><a href="../../index.html#dungeon-master">El Dungeon Master</a></li>
            <li><a href="../../index.html#campanas">Campañas</a></li>
            <li><a href="../../index.html#cronicas">Crónicas</a></li>
            <li><a href="../../index.html#comunidad">Comunidad</a></li>
          </ul>
        </div>
        <a class="nav-adventure" href="https://khr0mz.github.io/arghast/" target="_blank" rel="noopener noreferrer">Aventuras ${renderIcon('external', 'icon icon--external')}<span class="visually-hidden">(se abre en una pestaña nueva)</span></a>
        <a class="btn btn-primary btn-sm nav-drawer-cta" href="https://www.twitch.tv/lichpol_gamer" target="_blank" rel="noopener noreferrer">${renderIcon('twitch', 'icon icon--twitch')} Ver en Twitch ${renderIcon('external', 'icon icon--external')}<span class="visually-hidden">(se abre en una pestaña nueva)</span></a>
      </nav>
    </div>
  </header>`;
}

function safeExternalUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' ? parsed.href : null;
  } catch {
    return null;
  }
}

function renderExternalLink(url, text) {
  const safeUrl = safeExternalUrl(url);
  if (!safeUrl) return '';
  return `<a class="text-link novela-external-link" href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)} ${renderIcon('external', 'icon icon--external')}<span class="visually-hidden">(se abre en una pestaña nueva)</span></a>`;
}

function renderTocBook(book, chapters, publishedNumbers) {
  const bookNumber = escapeHtml(toRoman(book.numero));
  const rows = chapters.map(chapter => {
    const chapterNumber = Number(chapter.numero);
    const numberLabel = `Capítulo ${chapterNumber}`;
    const interlude = chapter.interludio === true ? '<span class="novela-interlude">Interludio</span>' : '';
    const title = escapeHtml(chapter.titulo);
    if (publishedNumbers.has(chapterNumber)) {
      return `          <li><a class="novela-chapter-link" href="${String(chapterNumber).padStart(3, '0')}.html" data-chapter-number="${chapterNumber}"><span class="novela-chapter-number">${numberLabel}</span><span class="novela-chapter-title">${title}</span>${interlude}</a></li>`;
    }
    return `          <li><span class="novela-chapter-link novela-chapter-link--upcoming"><span class="novela-chapter-number">${numberLabel}</span><span class="novela-chapter-title">${title}</span>${interlude}</span></li>`;
  }).join('\n');
  return `      <section class="novela-book" id="libro-${book.numero}" aria-labelledby="libro-${book.numero}-titulo">
        <p class="eyebrow">Libro ${bookNumber}</p>
        <h2 id="libro-${book.numero}-titulo">${escapeHtml(book.titulo)}</h2>
        <ol class="novela-chapter-list">
${rows}
        </ol>
      </section>`;
}

export function renderTocPage({ books, chapters, publishedNumbers, publishedLimit }) {
  const publishedSet = publishedNumbers instanceof Set ? publishedNumbers : new Set(publishedNumbers);
  const sortedChapters = [...chapters].sort((a, b) => a.numero - b.numero);
  const bookSections = books.map(book => {
    const bookChapters = sortedChapters.filter(chapter => chapter.libro === book.numero);
    return renderTocBook(book, bookChapters, publishedSet);
  }).join('\n');
  const cover = `../../assets/kuroto.webp`;
  const hasUnpublishedChapters = sortedChapters.some(chapter => !publishedSet.has(Number(chapter.numero)));
  const pageTitle = 'Kuroto, la novela | Lichpol';
  const pageDescription = 'La novela de la campaña Aventuras en Kuroto. La historia, emitida en directo por Twitch, adaptada a prosa.';
  return `${pageHead({ title: pageTitle, description: pageDescription })}
<body class="novela-page novela-index" data-published-chapters="${[...publishedSet].sort((a, b) => a - b).join(',')}">
${renderSharedHeader()}
  <main id="main" class="novela-main">
    <section class="hero hero--inner hero--kuroto novela-hero" aria-labelledby="novela-title">
      <img class="novela-hero__image" src="${cover}" srcset="../../assets/kuroto-640.webp 640w, ../../assets/kuroto-960.webp 960w, ${cover} 1672w" sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 42vw" width="1672" height="941" alt="Portada de Aventuras en Kuroto: monte nevado y cerezos en flor en estilo de grabado japonés" fetchpriority="high" decoding="async">
      <div class="container hero-main">
        <div class="hero-copy novela-hero__copy">
          <p class="eyebrow">La novela</p>
          <h1 id="novela-title">Aventuras en Kuroto</h1>
          <p class="novela-hero__lead">La campaña que se jugó en directo en Twitch, contada como novela en diez libros.</p>
          <div class="button-row novela-hero__actions">
            <a class="btn btn-primary" href="001.html">Empezar a leer</a>
            <a class="text-link novela-external-link" href="${CAMPAIGN_PLAYLIST}" target="_blank" rel="noopener noreferrer">Ver la campaña en YouTube ${renderIcon('external', 'icon icon--external')}<span class="visually-hidden">(se abre en una pestaña nueva)</span></a>
            <a class="text-link novela-hero__continue" href="001.html" data-continue-reading hidden></a>
          </div>
        </div>
      </div>
    </section>
    <section class="container novela-library" aria-label="Índice de libros y capítulos">
      ${hasUnpublishedChapters ? '<p class="novela-upcoming-note">Los capítulos sin enlace estarán disponibles próximamente.</p>' : ''}
      <div class="novela-book-grid">
${bookSections}
      </div>
    </section>
  </main>
  <script type="application/json" id="novela-page-data">${JSON.stringify({ publishedLimit })}</script>
  <p class="visually-hidden" role="status" aria-live="polite" id="ambience-live"></p>
</body>
</html>
`;
}

function renderBreadcrumbs(chapter, book) {
  return `    <nav class="novela-breadcrumbs container reading" aria-label="Migas de pan">
      <ol>
        <li><a href="../../index.html">Lichpol</a></li>
        <li><a href="index.html">Kuroto</a></li>
        <li><a href="index.html#libro-${book.numero}">Libro ${escapeHtml(toRoman(book.numero))}</a></li>
      </ol>
    </nav>`;
}

function renderPaginationItem({ chapter, direction, rel }) {
  if (!chapter) return '';
  const number = String(chapter.numero).padStart(3, '0');
  const label = direction === 'prev' ? 'Anterior' : 'Siguiente';
  return `        <a class="novela-pagination__item novela-pagination__item--${direction}" href="${number}.html" rel="${rel}">
          <span class="eyebrow">${label}</span>
          <span class="novela-pagination__title">Capítulo ${chapter.numero} · ${escapeHtml(chapter.titulo)}</span>
        </a>`;
}

export function renderChapterPage({ chapter, book, proseHtml, description, previous, next, publishedNumbers, plate = null }) {
  const publishedSet = publishedNumbers instanceof Set ? publishedNumbers : new Set(publishedNumbers);
  const number = String(chapter.numero).padStart(3, '0');
  const renderedProse = insertPlateAtParagraphMidpoint(proseHtml, plate);
  const pageTitle = `Capítulo ${chapter.numero} · ${chapter.titulo} | Kuroto, la novela | Lichpol`;
  const previousItem = chapter.numero === 1
    ? `        <a class="novela-pagination__item novela-pagination__item--prev" href="index.html" rel="prev"><span class="eyebrow">Anterior</span><span class="novela-pagination__title">Índice de Kuroto</span></a>`
    : renderPaginationItem({ chapter: previous, direction: 'prev', rel: 'prev' });
  let nextItem = '';
  if (next && publishedSet.has(next.numero)) {
    nextItem = renderPaginationItem({ chapter: next, direction: 'next', rel: 'next' });
  } else if (next) {
    nextItem = `        <div class="novela-pagination__item novela-pagination__item--next novela-pagination__item--upcoming" aria-label="Siguiente capítulo, próximamente">
          <span class="eyebrow">Siguiente · Próximamente</span>
          <span class="novela-pagination__title">Capítulo ${next.numero} · ${escapeHtml(next.titulo)}</span>
        </div>`;
  }

  const videoLink = renderExternalLink(chapter.video, 'Ver el directo original');
  const descriptionText = description ?? getPlainDescription(chapter.body);
  const prevHref = chapter.numero === 1 ? 'index.html' : previous ? `${String(previous.numero).padStart(3, '0')}.html` : '';
  const nextHref = next && publishedSet.has(next.numero) ? `${String(next.numero).padStart(3, '0')}.html` : '';
  const minutes = Math.max(1, Math.round(Number(chapter.palabras || 0) / 230));
  const standaloneIndexLink = chapter.numero === 1 ? '' : '<a class="text-link novela-index-link" href="index.html">Índice de Kuroto</a>';

  return `${pageHead({ title: pageTitle, description: descriptionText, preloadStoryFont: true })}
<body class="novela-page novela-chapter-page" data-chapter-number="${chapter.numero}" data-prev-href="${prevHref}" data-next-href="${nextHref}">
${renderSharedHeader()}
  <div class="novela-reading-progress" data-reading-progress role="progressbar" aria-label="Progreso de lectura" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" hidden><span></span></div>
  <main id="main" class="novela-main novela-main--chapter">
    <section class="container novela-reader" data-reader-root aria-label="Libro abierto">
      <div class="novela-reader__book" data-reader-book>
        <div class="novela-reader__cover" data-reader-cover hidden>
          <span class="novela-reader__cover-spine" aria-hidden="true"></span>
          <button class="novela-reader__cover-board" type="button" data-open-book aria-label="Abrir el libro">
            <span class="novela-reader__cover-front" aria-hidden="true">
              <span class="novela-reader__cover-frame"></span>
              <span class="novela-reader__cover-corner novela-reader__cover-corner--tl"></span>
              <span class="novela-reader__cover-corner novela-reader__cover-corner--tr"></span>
              <span class="novela-reader__cover-corner novela-reader__cover-corner--bl"></span>
              <span class="novela-reader__cover-corner novela-reader__cover-corner--br"></span>
              <span class="novela-reader__cover-plate" aria-hidden="true"><img src="../../assets/novela/portada-kuroto.webp" alt="" aria-hidden="true" width="900" height="1200"></span>
              <span class="novela-reader__cover-title">Aventuras en Kuroto</span>
              <span class="novela-reader__cover-byline">Lichpol</span>
              <span class="novela-reader__cover-clasp"></span>
            </span>
            <span class="novela-reader__cover-inside" aria-hidden="true"></span>
          </button>
          <span class="novela-reader__cover-page-edge" aria-hidden="true"></span>
        </div>
        <div class="novela-reader__paper" data-reader-paper aria-hidden="true">
          <span class="novela-reader__paper-page novela-reader__paper-page--left"></span>
          <span class="novela-reader__paper-page novela-reader__paper-page--right"></span>
          <span class="novela-reader__paper-edges"></span>
        </div>
        <div class="novela-reader__viewport" data-reader-viewport>
          <article class="novela-reader__flow" id="novela-prose" aria-label="Capítulo ${chapter.numero}: ${escapeHtml(chapter.titulo)}">
            <header class="novela-reader__opening">
              <p class="novela-reader__chapter-number">Capítulo ${chapter.numero}</p>
              <h1>${escapeHtml(chapter.titulo)}</h1>
              <p class="novela-reader__book-line">Libro ${escapeHtml(toRoman(book.numero))} · ${escapeHtml(book.titulo)}</p>
            </header>
${renderedProse}
          </article>
          <div class="novela-reader__running-head novela-reader__running-head--left" data-running-left aria-hidden="true">Kuroto · ${escapeHtml(book.titulo)}</div>
          <div class="novela-reader__running-head novela-reader__running-head--right" data-running-right aria-hidden="true">${escapeHtml(chapter.titulo)}</div>
          <div class="novela-reader__folio novela-reader__folio--left" data-folio-left aria-hidden="true"></div>
          <div class="novela-reader__folio novela-reader__folio--right" data-folio-right aria-hidden="true"></div>
          <div class="novela-reader__fold-shadow" data-fold-shadow aria-hidden="true"></div>
        </div>
      </div>
      <div class="novela-reader__controls" data-page-controls hidden>
        <button class="novela-reader__page-button" type="button" data-page-previous aria-label="Página anterior">‹ <span>Anterior</span></button>
        <p class="novela-reader__page-status" data-page-status aria-live="polite" aria-atomic="true">Página 1 de 1</p>
        <button class="novela-reader__page-button" type="button" data-page-next aria-label="Página siguiente"><span>Siguiente</span> ›</button>
      </div>
${renderBreadcrumbs(chapter, book)}
      <p class="visually-hidden" data-reader-live role="status" aria-live="polite" aria-atomic="true"></p>
      <footer class="novela-chapter-footer">
      ${videoLink}
      <nav class="novela-pagination" aria-label="Navegación entre capítulos">
${previousItem}
${nextItem}
      </nav>
      ${standaloneIndexLink}
      </footer>
    </section>
  </main>
  <p class="visually-hidden" role="status" aria-live="polite" id="ambience-live"></p>
</body>
</html>
`;
}

function parseLimit(args) {
  let limit;
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--limit') {
      const value = args[index + 1];
      if (value === undefined) throw new Error('--limit requires a positive integer');
      limit = Number(value);
      index++;
    } else if (argument.startsWith('--limit=')) {
      limit = Number(argument.slice('--limit='.length));
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
    if (!Number.isInteger(limit) || limit < 1) throw new Error('--limit requires a positive integer');
  }
  return limit;
}

export async function buildNovel({ root = REPOSITORY_ROOT, limit } = {}) {
  const { errors, chapters, index } = await validateNovelSources(root);
  if (errors.length) return { errors, chaptersValidated: chapters.length, pagesWritten: 0 };

  let plateEntries = [];
  try {
    const plateSource = await readFile(path.join(root, 'tools', 'novela-laminas.json'), 'utf8');
    const parsedPlates = JSON.parse(plateSource);
    if (!Array.isArray(parsedPlates)) throw new Error('tools/novela-laminas.json must contain an array');
    plateEntries = parsedPlates;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      return { errors: [`Could not read chapter plates: ${error.message}`], chaptersValidated: chapters.length, pagesWritten: 0 };
    }
  }

  const outputDirectory = path.join(root, 'novela', 'kuroto');
  const publishedChapters = chapters.filter(chapter => limit === undefined || chapter.numero <= limit);
  const publishedNumbers = new Set(publishedChapters.map(chapter => chapter.numero));
  const bookByNumber = new Map(index.libros.map(book => [book.numero, book]));
  const writes = [];
  const toc = renderTocPage({ books: index.libros, chapters, publishedNumbers, publishedLimit: limit ?? null });
  writes.push(['index.html', toc]);

  for (const chapter of publishedChapters) {
    const previous = chapters[chapters.findIndex(item => item.numero === chapter.numero) - 1] ?? null;
    const next = chapters[chapters.findIndex(item => item.numero === chapter.numero) + 1] ?? null;
    const parsed = parseFrontMatter(chapter.source);
    const prose = getProse(parsed.body);
    let proseHtml;
    try {
      proseHtml = markdownToHtml(prose);
    } catch (error) {
      return { errors: [`${chapter.filename}: ${error.message}`], chaptersValidated: chapters.length, pagesWritten: 0 };
    }
    const plateEntry = plateEntries.find(entry => Number(entry?.capitulo) === chapter.numero);
    const plateFilename = typeof plateEntry?.archivo === 'string' && /^lamina-\d{3}\.webp$/u.test(plateEntry.archivo)
      ? plateEntry.archivo
      : '';
    let plate = null;
    if (plateFilename && typeof plateEntry.alt === 'string' && typeof plateEntry.pie === 'string') {
      try {
        await access(path.join(root, 'assets', 'novela', plateFilename));
        plate = plateEntry;
      } catch {
        // A metadata entry only activates when its image is present in the asset tree.
      }
    }
    const html = renderChapterPage({
      chapter,
      book: bookByNumber.get(chapter.libro),
      proseHtml,
      description: getPlainDescription(chapter.body),
      previous,
      next,
      publishedNumbers,
      plate,
    });
    writes.push([`${String(chapter.numero).padStart(3, '0')}.html`, html]);
  }

  await mkdir(outputDirectory, { recursive: true });
  const expectedFiles = new Set(writes.map(([filename]) => filename));
  const existingFiles = await readdir(outputDirectory);
  for (const filename of existingFiles) {
    if (/^\d{3}\.html$/iu.test(filename) && !expectedFiles.has(filename)) {
      await rm(path.join(outputDirectory, filename));
    }
  }
  for (const [filename, html] of writes) {
    await writeFile(path.join(outputDirectory, filename), html, 'utf8');
  }

  return { errors: [], chaptersValidated: chapters.length, pagesWritten: writes.length, files: writes.map(([filename]) => filename) };
}

async function main() {
  let limit;
  try {
    limit = parseLimit(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
    return;
  }

  const result = await buildNovel({ limit });
  if (result.errors.length) {
    console.error(`Validation failed: ${result.errors.length} error${result.errors.length === 1 ? '' : 's'}.`);
    for (const error of result.errors) console.error(`- ${error}`);
    console.log(`Validated ${result.chaptersValidated} chapters, ${result.errors.length} errors; wrote ${result.pagesWritten} pages.`);
    process.exitCode = 1;
    return;
  }
  console.log(`Validated ${result.chaptersValidated} chapters, 0 errors; wrote ${result.pagesWritten} pages.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
