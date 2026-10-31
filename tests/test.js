const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Check if the Mafé recipe loads
    await page.goto('https://cupprum.github.io/recipes/#mafe.md', { waitUntil: 'networkidle' });
    const content = await page.locator('#content').innerText();
    if (!content.includes('Vegan Mafé')) {
      throw new Error('The recipe loaded, but its not the correct mafe recipe.');
    }

    // Check if the sidebar menu loaded multiple recipes
    const recipeCount = await page.locator('.recipe-link').count();
    if (recipeCount < 2) {
      throw new Error(`Expected multiple recipes in menu, but found ${recipeCount}.`);
    }

    // Check if the recipe photo is displayed
    const photo = page.locator('#content img');
    if (await photo.count() !== 1) {
      throw new Error(`Expected one photo, but found ${await photo.count()}.`);
    }

    const photoSrc = await photo.getAttribute('src');
    if (!photoSrc || !photoSrc.endsWith('/photos/mafe.jpeg')) {
      throw new Error(`Expected the mafe photo, but got ${photoSrc}.`);
    }

    console.log('Tests passed.');
  } catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
