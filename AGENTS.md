# AGENTS.md

## What this is
- Static GitHub Pages site: `index.html` is the entire app (inline CSS/JS, CDN `marked` + DOMPurify). No build, bundler, package, lint, typecheck, or formatter — don't add or expect them.
- Recipes/photos are fetched at runtime from `main`: the list via the GitHub Contents API, each recipe via its raw `download_url`. Merging content needs no redeploy.
- `deploy.yml` redeploys only when `index.html`, `deploy.yml`, or `tests/**` change.

## Verification
- From repo root (what CI runs): `node tests/test.js`
- First-time setup: `cd tests && npm install && npx playwright install chromium`
- The test is E2E against the live site `https://cupprum.github.io/recipes/#rice.md`, run after deploy; it cannot validate local files. It requires network and deployed `main`.
- It asserts `#content` contains "Rice for Two" and there are ≥2 `.recipe-link`s. Renaming/deleting `recipes/rice.md` or changing its title breaks CI.

## Content contracts
- Recipe file: `recipes/<kebab-case>.md` with exactly `# Title`, `## Ingredients` (bullets), `## Steps` (numbered). This is what the UI and automation expect.
- Filename is user-visible: sidebar label is filename minus `.md` with dashes→spaces; the URL hash is the full filename (`#rice.md`). Renaming changes links.
- Photo: `photos/<recipe-basename>.jpeg`. `index.html` rewrites the recipe URL to `photos/$1.jpeg` and probes only that extension; `.jpg`/`.png` never display.

## Automation
- `new-recipe.yml`: issue titled `new-recipe <name>` by `Cupprum` → DeepSeek (`recipe-formatting-prompt.txt`, model `deepseek-chat`) writes `recipes/<name>.md` and opens a PR. `recipe-formatting-prompt.txt` is the source of truth for format/units; update it when changing recipe conventions.
- `add-photo.yml`: issue titled `add-photo <name>` by `Cupprum`; body must contain a `https://github.com/user-attachments/assets/...` link → `photos/<name>.jpeg` + PR.
- Requires the `DEEPSEEK_API_KEY` repo secret.

## Gotchas
- `.gitignore` ignores `package.json`/`package-lock.json` at every depth; test manifests already exist in `tests/`. Use `git add -f` if dependency manifests must be committed.
- Markdown is rendered with `marked` and sanitized with DOMPurify; keep content in Markdown, not raw HTML.
- Unauthenticated GitHub API calls power the list, so rate limits break the site without any code change.
