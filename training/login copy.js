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
  let exit = 0;
  await page
    .waitForNavigation({ waitUntil: "networkidle0" })
    .then(() => {
      console.log("Navigation Done");
    })
    .then(() => {
      const alert = page.$(".alert.alert-danger");

      if (alert != null) {
        exit = 1;
        console.log(chalk.red("Wrong Pass"));
        browser.close();
      } else {
        console.log("Succesfully Login, Proceeding...");
        return page;
      }
    });
};
