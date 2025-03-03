// const { chromium } = require('playwright-core');
// const chromiumPath = require('@sparticuz/chromium').path;

// module.exports = async (req, res) => {
//     try {
//         // Launch browser with correct Chromium binary
//         const browser = await chromium.launch({
//             executablePath: chromiumPath, // Use the lightweight Chromium binary
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//             headless: true, // Keep it headless for minimal resource usage
//         });

//         const page = await browser.newPage();
//         await page.goto('https://www.scrapingcourse.com/ecommerce/');
//         const title = await page.title();

//         await browser.close();

//         res.status(200).json({ title });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to scrape page' });
//     }
// };

const chromium = require('playwright-core');
const chromiumBinary = require('@sparticuz/chromium');

module.exports = async (req, res) => {
    try {
        // Get correct Chromium path
        const executablePath = await chromiumBinary.executablePath();

        // Launch browser with external Chromium
        const browser = await chromium.chromium.launch({
            args: chromiumBinary.args,
            executablePath: executablePath || '/usr/bin/chromium', // ✅ Ensure valid path
            headless: chromiumBinary.headless, // ✅ Use optimized headless mode
        });

        const page = await browser.newPage();
        await page.goto('https://www.scrapingcourse.com/ecommerce/');
        const title = await page.title();

        await browser.close();

        res.status(200).json({ title });
    } catch (error) {
        console.error('Browser Launch Error:', error);
        res.status(500).json({ error: 'Failed to scrape page' });
    }
};
