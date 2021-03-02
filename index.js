const puppeteer = require("puppeteer");

const getBody = async () => {
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

	return bodyHTML;
};

const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send(getBody);
});

app.listen(process.env.PORT || port, () =>
	console.log(`Listening at port ${port}`)
);
