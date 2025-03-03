const { chromium } = require('playwright-core');
const chromiumPath = require('@sparticuz/chromium').executablePath;

module.exports = async (req, res) => {
    try {
        const browser = await chromium.launch({
            executablePath: await chromiumPath(),
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        });

        const page = await browser.newPage();
        await page.goto('https://www.scrapingcourse.com/ecommerce/');
        const title = await page.title();

        await browser.close();

        res.status(200).json({ title });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};
