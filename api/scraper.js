// const { chromium } = require('playwright-core');
// const chromiumBinary = require('@sparticuz/chromium');

// module.exports = async (req, res) => {
//     try {
//         // Get correct Chromium path
//         const executablePath = await chromiumBinary.executablePath();

//         // Launch browser with external Chromium
//         const browser = await chromium.launch({
//             args: chromiumBinary.args,
//             executablePath: executablePath || '/usr/bin/chromium', // ✅ Ensure valid path
//             headless: true, // ✅ Use optimized headless mode
//         });

//         const page = await browser.newPage();
//         await page.goto('https://www.scrapingcourse.com/ecommerce/');
//         const title = await page.title();

//         await browser.close();

//         res.status(200).json({ title });
//     } catch (error) {
//         console.error('Browser Launch Error:', error);
//         res.status(500).json({ error: 'Failed to scrape page' });
//     }
// };

const { chromium } = require('playwright-core');
const connectionURL =
    'wss://browser.zenrows.com?apikey=eb05b1504af794838e9baffae7c0c3300084ef79';

module.exports = async (req, res) => {
    try {
        const browser = await chromium.connectOverCDP(connectionURL);

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
