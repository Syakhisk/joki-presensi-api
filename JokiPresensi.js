const puppeteer = require("puppeteer-core");
const path = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";
const fs = require("fs");
// const today = require("./dateGenerator");
const today = " Senin, 5 Oktober 2020";
// const today = "Senin, 28 September 2020";
const chalk = require("chalk");
const loginData = require("./data/dataLogin");
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
    console.log("\nClass data exists, proceeding...\n");
  }

  const classIndex = process.argv[2];
  const presensiCode = process.argv[3];

  const classListJson = await fs.promises.readFile("./data/dataClass.json");
  const classList = JSON.parse(classListJson);
  let choosenClass;
  let isValid = false;

  if (classIndex == undefined) {
    //if user doesnt input class index
    //show class list

    console.log("---------------------------");

    console.log("Today is: ", chalk.blueBright(today));
    console.log("NRP: ", chalk.yellow(" " + loginData.username + " "));
    console.log("\nChoose class: ");

    let i = 0;
    for (theClass of classList) {
      console.log("[" + chalk.yellow(i) + "]", chalk.cyan(classList[i].title));
      i++;
    }

    console.log(chalk.whiteBright("\nSyntax Usage:"));
    console.log(
      "\t",
      chalk.yellow("node jokiPresensi.js"),
      chalk.cyan("[index-kelas]"),
      chalk.green("[kode-presensi]")
    );
  } else if (presensiCode) {
    //if user input presensi code as args but

    if (classIndex > classList.length || presensiCode.toString().length < 6) {
      //if user input invalid classIndex / presensiCode

      console.log(chalk.red("Invalid Kode Presensi / Index Kelas"));
    } else {
      //sucessfully choose class and use valid code
      //continue to next step

      //isValid var to confirm all input is valid
      isValid = true;
      choosenClass = classList[classIndex];

      console.log(chalk.whiteBright("Choosen Class: "));
      console.log("\t", chalk.cyan(choosenClass.title));

      console.log(chalk.whiteBright("\nPresensi Code: "));
      console.log("\t", chalk.cyan(presensiCode));
    }
  } else {
    //if user didnt input presensi code

    choosenClass = classList[classIndex];
    console.log(chalk.whiteBright("Choosen Class: "));
    console.log("\t", chalk.cyan(choosenClass.title));

    console.log(chalk.whiteBright("\nSyntax Usage:"));
    console.log(
      "\t",
      chalk.yellow("node jokiPresensi.js"),
      chalk.cyan("[index-kelas]"),
      chalk.green("[kode-presensi]")
    );
  }

  if (isValid) {
    /* Login Process */
    const loginReturnVal = await login();
    const browser = loginReturnVal.browser;
    const page = loginReturnVal.page;

    /* Navigate to class */
    await page.goto(choosenClass.link);

    /* Click Hadir Based on [today]*/
    let xpathHadir = `//tbody[contains(@class, "font-w600") and contains(., "${today}")]/tr/td/button[contains(@class, "btn-hadir-mahasiswa")]`;
    const hadirButton = await page.waitForXPath(xpathHadir, { timeout: 1000 });
    await hadirButton.click();
    /* Input Kode presensi */
    await page.evaluate((presensiCode) => {
      document.querySelector("#kode_akses_mhs").value = presensiCode;
      document.querySelector("#submit-hadir-mahasiswa").click();
    }, presensiCode);
    // await page.click("button#submit-hadir-mahasiswa");
    /* Click submit */
    /* Check Status */
  }

  return;

  //setting for browser
  let settings = {
    headless: false,
    executablePath: path,
    args: ["--start-maximized"],
  };

  //browser instance
  // const browser = await puppeteer.launch(settings);

  //page instance
  // const page = await browser.newPage();

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
