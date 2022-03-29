"use strict";

var wd = require("selenium-webdriver"),
    By = wd.By,
    until = wd.until;

const { Before, Given, When, Then , After } = require('cucumber')
var assert = require('assert');
const assertions = require("chai/lib/chai/core/assertions");


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
When(/^I see the home screen$/, async () => {  

    console.log('When: I see the home screen... Start');  

    // Automation commands.
    
    var homeScreenTitle = await driver.findElements(By.xpath("//XCUIElementTypeStaticText[@name=\"Testing instructions\"]"));
    assert.equal(homeScreenTitle.length, 1);

    console.log('When: I see the home screen... End');   
}); 

// Check the Result in Then function
Then(/^I see Settings and Dashboard tabs are loaded$/, async () => {

    console.log('Then: I see Settings and Dashboard tabs are loaded... Start');    

    // Checks for the tabs presence
    var settingTab = await driver.findElements(By.xpath("//XCUIElementTypeButton[@name=\"Settings tab\"]"));
    assert.equal(settingTab.length,1)


    var dashboardTab = await driver.findElements(By.xpath("//XCUIElementTypeButton[@name=\"Dashboard tab\"]"));
    assert.equal(dashboardTab.length,1)
    
    console.log('Then: I see Settings and Dashboard tabs are loaded... End');   
    
});

// After function to release the Driver
After(async function() {
    
    console.log('Disconnecting the driver.....');  
    console.log('');  
    await driver.quit();
  })
