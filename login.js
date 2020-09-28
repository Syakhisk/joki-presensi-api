const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const dataLogin = require("./data/dataLogin.js");
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
  console.log(chalk.yellow("Loading Presensi..."));
  await page.goto("https://presensi.its.ac.id/");
  console.log(chalk.green("Presensi sucessfully loaded"));

  await page
    .waitForSelector("#username")
    .then(() => page.type("input#username", dataLogin.username))
    .then(() => page.click("#continue"))
    .catch(() => console.log("username box not found."));

  //this await promise snippet to avoid racing between form filling and nav
  await Promise.all([
    page
      .waitForSelector("input#password")
      .then(() => page.type("input#password", dataLogin.password))
      .then(() => page.click("button#login"))
      .catch(() => console.log("password box not found.")),
    console.log(
      chalk.yellow(`Loging in as ${chalk.cyan(dataLogin.username)}...`)
    ),

    //page auth check
    page.waitForNavigation({ timeout: 10000 }).catch(() => {
      console.log("No Navigation Found, ");
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
    console.log(chalk.green(`Logged in as ${chalk.bold(name)}`));
  } else {
    console.log(chalk.redBright("Incorrect Password"));
  }

  return { page, browser };
};
