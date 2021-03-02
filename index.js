const puppeteer = require("puppeteer");

(async () => {
	const chromeOptions = {
		headless: true,
		defaultViewport: null,
		args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
	};
	const browser = await puppeteer.launch(chromeOptions);
	const page = await browser.newPage();

	await page.goto("https://example.com");
	let bodyHTML = await page.evaluate(() => document.body.innerHTML);
	// await page.screenshot({ path: "example.png" });
	console.log(bodyHTML);

	await browser.close();
})();
