# AGENTS.md

## What this is
- Static GitHub Pages site: `index.html` holds all markup/CSS/JS (CDN `marked` + DOMPurify). No build, bundler, lint, typecheck, or formatter — edit the file and deploy.
- Recipes/photos come from `main` at runtime: the list via the GitHub Contents API, each recipe via its raw `download_url`. Content merges need no redeploy.
- `deploy.yml` deploys on push to `main` changing `index.html`, `deploy.yml`, or `tests/**`, and on manual dispatch. It uploads the whole repo.

## Verification
- CI runs `node tests/test.js` from the repo root after deploy; local setup is `cd tests && npm install && npx playwright install chromium` (CI instead does a root `npm install playwright`).
- It is E2E against the live site (`https://cupprum.github.io/recipes/#mafe.md`), so it needs network and deployed `main` and cannot validate local files.
- It asserts `#content` contains "Vegan Mafé", there are ≥2 `.recipe-link`s, and exactly one `#content img` ends in `/photos/mafe.jpeg`. Renaming/deleting `recipes/mafe.md` or `photos/mafe.jpeg`, or changing that title, breaks CI.

## Content contracts
- `recipes/<name>.md`: exactly `# Title`, `## Ingredients` (bullets), `## Steps` (numbered). `recipe-formatting-prompt.txt` is the source of truth for units/translation — update it when conventions change.
- The filename is user-visible: sidebar label is filename minus `.md`, dashes as spaces (capitalized by CSS), and the URL hash is `#<name>.md`. Renaming changes links.
- Photo: `photos/<name>.jpeg` only. `index.html` rewrites `/recipes/<name>.md` to `/photos/<name>.jpeg` and HEAD-probes just that path; `.jpg`/`.png` never display.

## Automation
- `label-dispatch.yml` runs when the `recipe` or `photo` label is added to an issue by `Cupprum`, calling the reusable workflows below. Only the label triggers a run — not opening the issue — and removing/re-adding it is the retry path. The issue title's first word is the recipe name, so `pizza #2` works.
- `new-recipe.yml`: DeepSeek (`deepseek-chat`, `recipe-formatting-prompt.txt`) turns the issue body into `recipes/<name>.md` and opens a PR. Needs the `DEEPSEEK_API_KEY` secret. It does not validate the name, so a title like `Pizza Margherita` yields `Pizza.md`.
- `add-photo.yml`: needs a `https://github.com/user-attachments/assets/...` link in the body, a lowercase kebab-case `<name>` with no extension, and an existing `recipes/<name>.md`; opens a PR adding `photos/<name>.jpeg`. Bad input fails the run and creates no PR.
- Neither reusable flow guards itself (no `if:`); a new caller must repeat the label/author checks.

## Gotchas
- `.gitignore` ignores `package.json`/`package-lock.json` at every depth; dependencies are installed ad hoc. Use `git add -f` only if a manifest must be committed.
- Content is Markdown rendered by `marked` and sanitized by DOMPurify — no raw HTML.
- The recipe list uses unauthenticated GitHub API calls, so rate limits can break the site with no code change.
