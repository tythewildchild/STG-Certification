require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
let By = webdriver.By;
let Key = webdriver.Key;
let until = webdriver.until;


describe("challenge2 suite", function(){
   this.timeout(20000);
   var driver;
   before(function () {
       // initializing chrome driver
       driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
       driver.manage().window().maximize();
   });


/*  Keeping the browser open after testing is complete

   after(function () {
       return driver.quit();
   });
*/
   it("I open the copart website", function() {
       return driver.get("http://www.copart.com");
   });

   it("The title is correct", async function() {
       // Since we want the title from the page, we need to manually handle the Promise
        let title = await driver.getTitle();
        return assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
   });
 
   it("Search exotics", async function(){
        await driver.findElement(By.id("input-search")).sendKeys("exotic", Key.RETURN);
   });

   it("Waits for the table to load", async function(){
        await driver.wait(until.elementLocated(By.xpath('//*[@id="serverSideDataTable"]')), 5000);
        await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//span[@data-uname="lotsearchLotmake"]'))), 5000);

   });

   it("Verify porsche in the list of cars", async function(){
    let makes = await driver.findElements(By.xpath('//table[@id="serverSideDataTable"]//td/span[@data-uname="lotsearchLotmake"]'));
    for(let i = 0; i < makes.length; i++){
        let curMake = await makes[i].getText();
        if(curMake == "PORSCHE"){
            return assert.equal(curMake, "PORSCHE");
        }
    }
    //assert.equal(title, "porsche For Auction at Copart - Salvage Cars For Sale");
   });
});

