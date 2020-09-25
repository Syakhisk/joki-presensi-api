const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";

const fs = require("fs").promises;

const login = require("./data/dataLogin");

(async () => {
  //setting for browser
  let settings = {
    headless: false,
    executablePath: path,
    args: ["--start-maximized"],
  };

  //browser instance
  const browser = await puppeteer.launch(settings);

  //page instance
  const page = await browser.newPage();

  console.log("Loading Page");
  await page.goto("https://presensi.its.ac.id/");

  await page
    .waitForSelector("#username")
    .then(() => page.type("input#username", login.username))
    .then(() => page.click("#continue"))
    .catch(() => console.log("username box not found."));

  await page
    .waitForSelector("input#password")
    .then(() => page.type("input#password", login.password))
    .then(() => page.click("button#login"))
    .catch(() => console.log("password box not found."));

  await page.waitForNavigation();

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

  // console.log(classList);

  let data = JSON.stringify(classList, null, 2);

  fs.writeFile("data/dataClass.json", data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });

  await browser.close();
})();
