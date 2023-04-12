const puppeteer = require("puppeteer");

let currentPage;
console.log("start")
// launch is the function to open the browser
// here I am applying headless false because by default it is headless through which it is not visible
let openBrowser = puppeteer.launch({ headless: false });
openBrowser.then(function (browser) {
    // takign the pages array (as pages provides array of an tab)
    const pageArray = browser.pages();
    console.log(pageArray);
    return pageArray;
  })
  .then(function (browserPage) {
    // by default there is only one page in array
    currentPage = browserPage[0];
    console.log(currentPage);
    // by using goto we are openign google
    let openGoogle = currentPage.goto("https://www.google.com/");
    return openGoogle;
  })
  .then(function () {
    // we know that some time some search query take some time to load so we are using waitForSelector to be safe from pending situation.
    let waitForLoading = currentPage.waitForSelector("input[type='text']", {
      visible: true,
    });
    return waitForLoading;
  })
  .then(function () {
    // by using type we are typing twitter on the search bar
    let searchTwitter = currentPage.type("input[type='text']", "twitter");
    return searchTwitter;
  })
  .then(function () {
    // ater searching we are pressing enter on keyboard using press function.
    let pressEnter = currentPage.keyboard.press("Enter");
    return pressEnter;
  })
  .then(function () {
    // to filter out  login link I am using the link class which is in h3 tag and to search for the class we must have to inspect the page.
    let waitforLoadingTwo = currentPage.waitForSelector("h3.LC20lb.MBeuO.DKV0Md",{ visible: true });
    return waitforLoadingTwo;
  })
  .then(function() {
    // clicking on the link using click.
    let clikcOnLinkTwitterLink = currentPage.click("h3.LC20lb.MBeuO.DKV0Md");
    return clikcOnLinkTwitterLink;
  })
  .catch(function(error) {
    // using catch to handle the error
    console.log(error)
  })

console.log("end")


//**************************************direct code to open twitter login page**********************************************//


// const twitterLogin = async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const currentPage = await browser.newPage();
//   let login = await currentPage.goto("https://twitter.com/login");
//   return login;
// };
// twitterLogin();