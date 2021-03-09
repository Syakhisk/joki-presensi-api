const puppeteer = require("puppeteer");

const getParrent = async (el) => {
	return (await el.$x(".."))[0];
};

module.exports = async (data, page, browser) => {
	const { selectedClass, code, date } = data;

	await page.goto(selectedClass);

	/** Click Hadir Based on [date]*/
	let xpathHadir = `//tbody[contains(@class, "font-w600") and contains(., "${date}")]/tr/td/button[contains(@class, "btn-hadir-mahasiswa")]`;

	const hadirButton = await page
		.waitForXPath(xpathHadir, { timeout: 1000 })
		.catch((err) => {
			console.log("No hadir button found!");
			return false;
		});

	if (!hadirButton) {
		return {
			code: 403,
			msg: "Hadir button not found, check if you had the schedule",
		};
	}

	const isHidden = await hadirButton.evaluate((node) =>
		node.parentElement.style.display === "none" ? true : false
	);

	if (isHidden) {
		return {
			code: 301,
			msg: "Already Submit",
		};
	}

	// await hadirButton.click();
	await hadirButton.evaluate((node) => node.click());

	/** Input Kode presensi */
	await page.evaluate((code) => {
		document.querySelector("#kode_akses_mhs").value = code;
	}, code);

	/** Click submit */
	await page.waitForTimeout(1000);
	await page.evaluate(() => {
		document.querySelector("button#submit-hadir-mahasiswa").click();
	});

	/** Check Status */
	await page.waitForTimeout(500);

	/* Close Browser */

	// document.querySelector(".basic-bg > .main-column > .flash-messages > .alert.alert-success")
	// const alert = await page
	// 	.$(".basic-bg > .main-column > .flash-messages > .alert.alert-success")
	// 	.catch(() => {});

	const alertMsg = await page.evaluate(() => {
		const plain = document.querySelector(".message").innerText;
		const msg = plain.slice(1, plain.length).trim();
		return msg;
	});

	switch (alertMsg) {
		case "Kehadiran berhasil diubah!": {
			console.log("Kehadiran berhasil diubah!");
			await browser.close();
			return {
				code: 200,
				msg: alertMsg,
			};
		}
		case "Kode akses salah!": {
			console.log("Kode akses salah!");
			await browser.close();
			return {
				code: 400,
				msg: alertMsg,
			};
		}
		case "Kode akses telah melewati batas waktu!": {
			console.log("Kode akses telah melewati batas waktu!");
			await browser.close();
			return {
				code: 400,
				msg: alertMsg,
			};
		}

		default:
			await browser.close();
			return false;
	}

	// if (!alert) {
	// 	console.log("not biru");
	// 	await browser.close();
	// 	return false;
	// }
	// console.log("biru");
};
