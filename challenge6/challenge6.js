require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
let By = webdriver.By;
let Key = webdriver.Key;
let until = webdriver.until;
let name = webdriver.name;
let fs = require('fs');
//let classes = require('../modules/class');

describe("challenge5 lezzzgoooo", function(){
   this.timeout(20000);
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


   it("Search Nissan", function(){
       return driver.findElement(By.id("input-search")).sendKeys("Nissan");
   })

   it("Click Search", function(){
       return driver.findElement(By.xpath('//button[@data-uname="homepageHeadersearchsubmit"]')).click();
   });

   it("Wait for table to load", async function(){
       await driver.wait(until.elementLocated(By.xpath('//table[@id="serverSideDataTable"]//tbody//td')), 20000);
       await driver.wait(until.elementIsVisible(await driver.findElement(By.xpath('//table[@id="serverSideDataTable"]//tbody//td'))), 20000);
   })

   it("Click on Model and expand", async function(){
    await driver.findElement(By.xpath('//a[@data-uname="ModelFilter"]')).click()
   });
   
   it("Search 'skyline' in the searchbox", async function(){
    let searchBox = await driver.findElement(By.xpath('//div[@id="collapseinside4"]/form/div/input'));
    searchBox.sendKeys("skyline");
   });

//    it("Takes screenshot if 'Skyline' doesn't exist", async function(){        
//         try{
//             let skyline = await driver.findElement(By.xpath('//*[@id="collapseinside4"]/ul/li[1]/div/label/abbr'));
//             skyline;
//         }
//         catch(error){
//             console.log(error + " Taking screenshot as 'Skyline.png'");
//             driver.takeScreenshot().then(function(data){
//                 var base64Data = data.replace(/^data:image\/png;base64,/,"")
//                 fs.writeFile("Skyline.png", base64Data, 'base64', function(err){
//                     if(err) console.log(err);
//                 }); 
//             });
//         }        
//     });

    it('Find Skyline, if not there takes screenshot', async function() {
        try {
            let filterCheckbox = await driver.findElement(By.xpath("//*[@id='lot_model_descSKYLINE']"));
            filterCheckbox.click();
            await driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDataTable_processing'), 20000)));
        } catch(e){ //lot_model_descSKYLINEGTR
            let filterCheckbox = await driver.findElement(By.xpath("//*[@id='lot_model_descSKYLINEGTR']"));
            filterCheckbox.click();
            await driver.wait(until.elementIsNotVisible(driver.findElement(By.id('serverSideDataTable_processing'), 20000)));
            driver.takeScreenshot().then(function(data){
                let base64Data = data.replace(/^data:image\/png;base64,/,"");
                fs.writeFile("out.png", base64Data, 'base64', function(err) {
                    if(err) console.log(err);
                });
            });
        }
    });   
});