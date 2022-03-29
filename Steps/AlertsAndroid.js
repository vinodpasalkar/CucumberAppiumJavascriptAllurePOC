"use strict";

var wd = require("selenium-webdriver"),
    By = wd.By,
    until = wd.until,
    touchAction = wd.touchAction,
    js = wd.JavascriptExecutor;

const Timeout = require('smart-timeout');
const { Before, Given, When, Then , After } = require('cucumber')
var assert = require('assert');
const { isDeepStrictEqual } = require("util");
const { Browser } = require("selenium-webdriver");

let asserters = wd.asserters;
let driver;

// describe('Appium Gestures', () => {
//     // Before each test we are going to...
//     beforeEach(async () => {
//       // Restart the app so it will start in the correct state
//       await restartApp();
//       // Wait for the Swipe tab to be shown, then we know the app is loaded
//       await $('~Swipe').waitForDisplayed();
//       // Go to the swipe screen by clicking on the Swipe tab bar button and wait for it
//       await $('~Swipe').click();
//       // Wait for the swipe screen so we can interact with it
//       await $('~Swipe').click();
//       // Wait for the swipe screen so we can interact with it
//       await $('~Swipe-screen').waitForDisplayed();
//     });

// Setting Desired Capabilities.
var desiredCaps = {
    
    platformName: "Android",
    deviceName: "emulator-5554",
    app: "/Users/vinodpasalkar/Downloads/CucumberAppiumJavascriptAllurePOC/MobileApps/AwesomeApp.apk",
    automationName: "UiAutomator2",
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
    
    await driver.wait(until.elementLocated(By.xpath("//android.widget.TextView[@text=\"Testing instructions\"]"), 1000));

    console.log('Given: The app launches... End');   
        
     } catch (error) {    
    }  
});

// When function for Action implementation      
When(/^I slide from the left edge and press the button$/, {timeout: 6000 * 1000}, async () => {

    console.log('When: I slide from the left edge and press the button... Start');
    
    // Solution 1:  TypeError: element1.touchAction is not a function
    // const element1 = await driver.wait(until.elementLocated(By.xpath("//android.widget.TextView[@text=\"Testing instructions\"]"), 1000));
    // const element2 =  await driver.findElement(By.xpath("//android.view.ViewGroup[contains(@resource-id,\"leftslide\")]"));
    // await element1.touchAction([
    //     'press',
    //     { action: 'moveTo', element: element2 },
    //     'release'
    // ])


    // Solution 2:  TypeError: Cannot read property 'ELEMENT' of undefined
    // const element =  await driver.findElement(By.xpath("//android.view.ViewGroup[contains(@resource-id,\"leftslide\")]"));
    // driver.execute('mobile: scroll', {direction: 'right'});
    // driver.execute('mobile: scroll', {direction: 'right', element: element.value.ELEMENT});

    // Solution 3:   ReferenceError: JavascriptExecutor is not defined
    // js = new JavascriptExecutor(driver);
    // let params = new Map([]);
    // params.set("direction", "right");
    // params.set("order", "next");
    // params.set("offset", 0.15);
    // js.executeScript('mobile: swipe', params);

    // Solution 4: TypeError: driver.touchPerform is not a function
    // driver.touchPerform([
    //     { action: 'press', options: { x: 100, y: 250 }},
    //     { action: 'wait', options: { ms: 100 }},
    //     { action: 'moveTo', options: { x: 300, y: 100 }},
    //     { action: 'release' }
    //   ]);


    // Solution 5: ReferenceError: Cannot access 'touchAction' before initialization
    //const touchAction = new touchAction(driver);
    // action.press({ x: 10, y: 200 }).wait(1000).moveTo({ x: 200, y: 300 }).release();
    // return this._driver.performTouchAction(action);


    // Solution 6:  TypeError: Cannot read property 'touchPerform' of undefined
    // await touchAction.touchPerform([
    //     { action: 'press', x: 10, y: 200 },
    //     { action: 'moveTo', x: 200, y: 300 },
    //     'release'
    // ])

    // Solution 7: TypeError: driver.touchAction is not a function
    // let driver = await new wd.Builder().usingServer("http://127.0.0.1:4723/wd/hub").withCapabilities(desiredCaps).build();
    // driver.touchAction([
    // { action: 'press', x: 10, y: 300 },
    // { action: 'moveTo', x: 200, y: 400 },
    // 'release'
    // ])
    
    // Solution 8: TypeError: driver.touchAction is not a function
    //driver.touchAction([ { action: 'press', options: { x: 100, y: 250 }}, { action: 'moveTo', options: { x: 300, y: 100 }}, { action: 'release' } ]);

    // Solution 9:TypeError: touchAction is not a function
    //touchAction(driver).press(100,100).wait(1000).move_to(300,100).release().perform()

    // Solution 10: TypeError: wd.TouchAction is not a constructor
    // let action = new wd.TouchAction();
    // action.press({x: 10, y: 10});
    // action.moveTo({x: 50, y: 50});
    // await action.perform();

    const answerButton = await driver.findElement(By.xpath("//android.widget.TextView[contains(@resource-id,\"sidemenuButton\")]"));
    await answerButton.click();

    console.log('When: I slide from the left edge and press the button... End');    
}); 

// Check the Result in Then function
Then(/^I see the alert is displayed$/, async () => {

    console.log('Then: I see the alert is displayed... Start');    

    // Waits until alert comes
    await driver.wait(until.elementLocated(By.xpath("//android.widget.TextView[contains(@resource-id,\"android:id/alertTitle\")]"), 1000));

    // Checks for the alerts presence
    var alert = await driver.findElements(By.xpath("//android.widget.TextView[contains(@resource-id,\"android:id/alertTitle\")]"));
    assert.equal(alert.length,1)

    console.log('Then: I see the alert is displayed... End');    
    
});

// After function to release the Driver
After(async function() {
    
    console.log('Disconnecting the driver.....');  
    console.log('');  
    await driver.quit();
  })
