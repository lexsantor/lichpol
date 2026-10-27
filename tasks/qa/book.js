// R42 book reader checks
const { chromium } = require(process.argv[2] + '/node_modules/playwright');
const base = process.argv[3]; const out = process.argv[4]; const log = (...a) => console.log(...a);
const C1 = base + 'novela/kuroto/001.html';
const ready = p => p.waitForFunction(() => document.querySelector('[data-reader-root]')?.className.match(/is-|ready|paged/), null, { timeout: 8000 }).catch(() => {});

async function geom(p) {
  return p.evaluate(() => {
    const vp = document.querySelector('[data-reader-viewport]'); const book = document.querySelector('[data-reader-book]');
    const flow = document.querySelector('#novela-prose'); const brand = document.querySelector('.header-inner .brand'); const cta = document.querySelector('.header-cta');
    const vr = vp.getBoundingClientRect(); const br = book.getBoundingClientRect();
    const status = document.querySelector('[data-page-status]')?.textContent.trim();
    // clipped lines: any text line box crossing the viewport bottom/top within visible horizontal area
    let clipped = 0, visibleLines = 0; const r = document.createRange();
    for (const el of flow.querySelectorAll('p, h1, h2, .novela-scene-break')) for (const rect of (r.selectNodeContents(el), r.getClientRects())) {
      if (rect.right < vr.left + 2 || rect.left > vr.right - 2 || rect.width < 1) continue;
      visibleLines++; if (rect.top < vr.top - 1 || rect.bottom > vr.bottom + 1) clipped++;
    }
    const cols = [...new Set([...flow.querySelectorAll('p')].flatMap(e => [...e.getClientRects()]).filter(x => x.right > vr.left && x.left < vr.right).map(x => Math.round(x.left)))].sort((a, b) => a - b);
    const de = document.documentElement;
    return { rootClass: document.querySelector('[data-reader-root]').className, book: [Math.round(br.left), Math.round(br.right), Math.round(br.top), Math.round(br.height)],
      container: brand && cta ? [Math.round(brand.getBoundingClientRect().left), Math.round(cta.getBoundingClientRect().right)] : null,
      bookCenter: Math.round((br.left + br.right) / 2), containerCenter: brand && cta ? Math.round((brand.getBoundingClientRect().left + cta.getBoundingClientRect().right) / 2) : null,
      colLefts: cols.slice(0, 6), visibleLines, clipped, status, hash: location.hash, hscroll: de.scrollWidth > de.clientWidth,
      font: getComputedStyle(flow.querySelector('p')).fontFamily.split(',')[0] + ' ' + getComputedStyle(flow.querySelector('p')).fontSize, belowFold: Math.round(br.bottom) + '/' + innerHeight };
  });
}

(async () => {
  const b = await chromium.launch({ executablePath: process.env.PWEXE });
  for (const w of [1440, 1024, 768, 375, 320]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w < 800 ? 812 : 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    await p.goto(C1, { waitUntil: 'networkidle' }); await ready(p); await p.waitForTimeout(500);
    log(`${w} p1:`, JSON.stringify(await geom(p)));
    if ([1440, 375].includes(w)) await p.screenshot({ path: `${out}/book-${w}-p1.png` });
    // turn 2 times and check clipping on every spread
    let maxClip = 0, statuses = [];
    for (let i = 0; i < 40; i++) { const g = await geom(p); maxClip = Math.max(maxClip, g.clipped); statuses.push(g.status); if (i === 2 && [1440, 375].includes(w)) await p.screenshot({ path: `${out}/book-${w}-p3.png` });
      const before = g.status; await p.click('[data-page-next]').catch(() => {}); await p.waitForTimeout(450); if ((await geom(p).catch(() => ({}))).status === before || !p.url().includes('001')) break; }
    log(`${w} walk: maxClipped=${maxClip} statuses=${statuses.slice(0, 3).join(' | ')} ... ${statuses.slice(-1)} url=${new URL(p.url()).pathname}${new URL(p.url()).hash}`);
    log(`${w} errors:`, errs.length, errs.slice(0, 3).join(' | '));
    await ctx.close();
  }
  // Behaviour at 1440
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto(C1, { waitUntil: 'networkidle' }); await ready(p); await p.waitForTimeout(400);
  const s1 = (await geom(p)).status; await p.reload({ waitUntil: 'networkidle' }); await ready(p); await p.waitForTimeout(400); log('stable page count across loads:', s1, '==', (await geom(p)).status);
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450);
  const g1 = await geom(p); log('after 2x ArrowRight:', g1.status, g1.hash);
  await p.reload({ waitUntil: 'networkidle' }); await ready(p); await p.waitForTimeout(400); log('reload keeps page:', (await geom(p)).status);
  const anchor = () => p.evaluate(() => { const vr = document.querySelector('[data-reader-viewport]').getBoundingClientRect(); const ps = [...document.querySelectorAll('#novela-prose p')]; return ps.findIndex(e => [...e.getClientRects()].some(x => x.left >= vr.left - 2 && x.right <= vr.right + 2)); });
  const a0 = await anchor(); await p.setViewportSize({ width: 1024, height: 800 }); await p.waitForTimeout(900); await p.setViewportSize({ width: 1440, height: 900 }); await p.waitForTimeout(900);
  log('resize anchor paragraph before/after:', a0, await anchor());
  await p.goto(base + 'novela/kuroto/002.html', { waitUntil: 'networkidle' }); await ready(p); await p.waitForTimeout(300);
  await p.keyboard.press('ArrowLeft'); await p.waitForURL(/001\.html/, { timeout: 5000 }).catch(() => {}); await ready(p); await p.waitForTimeout(500);
  const gf = await geom(p); log('ArrowLeft on 002 p1 ->', new URL(p.url()).pathname + new URL(p.url()).hash, gf.status);
  await p.screenshot({ path: `${out}/book-1440-fin.png` });
  // focus never off-screen in the paged area
  await p.goto(C1, { waitUntil: 'networkidle' }); await ready(p);
  let off = 0; for (let i = 0; i < 30; i++) { await p.keyboard.press('Tab'); off += await p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return 0; const vr = document.querySelector('[data-reader-viewport]').getBoundingClientRect(); const r = a.getBoundingClientRect(); return (document.querySelector('[data-reader-viewport]').contains(a) && (r.right < vr.left || r.left > vr.right)) ? 1 : 0; }); }
  log('focus off-screen in paged area:', off);
  // click on right half turns page
  const st = (await geom(p)).status; const vb = await p.locator('[data-reader-viewport]').boundingBox();
  await p.mouse.click(vb.x + vb.width * 0.9, vb.y + vb.height / 2); await p.waitForTimeout(450); log('click right half:', st, '->', (await geom(p)).status);
  await ctx.close();
  // touch swipe at 375
  const t = await (await b.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true })).newPage();
  await t.goto(C1, { waitUntil: 'networkidle' }); await ready(t); await t.waitForTimeout(400); const ts = (await geom(t)).status;
  await t.evaluate(() => { const el = document.querySelector('[data-reader-viewport]'); const r = el.getBoundingClientRect(); const y = r.top + r.height / 2;
    const ev = (type, x) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 1, pointerType: 'touch', clientX: x, clientY: y, isPrimary: true }));
    ev('pointerdown', r.right - 30); ev('pointermove', r.right - 120); ev('pointermove', r.left + 60); ev('pointerup', r.left + 60); });
  await t.waitForTimeout(500); log('swipe left 375:', ts, '->', (await geom(t)).status);
  // reduced motion + no-JS
  const rm = await (await b.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })).newPage();
  await rm.goto(C1, { waitUntil: 'networkidle' }); await ready(rm);
  log('reduced motion transition on flow:', await rm.evaluate(() => getComputedStyle(document.querySelector('.novela-reader__flow')).transitionDuration));
  const nj = await (await b.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } })).newPage();
  await nj.goto(C1); await nj.screenshot({ path: `${out}/book-375-nojs.png` });
  log('no-JS:', JSON.stringify(await nj.evaluate(() => ({ ps: document.querySelectorAll('#novela-prose p').length, hscroll: document.documentElement.scrollWidth > document.documentElement.clientWidth, h: document.querySelector('#novela-prose').getBoundingClientRect().height }))));
  await b.close();
})();
