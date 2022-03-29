Feature: Verify the home screen tabs

    @SmokeTest
    Scenario: Check the home screen tabs
        Given The app launches
        When I see the home screen
        Then I see Settings and Dashboard tabs are loaded