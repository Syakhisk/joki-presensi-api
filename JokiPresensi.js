const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const fs = require("fs");
const today = require("./dateGenerator");
const chalk = require("chalk");
const login = require("./login");

(async () => {
  // Check Class data
  if (!fs.existsSync("./data/dataClass.json")) {
    console.log(
      `${chalk.red("Plz get your class data first using")} ${chalk.bgGrey(
        " node getClass.js "
      )}`
    );
    return;
  } else {
    console.log("Class data exists, proceeding...");
  }

  let classIndex = process.argv[2];
  let presensiCode = process.argv[3];

  let classListJson = await fs.promises.readFile("./data/dataClass.json");
  let classList = JSON.parse(classListJson);

  if (classIndex == undefined) {
    console.log(chalk.red("Invalid arguments, correct arguments:"));
    console.log(
      "\t",
      chalk.yellow("node jokiPresensi.js"),
      chalk.cyan("[index-kelas]"),
      chalk.green("[kode-presensi]")
    );
  } else if (presensiCode) {
    if (classIndex > kelas.length || presensiCode.toString().length < 6) {
      console.log(colors.bgRed.white("Invalid Kode Presensi / Index Kelas"));
    } else {
      console.log(colors.red("Kelas Terpilih: "));
      console.log(kelas[classIndex]);

      console.log(colors.red("\nKode Presensi: "));
      console.log(presensiCode);
    }
  } else {
    console.log(colors.red("Kelas Terpilih: "));
    console.log(kelas[classIndex]);

    console.log("\nFormat penggunaan: ");
    console.log(
      "--- node jokiPresensi.js",
      "[index-kelas]".cyan,
      "[kode-presensi]".green
    );
  }

  return;

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
})();
