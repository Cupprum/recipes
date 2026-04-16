# Recipes

[![Recipes deployment](https://github.com/Cupprum/recipes/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Cupprum/recipes/actions/workflows/deploy.yml)

Simple website fetching recipes stored as markdown from this repo.

Uses only HTML, CSS, Vanila Javascript and is deployed to [Github pages](https://cupprum.github.io/recipes/).

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

Create a issue on github with a description of a recipe, a workflow will automatically pick it up and try to format it correctly.
The workflow will try to create a PR which needs to be reviewed and approved. The recipes should be stored in the `recipes` folder.

## Adding pictures

The photos should be stored in `photos` folder, and should have the same name as a recipe.

Before adding a picture, make sure to remove all the PII, using the `exiftool`, specificaly by using the following command:
```
exiftool -overwrite_original -all= ./photos/*.jpeg
```