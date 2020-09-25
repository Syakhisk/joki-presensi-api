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
    .waitForSelector("#username")
    .then(() => page.type("input#username", login.username))
    .then(() => page.click("#continue"))
    .catch(() => console.log("username box not found."));

  await page
    .waitForSelector("input#password")
    .then(() => page.type("input#password", login.password))
    .then(() => page.click("button#login"))
    .catch(() => console.log("password box not found."));

  const listSelector =
    "#main-container > div > div:nth-child(2) > div.col-md-12 > div > div:nth-child(2) > div > div:nth-child(2) > div.row.py-5 > div > ul";

  var results = await page.$$eval(listSelector, (list) => {
    var results = [];
    for (let i = 0; i < list.length; i++) {
      var data = {
        href: list[i].href,
        textContent: list[i].textContent,
        innerHTML: list[i].innerHTML,
      };
      results.push(data);
    }
    return results;
  });

  console.log(results);

  // const element = await page.$eval(
  //   ".font-size-h6.font-w500.mb-0",
  //   (el) => el.textContent
  // );
  // console.log(element);

  // // await page.waitForNavigation
  // await page
  //   .waitForSelector("body > div > div > div.alert.alert-danger", {
  //     timeout: 5000,
  //   })
  //   .then(() => {
  //     console.log("Login Failed!");
  //     browser.close();
  //     return 0;
  //   });

  // console.log("done");
  // // await browser.close();
  // const cookies = await page.cookies();
  // await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));
})();
