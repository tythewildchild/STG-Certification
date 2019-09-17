require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
let By = webdriver.By;
let Key = webdriver.Key;
let until = webdriver.until;
let name = webdriver.name;
var fs = require('fs');
//let classes = require('../modules/class');



describe("challenge7 I'm on my way!", function(){
   this.timeout(120000);
   var driver;
   before(function () {
       // initializing chrome driver
       driver = new webdriver.Builder()
       .withCapabilities(webdriver.Capabilities.chrome())
       .build();
       driver.manage().window().maximize();
   });
   
//    after(function () {
//        return driver.quit();
//    });

   it("Open copart website", function(){
        return driver.get("https://copart.com");
   });

    it("Verify title for website", async function(){
       //classes.verifyTitle('Auto Auction - Copart USA - Salvage Cars For Sale');
    let title = await driver.getTitle();
    return assert.equal(title, "Auto Auction - Copart USA - Salvage Cars For Sale");
    });

    it("Verifies links for Makes and Models on main page", async function(){
        var makes = await driver.findElements(By.xpath('//div[@ng-if="popularSearches"]//a'));
        var makesText = [];
        var makesURL = [];
        var twoDarr = [];
        for(let i = 0; i < makes.length; i++){
            makesText.push(await makes[i].getText());
            makesURL.push(await makes[i].getAttribute('href'));
            twoDarr.push([makesText[i], makesURL[i]]);          
        }
        
        for(let i = 0; i < makes.length; i++){
            if(i < makes.length/2){
                await driver.get(twoDarr[i][1]);
                let buffering = await driver.findElement(By.xpath('//*[@id="serverSideDataTable_processing"]'), 20000);    
                await driver.wait(until.elementIsNotVisible(buffering));
                let table = await driver.findElement(By.xpath('//*[@id="serverSideDataTable"]/tbody/tr[1]/td[6]/span')).getText()
                await assert.include(table, twoDarr[i][0]);
                console.log(i + 1 + "." + twoDarr[i][0] + " - 'Verified'");
            }
            else if(i >= makes.length/2){
                await driver.get(twoDarr[i][1]);
                let buffering = await driver.findElement(By.xpath('//*[@id="serverSideDataTable_processing"]'), 20000);    
                await driver.wait(until.elementIsNotVisible(buffering));
                let table = await driver.findElement(By.xpath('//*[@id="serverSideDataTable"]/tbody/tr[1]/td[5]/span')).getText()
                await assert.include(table, twoDarr[i][0]);
                console.log(i + 1 + "." + twoDarr[i][0] + " - 'Verified'");
            }
        }
    });
});

