const puppeteer = require("puppeteer");
const settings = require("../ChromeSettings");

module.exports = async (data) => {
	const browser = await puppeteer.launch(settings);
	const page = await browser.newPage();

	// console.log(chalk.yellow("Loading Presensi..."));
	await page.goto("https://presensi.its.ac.id/");
	// console.log(chalk.green("Presensi sucessfully loaded"));

	/** find and input username */
	await page
		.waitForSelector("#username")
		.then(() => page.type("input#username", data.nrp))
		.then(() => page.click("#continue"))
		.catch((err) => {
			console.log("username box not found.");
			console.error(err);
		});

	/** this await promise snippet to avoid racing between form filling and nav */
	await Promise.all([
		page
			.waitForSelector("input#password")
			.then(() => page.type("input#password", data.password))
			.then(() => page.click("button#login"))
			.catch((err) => {
				console.log("password box not found.");
				console.error(err);
			}),
		console.log(`Loging in as ${data.nrp}...`),

		/** Check whether the auth is success by waiting redirection */
		page.waitForNavigation({ timeout: 10000 }).catch((err) => {
			console.log("No Navigation Found, ");
			console.error(err);
		}),
	]);

	/** Check if there's 'incorrect email/password' alert */
	const alert = await page.$(".alert.alert-danger").catch(() => {});
	if (!alert) {
		/** Get user name */
		let name = await page.evaluate(() => {
			const nameSelector = "div.font-size-lg.font-w600.text-its-black";
			return document.querySelector(nameSelector).textContent;
		});
		console.log(`Logged in as ${name}`);
	} else {
		console.log("Incorrect Password");
		await browser.close();
		return false;
	}

	return { page, browser };
};
