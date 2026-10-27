const { chromium } = require(process.argv[2] + '/node_modules/playwright');
const base = process.argv[3]; const log = (...a) => console.log(...a);
(async () => {
  const b = await chromium.launch({ executablePath: process.env.PWEXE });
  for (const w of [1440, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w < 800 ? 812 : 900 } });
    await ctx.addInitScript(() => sessionStorage.setItem('lichpol:kuroto:abierto', '1'));
    const p = await ctx.newPage(); await p.goto(base + 'novela/kuroto/001.html', { waitUntil: 'networkidle' }); await p.waitForTimeout(700);
    const snap = () => p.evaluate(() => {
      const pick = sel => [...document.querySelectorAll(sel)].map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return `${e.className.toString().slice(0, 60)} bg=${s.backgroundImage.slice(0, 30)}|${s.backgroundColor} op=${s.opacity} vis=${s.visibility} disp=${s.display} z=${s.zIndex} rect=${Math.round(r.left)},${Math.round(r.width)}x${Math.round(r.height)}`; });
      const flow = document.querySelector('#novela-prose'); const fs = getComputedStyle(flow);
      return { book: document.querySelector('[data-reader-book]').className, root: document.querySelector('[data-reader-root]').className,
        layers: pick('.novela-reader__book > *, .novela-reader__viewport, .novela-reader__viewport > *'),
        flow: { colW: fs.columnWidth, gap: fs.columnGap, w: flow.getBoundingClientRect().width, transform: getComputedStyle(flow.parentElement).transform + ' / ' + fs.transform },
        colLefts: [...new Set([...flow.querySelectorAll('p')].flatMap(e => [...e.getClientRects()]).map(x => Math.round(x.left)))].sort((a, c) => a - c).slice(0, 8),
        vp: (r => [Math.round(r.left), Math.round(r.width)])(document.querySelector('[data-reader-viewport]').getBoundingClientRect()) };
    });
    log(`--- ${w} before`); log(JSON.stringify(await snap(), null, 1));
    await p.click('[data-page-next]'); await p.waitForTimeout(1500);
    log(`--- ${w} after flip`); log(JSON.stringify(await snap(), null, 1));
    await ctx.close();
  }
  await b.close();
})();
