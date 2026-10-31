# [Recipes](https://cupprum.github.io/recipes/)

[![Recipes deployment](https://github.com/Cupprum/recipes/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Cupprum/recipes/actions/workflows/deploy.yml)

Simple website fetching recipes stored as markdown from this repo.

Uses only [HTML](https://html.spec.whatwg.org/multipage/), [CSS](https://www.w3.org/Style/CSS/Overview.en.html,), [Vanila Javascript](https://tc39.es/ecma262/) and is deployed to [Github pages](https://docs.github.com/en/pages).

[Link to recipes website](https://cupprum.github.io/recipes/)

## Testing

```
// Installation
cd tests
npm install playwright
npx playwright install chromium
// Execution
node test.js
```

## Adding new recipes

Open an issue titled with the recipe name in lowercase kebab-case, for example `pizza-margherita`. Put the recipe in the issue description, then add the `recipe` label. The label starts the workflow. It formats the recipe, opens a pull request for `recipes/pizza-margherita.md`, and the issue closes when that PR is merged.

## Adding photos

To add a picture to an existing recipe, open an issue titled with that recipe's name, for example `pizza-margherita`. Attach the photo, then add the `photo` label. The name must be lowercase kebab-case with no file extension. The photo is committed as `photos/pizza-margherita.jpeg`.