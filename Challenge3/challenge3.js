require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
let By = webdriver.By;
let Key = webdriver.Key;
let until = webdriver.until;

describe("challenge3 lezzzgoooo", function(){
   this.timeout(40000);
   var driver;
   before(function () {
       // initializing chrome driver
       driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
   });

   /* This will let me keep my browser open after test is run
   after(function () {
       return driver.quit();
   });
   */

   it("I open the copart website", function() {
       return driver.get("http://www.copart.com");
   });

   it("Verify the page title as 'auto auction'", async function(){
        // Since we want the title from the page, we need to manually handle the Promise
        return driver.getTitle().then(function(title) {
            assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
        });
   });

   it("Grab data of popular products and print out the name and the URL", async function(){
        let popularCars = await driver.findElements(By.xpath('//div[@ng-if="popularSearches"]//li//a'));
        for (let i = 0; i < popularCars.length; i++){
            let popularCar = popularCars[i];
            console.log(i+1 + ". " + await popularCar.getText() + " - " + await popularCar.getAttribute('href'));
        }
   });

});

