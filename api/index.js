const { chromium } = require('playwright-core');
const chromiumPath = require('@sparticuz/chromium').path;

module.exports = async (req, res) => {
    try {
        // Launch browser with correct Chromium binary
        const browser = await chromium.launch({
            executablePath: chromiumPath, // Use the lightweight Chromium binary
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true, // Keep it headless for minimal resource usage
        });

        const page = await browser.newPage();
        await page.goto('https://www.scrapingcourse.com/ecommerce/');
        const title = await page.title();

        await browser.close();

        res.status(200).json({ title });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scrape page' });
    }
};
