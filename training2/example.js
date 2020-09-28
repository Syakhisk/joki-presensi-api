const puppeteer = require('puppeteer-core');
const path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

(async () => {
    let launchOptions = { headless: false, 
                          executablePath: path,
                          args: ['--start-maximized'] };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1366, height: 768});
    // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // go to the target web
    await page.goto('https://google.com');

    console.log(await browser.version());

    // close the browser
    await browser.close();
})();