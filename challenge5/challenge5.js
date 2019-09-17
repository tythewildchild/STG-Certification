require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
let By = webdriver.By;
let Key = webdriver.Key;
let until = webdriver.until;
let name = webdriver.name;
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


   it("Search porsche", function(){
       return driver.findElement(By.id("input-search")).sendKeys("porsche");
   })

   it("Click Search", function(){
       return driver.findElement(By.xpath('//button[@data-uname="homepageHeadersearchsubmit"]')).click();
   });

   it("Select 100 entries", async function(){
       await driver.wait(until.elementLocated(By.xpath('//table[@id="serverSideDataTable"]//tbody//td')), 200000);
       let entriesSelector = await driver.findElement(By.xpath('//select[@name="serverSideDataTable_length"]/option[@value="100"]'));
       await entriesSelector.click();
   });
       
   
   it("Wait's for the loading image to disappear", async function(){
    let buffering = await driver.findElement(By.xpath('//*[@id="serverSideDataTable_processing"]'), 20000);    
    await driver.wait(until.elementIsNotVisible(buffering));
   });
   
   it("Prints models and how many of each", async function(){
       //await driver.wait(until.elementLocated(By.xpath('//table[@id="serverSideDataTable"]//tbody//tr')), 200000);
       let carModels = await driver.findElements(By.xpath('//table[@id="serverSideDataTable"]//td/span[@data-uname="lotsearchLotmodel"]'));
       let carModelsText = [];
       let sameModelCount = 1;
       for (let i = 0; i < carModels.length; i++){
            carModelsText.push(await carModels[i].getText());
        }
        console.log(carModelsText);
        carModelsText.sort();
       
        for(let i = 0; i < carModelsText.length; i++){
            
            if(carModelsText[i] == carModelsText[i+1]){
                sameModelCount += 1;
            }
            else{
               if(sameModelCount > 1){
                    console.log("There are ", sameModelCount, carModelsText[i] + "s");
                  }
               else{
                    console.log("There is ", sameModelCount, carModelsText[i]);
                  }
               sameModelCount = 1;
            }
         }
      });
   
    
    it("prints damage type and how many", async function(){
        let damages = await driver.findElements(By.xpath("//*[@data-uname='lotsearchLotdamagedescription']")); 
        let damagesText = [];
        

        for (let i = 0; i < damages.length; i++){
            damagesText.push(await damages[i].getText());
        }

        let counter = {
            rear: 0,
            front: 0,
            dent: 0,
            under: 0,
            misc: 0
        }
        for(let i = 1; i < damagesText.length; i++){
            
            switch(damagesText[i]){
                case 'REAR END':
                    counter.rear += 1;
                    break;
                case 'FRONT END':
                    counter.front += 1;
                    break;
                case 'MINOR DENT/SCRATCHES':
                    counter.dent += 1;
                    break;
                case 'UNDERCARRIAGE':
                    counter.under += 1;
                    break;
                default:  
                    counter.misc += 1;
            }
        }
        
        console.log("Rear Damages: " + counter.rear);
        console.log("Front Damages: " + counter.front);
        console.log("Minor Dent/Scracth Damages: " + counter.dent);
        console.log("Under Damages: " + counter.under);
        console.log ("MISC Damages: " + counter.misc);
    });

});