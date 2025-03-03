const { chromium } = require('playwright-core');
const chromiumPath = require('@sparticuz/chromium').path;

(async () => {
    const browser = await chromium.launch({
        executablePath: chromiumPath,
        headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://www.scrapingcourse.com/ecommerce/');
    console.log(await page.title());

    await browser.close();
})();
