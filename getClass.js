const chalk = require("chalk");
const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const fs = require("fs").promises;
const login = require("./login");

(async () => {
  const loginReturn = await login();

  const page = loginReturn.page;
  const browser = loginReturn.browser;

  const classList = await page.evaluate(() => {
    const listSelector =
      "#main-container > div > div:nth-child(2) > div.col-md-12 > div > div:nth-child(2) > div > div:nth-child(2) > div.row.py-5 > div > ul > li";
    const listContent = ".content-li > h5 > a";
    let data = [];
    /** this can be changed for other website.*/
    const list = document.querySelectorAll(listSelector);
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
  });

  let data = JSON.stringify(classList, null, 2);

  await fs.writeFile("data/dataClass.json", data, (err) => {
    if (err) throw err;
  });
  console.log(`Total Class: ${classList.length}`);
  let num = 0;
  console.log("Class List:");
  for (theClass of classList) {
    num++;
    console.log(chalk.cyan(`(`, num, `)`, theClass.title));
  }

  await browser.close();
})();
