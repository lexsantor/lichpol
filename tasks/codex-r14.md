# Codex task R14 (trivial, index.html + css/home.css)

Repo root: C:\Users\lexsa\Desktop\proyectos\lichpol. Edit ONLY index.html and css/home.css. No commits.

Owner decision: remove the logo seal over the Dungeon Master image.
1. index.html: delete the whole `<div class="home-dm__seal">...</div>` block (it contains the lichpol-logo-color.svg img) inside `.home-dm__portrait-frame`. Keep the frame and the wizard image untouched.
2. css/home.css: delete every `.home-dm__seal` and `.home-dm__seal img` rule (base around line 316-333 and the mobile override around line 1133-1143). Remove nothing else.

Acceptance: `grep -c "home-dm__seal" index.html css/home.css` = 0 for both; report the removed lines.
