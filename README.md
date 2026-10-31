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

To add a recipe, open a new issue titled `new-recipe <recipe-name>`, for example `new-recipe pizza` for `recipes/pizza.md`, and put the recipe in the issue description. A workflow formats it and opens a pull request — review and merge it.

## Adding photos

To add a picture to a recipe, open a new issue titled `add-photo <recipe-name>`, for example `add-photo pizza` for `recipes/pizza.md`. Attach the photo to the issue.