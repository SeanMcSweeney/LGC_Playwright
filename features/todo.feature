Feature: Navigate to TodoMVC and modify the TODO list

  Scenario: Navigate to TodoMVC and modify the TODO list
    Given I am on the TodoMVC application
    And the url is correct
    When I add a TODO item with text TODO 1 - and today's date
    And I see TODO 1 - and today's date in the list
    And I add a TODO item with text TODO 2 - and tomorrow's date
    And I mark TODO 1 - as completed
    And TODO 1 - is displayed as completed
    And I delete TODO 2 -
    Then TODO 2 - should no longer be in the list