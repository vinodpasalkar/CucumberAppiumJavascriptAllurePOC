"use strict";

var wd = require("selenium-webdriver"),
    By = wd.By,
    until = wd.until;

const { Before, Given, When, Then , After } = require('cucumber')
var assert = require('assert');
const { isDeepStrictEqual } = require("util");


let driver;

// Setting Desired Capabilities.
var desiredCaps = {
    
    platformName: "iOS",
    deviceName: "iPhone 12 Pro Max",
    app: "/Users/vinodpasalkar/Downloads/CucumberAppiumJavascriptAllurePOC/MobileApps/AwesomeApp.app",
    automationName: "XCUITest",
    appPackage: "com.awesomeapp",
    appActivity: ".MainActivity",
    browserName: '',
       
};

// Before function for driver initialization
Before( {timeout: 6000 * 10000}, async function () {
    console.log('Before: Connecting to Device.....');  
    driver = await new wd.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();
    console.log('');  
    
})

// Given Function of Cucumber , with Creds
Given(/^The app launches$/, {timeout: 6000 * 1000}, async () => {
    try {
        
    console.log('Given: The app launches... Start');   

    await driver.wait(until.elementLocated(By.xpath("//XCUIElementTypeStaticText[@name=\"Testing instructions\"]"), 1000));
    
    console.log('Given: The app launches... End');   
        
     } catch (error) {    
    }  
});

// When function for Action implementation      
When(/^I slide from the left edge and press the button$/, {timeout: 6000 * 1000}, async () => {  

    console.log('When: I slide from the left edge and press the button... Start');  

    //driver.execute('mobile: swipe', {direction: 'right'});

    // var leftslide = await driver.findElement(By.xpath("//XCUIElementTypeOther[@name=\"leftslide\"]"));
    // await leftslide.click();
    
    var answerButton = await driver.findElement(By.xpath("//XCUIElementTypeOther[@name=\"Get the ultimate answer\"]"));   
    await answerButton.click();

    console.log('When: I slide from the left edge and press the button... End');   
}); 

// Check the Result in Then function
Then(/^I see the alert is displayed$/, {timeout: 6000 * 1000}, async () => {

    console.log('Then: I see the alert is displayed... Start');    

    // Waits until alert comes
    await driver.wait(until.elementLocated(By.xpath("//XCUIElementTypeAlert"), 1000));

    // Checks for the alerts presence
    var alert = await driver.findElements(By.xpath("//XCUIElementTypeAlert"));
    assert.equal(alert.length,1)

    console.log('Then: I see the alert is displayed... End');   
    
});

// After function to release the Driver
After(async function() {
    
    console.log('Disconnecting the driver.....');  
    console.log('');  
    await driver.quit();
  })
