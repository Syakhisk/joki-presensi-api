const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const login = require("./data/dataLogin.js");
const chalk = require("chalk");

module.exports = async () => {
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
  console.log("Loading Presensi");
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

  //page auth check
  await page.waitForNavigation({ timeout: 5000 }).catch(() => {
    console.log("No Navigation Found, ");
  });

  const alert = await page.$(".alert.alert-danger").catch(() => {});
  if (!alert) {
    let name;
    // evaluate html dom
    const evaluate = await page.evaluate(() => {
      const nameSelector =
        "#main-container > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div.font-size-lg.font-w600.text-its-black";
      name = document.querySelectorAll(nameSelector);
    });
    console.log(chalk.greenBright("Correct Password"));
    console.log(chalk.blue(`Logged in as ${chalk.green(name)}`));
  } else {
    console.log(chalk.redBright("Incorrect Password"));
  }

  return { page, browser };

  // await page.waitForNavigation({ waitUntil: "load" }).then(async () => {
  //   const alert = await page.$(".alert.alert-danger");
  //   console.log(chalk.blueBright(alert));
  //   if (!alert) {
  //     console.log("Null");
  //   }
  // });
};
