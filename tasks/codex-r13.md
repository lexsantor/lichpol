# Codex task R13 (trivial, index.html only)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Edit ONLY index.html. No commits.

The owner supplied new art. Claude already replaced the files in assets/ (same names):
- brunami.webp is now 1672x941 (was 1781x883); brunami-960 960x540, brunami-640 640x360.
- wizard.webp is now PORTRAIT 1122x1402 (was 1536x1024); wizard-960 960x1200, wizard-640 640x800.
- tavern*.webp and og-tavern.jpg replaced with identical dimensions: no markup change needed for them.

Changes in index.html:
1. Brunami card img: `srcset="assets/brunami-640.webp 640w, assets/brunami-960.webp 960w, assets/brunami.webp 1672w"`, `width="1672" height="941"`, alt `Ilustración: ciudadela gótica con estandartes y antorchas junto a un mar embravecido bajo la luna`.
2. Dungeon Master img (.home-dm__portrait-image): `srcset="assets/wizard-640.webp 640w, assets/wizard-960.webp 960w, assets/wizard.webp 1122w"`, `width="1122" height="1402"`. Keep the alt and sizes.
Nothing else.

Report the exact before/after attributes.
