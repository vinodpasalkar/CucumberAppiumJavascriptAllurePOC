Feature: Verify the alert from the left slide

    @SanityTest
    Scenario: Check the alert from the left slide
        Given The app launches
        When I slide from the left edge and press the button
        Then I see the alert is displayed