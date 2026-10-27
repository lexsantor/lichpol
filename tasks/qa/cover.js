// R43 checks: cover, open animation, flip frames, clone alignment
const { chromium } = require(process.argv[2] + '/node_modules/playwright');
const base = process.argv[3]; const out = process.argv[4]; const log = (...a) => console.log(...a);
const C1 = base + 'novela/kuroto/001.html';
(async () => {
  const b = await chromium.launch({ executablePath: process.env.PWEXE });
  for (const w of [1440, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w < 800 ? 812 : 900 } }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    await p.goto(C1, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
    const cov = await p.evaluate(() => { const c = document.querySelector('[data-reader-cover]'); const btn = document.querySelector('[data-open-book]'); const r = c?.getBoundingClientRect();
      return c && { hidden: c.hidden, rect: r && [Math.round(r.left), Math.round(r.right), Math.round(r.top), Math.round(r.height)], btnName: btn?.getAttribute('aria-label'), controlsDisabled: document.querySelector('[data-page-next]')?.disabled }; });
    log(`${w} cover:`, JSON.stringify(cov));
    await p.screenshot({ path: `${out}/cover-${w}.png` });
    await p.focus('[data-open-book]'); await p.screenshot({ path: `${out}/cover-${w}-focus.png` });
    await p.keyboard.press('Enter');
    for (const t of [250, 550]) { await p.waitForTimeout(t === 250 ? 250 : 300); await p.screenshot({ path: `${out}/cover-${w}-open-${t}.png` }); }
    await p.waitForTimeout(1200);
    log(`${w} opened:`, JSON.stringify(await p.evaluate(() => ({ coverHidden: document.querySelector('[data-reader-cover]')?.hidden ?? 'removed', focus: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent.trim().slice(0, 20), status: document.querySelector('[data-page-status]')?.textContent.trim() }))));
    await p.screenshot({ path: `${out}/open-${w}.png` });
    // flip: capture mid-frames and compare clone text with underlying pages
    await p.click('[data-page-next]'); await p.waitForTimeout(200); await p.screenshot({ path: `${out}/flip-${w}-200.png` });
    await p.waitForTimeout(160); await p.screenshot({ path: `${out}/flip-${w}-360.png` });
    const clones = await p.evaluate(() => [...document.querySelectorAll('[inert][aria-hidden="true"]')].length);
    await p.waitForTimeout(800); log(`${w} after flip:`, await p.evaluate(() => document.querySelector('[data-page-status]').textContent.trim()), 'clones mid-flip:', clones, 'clones after:', await p.evaluate(() => document.querySelectorAll('[inert][aria-hidden="true"]').length));
    await p.screenshot({ path: `${out}/spread2-${w}.png` });
    // walk all pages, check text visible within the viewport is not split across columns (mobile drift)
    let drift = 0, n = 0;
    for (let i = 0; i < 30; i++) {
      drift += await p.evaluate(() => { const vr = document.querySelector('[data-reader-viewport]').getBoundingClientRect(); const r = document.createRange(); let bad = 0;
        for (const el of document.querySelectorAll('#novela-prose p')) { r.selectNodeContents(el); for (const x of r.getClientRects()) if (x.left < vr.left - 2 && x.right > vr.left + 4 || x.left < vr.right - 4 && x.right > vr.right + 2) bad++; } return bad; });
      n++; const s = await p.evaluate(() => document.querySelector('[data-page-status]').textContent); await p.click('[data-page-next]').catch(() => {}); await p.waitForTimeout(900);
      if (!p.url().includes('001') || s === await p.evaluate(() => document.querySelector('[data-page-status]')?.textContent)) break;
    }
    log(`${w} lines straddling viewport edge over ${n} pages:`, drift, 'errors:', errs.length, errs.slice(0, 3).join(' | '));
    // revisit: no cover within same session
    await p.goto(C1, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
    log(`${w} cover on revisit same session:`, await p.evaluate(() => document.querySelector('[data-reader-cover]') ? !document.querySelector('[data-reader-cover]').hidden : false));
    await ctx.close();
  }
  const rm = await (await b.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })).newPage();
  await rm.goto(C1, { waitUntil: 'networkidle' }); await rm.waitForTimeout(500); const t0 = Date.now(); await rm.click('[data-open-book]');
  await rm.waitForFunction(() => { const c = document.querySelector('[data-reader-cover]'); return !c || c.hidden; }, null, { timeout: 3000 }).catch(() => {}); log('reduced motion open ms ~', Date.now() - t0);
  await b.close();
})();
