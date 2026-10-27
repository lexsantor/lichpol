# Codex task R55: make the full-bleed desk read as wood (CSS only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. No commits. Edit css/novela.css only. Do not touch assets/, tools/novela-laminas.json, tasks/art-src/. No browsers. Regenerate with `node tools/novela-build.mjs`.

After R53, the full-width desk behind the chapter reader (`.novela-main--chapter::before`) carries a uniform scrim `linear-gradient(rgba(8,7,6,.76), rgba(8,7,6,.76))` over assets/novela/mesa.webp. Measured at 2000x950 and 1440x900: the wood grain is barely visible, the area reads as flat black. The owner's intent is "el libro puesto en una mesa de madera antigua".

1. Replace the uniform scrim with a lighter, shaped one: overall darkening around .30-.45, a radial vignette that darkens toward the viewport edges and corners (stronger far from the book), and keep the warm candlelight pool near the top-left of the book. The wood grain must be clearly visible around the book at 1440 and 2000 wide.
2. Contrast outside the book: the page status ("Páginas 1-2 de 10"), the Anterior/Siguiente buttons, breadcrumb, "Ver el directo original" and the chapter prev/next blocks must keep >= 4.5:1 text contrast. Do it locally (e.g. a soft dark band/gradient behind the controls band and the footer area, or text-shadow plus a darker local backdrop), not by darkening the whole desk.
3. Mobile: same treatment scaled; the desk stays visible in the margins around the single page.

Acceptance: build 181/0, 182 pages; tests pass; report the new gradient stack.
