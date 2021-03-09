const puppeteer = require("puppeteer");

module.exports = async (page, browser) => {
	let name = await page
		.evaluate(() => {
			const nameSelector = "div.font-size-lg.font-w600.text-its-black";
			return document.querySelector(nameSelector).textContent;
		})
		.catch((err) => console.log("No name found"));

	const classList = await page
		.evaluate(() => {
			/** Will be populated by classes from user */
			let data = [];

			const listSelector = "div.row.py-5 > div > ul > li";
			const listContent = ".content-li > h5 > a";

			/** Get all <li> within the block */
			const list = document.querySelectorAll(listSelector);

			/** Iterate over each <li> and extract the title and link */
			for (const a of list) {
				data.push({
					title: a
						.querySelector(listContent)
						.innerText.trim()
						.replace(/(\r\n|\n|\r)/gm, " "),
					link: a.querySelector("a").href,
				});
			}
			return data;
		})
		.catch((err) => console.log("No class found"));

	await browser.close();
	return {
		name: name,
		classes: classList,
	};
};
