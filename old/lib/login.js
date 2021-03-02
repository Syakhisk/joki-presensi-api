const puppeteer = require("puppeteer");
const settings = require("./settings");

module.exports = async (data) => {
	//browser instance
	const browser = await puppeteer.launch(settings);

	//page instance
	const page = await browser.newPage();
	// console.log(chalk.yellow("Loading Presensi..."));
	await page.goto("https://presensi.its.ac.id/");
	// console.log(chalk.green("Presensi sucessfully loaded"));

	await page
		.waitForSelector("#username")
		.then(() => page.type("input#username", data.username))
		.then(() => page.click("#continue"))
		.catch(() => {
			// res.write("username box not found.");
			console.log("username box not found.");
		});

	//this await promise snippet to avoid racing between form filling and nav
	await Promise.all([
		page
			.waitForSelector("input#password")
			.then(() => page.type("input#password", data.password))
			.then(() => page.click("button#login"))
			.catch(() => console.log("password box not found.")),
		console.log(`Loging in as ${data.username}...`),
		// res.write(`Loging in as ${data.username}...`),

		//page auth check
		page.waitForNavigation({ timeout: 10000 }).catch(() => {
			console.log("No Navigation Found, ");
			// res.write("No Navigation Found, ");
		}),
	]);

	const alert = await page.$(".alert.alert-danger").catch(() => {});
	if (!alert) {
		// evaluate html dom
		let name = await page.evaluate(() => {
			const nameSelector =
				"#main-container > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div.font-size-lg.font-w600.text-its-black";
			return document.querySelector(nameSelector).textContent;
		});
		// res.write(`Logged in as ${name}`);
		console.log(`Logged in as ${name}`);
	} else {
		// res.write("Incorrect Password");
		console.log("Incorrect Password");
	}

	res.end();

	return { page, browser };
};
