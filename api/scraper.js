const chromium = require('playwright-core');
const chromiumPath = require('@sparticuz/chromium').executablePath;

module.exports = async (req, res) => {
    try {
        res.status(200).json({ title: 'hello world' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scrape page' });
    }
};
