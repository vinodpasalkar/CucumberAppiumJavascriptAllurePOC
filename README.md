# Cucumber, Appium, Javascript and allure report Example
This project demonstrates usage of Cucumber and Appium for Mobile Automation using JavaScript as Programming language.

This example will cover:

Basic Test for Mobile Automation using Cucumber and Appium with JavaScript as programming language and Visual Studio Code as IDE

### Set up steps

1. Clone this git repository
	```
	git clone
	```
   Open the cloned project in Visual Studio Code

2. Downlaod and install appium
   Start Appium Server using Appium Desktop installed in your PC.
   The project expects the Appium Server to run on localhost:4723. If you run the server to different host and port. Please change the code.

3. Mobile app location - This code is developed and ran on mac , so in casse you use other OS , pleasse change the path accordingly.

4. Install Android and iOS emulator/simulator and start the same.

5. Modify following variables in the code if necessary
   Open the respective .js and modify the code if necessary,

      Appium Server listening host and port.

      ```
       driver = await new wd.Builder().usingServer("http://localhost:4723/wd/hub").withCapabilities(desiredCaps).build();
      ```

      Device name (After executing adb devices. See "Initializing the driver" in the blog)

      ```
      deviceName: "emulator-5554"
      ```
      
6. Goto Terminal and execute below commands
       1 . cd path to the project folder
       2 . To build the project : npm install
       3 . Install alure : brew install allure
       3 . To run the test  : execute below command one at a time

       To run features for android app
       ./node_modules/.bin/cucumber-js ./Features/HomeTabs -r ./Steps/HomeTabsAndroid.js && allure generate --clean
       ./node_modules/.bin/cucumber-js ./Features/Alerts -r ./Steps/AlertsAndroid.js && allure generate --clean


       To run feature for iOS app
       ./node_modules/.bin/cucumber-js ./Features/HomeTabs -r ./Steps/HomeTabsIos.js && allure generate --clean
       ./node_modules/.bin/cucumber-js ./Features/Alerts -r ./Steps/AlertsIos.js && allure generate --clean

       To see the report
       allure open allure-report

       References: 
       https://docs.qameta.io/allure/#_report_generation

      allure generate allure-results --clean --allow-file-access-from-files && allure open
         
