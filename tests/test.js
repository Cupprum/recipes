const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Check if the Rice recipe loads
    await page.goto('https://cupprum.github.io/recipes/#rice.md', { waitUntil: 'networkidle' });
    const content = await page.locator('#content').innerText();
    if (!content.includes('Rice for Two')) {
      throw new Error('The recipe loaded, but its not the correct rice recipe.');
    }

    // Check if the sidebar menu loaded multiple recipes
    const recipeCount = await page.locator('.recipe-link').count();
    if (recipeCount < 2) {
      throw new Error(`Expected multiple recipes in menu, but found ${recipeCount}.`);
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
