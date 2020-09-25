const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";

const fs = require("fs").promises;
const login = require("./dataLogin");

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
    .waitForSelector("#username", { timeout: 3000 })
    .then(() => page.type("input#username", login.username))
    .then(() => page.click("#continue"))
    .catch(() => console.log("username box not found."));

  await page.waitFor(5000);

  // .waitForSelector("button#login", { timeout: 3000 })
  await page
    .waitForSelector("input#password", { timeout: 3000 })
    .then(() => page.type("input#password", login.password))
    .then(() => page.click("#login"))
    .catch(() => console.log("password box not found."));

  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

  console.log("done");
  // await browser.close();
})();
