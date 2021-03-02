const puppeteer = require("puppeteer");

const getBody = async () => {
	const chromeOptions = {
		headless: true,
		defaultViewport: null,
		args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
	};
	// const browser = await puppeteer.launch(chromeOptions);
	// const page = await browser.newPage();

	// await page.goto("https://example.com");
	// let bodyHTML = await page.evaluate(() => document.body.innerHTML);
	// // await page.screenshot({ path: "example.png" });
	// console.log(bodyHTML);
	// await browser.close();
	try {
		const browser = await puppeteer.launch(chromeOptions);
		const page = await browser.newPage();

		await page.goto("https://example.org/", { waitUntil: "networkidle0" });
		const data = await page.evaluate(() => document.body.innerHTML);

		// console.log(data);

		await browser.close();
		return data;
	} catch (err) {
		console.error(err);
	}

	// return bodyHTML;
};

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async function (req, res) {
	const theData = await getBody();
	// console.log(theData);
	res.send(theData);
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
