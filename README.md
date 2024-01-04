# Terpli Plugin Cypress Tests

## Project Description

This project contains automated Cypress tests designed to verify the functionality of the Terpli chatbot-like plugin across multiple dispensaries' websites. The plugin should be accessible via a launcher icon, and upon interaction, a modal with a "Get Started" page is expected to be displayed.

## Background

The Terpli plugin aims to provide an enhanced interactive experience for users visiting dispensary websites. The primary objective of these tests is to ensure the plugin's availability and functionality are consistent and reliable across various service locations.

## Scope

The Cypress test suite addresses the following:
- Verifies the presence of the Terpli launcher button on multiple web pages.
- Ensures the plugin's modal is correctly displayed when the launcher is triggered.
- Continues to test across all provided locations, even if a failure is encountered at a single location.

## Thought Process

The tests were developed with an emphasis on reusability and robustness, allowing for easy extension to other sites and features. An iterative approach was adopted to cycle through different web pages and positions, ensuring comprehensive coverage. Error handling was implemented to capture and report failures without disrupting the test flow.

## Code Quality

Clean and maintainable code was a priority, with functions like `verifyTerpliPlugin` abstracting common actions. This reduces code duplication and eases future modifications. Parameters such as URLs and positions are managed through arrays, facilitating easy iteration and expansion.

## Functionality

The test suite fulfills the following criteria:
- Confirms the presence of the Terpli launcher button.
- Simulates user interaction to trigger the launcher.
- Validates the display of the modal post-interaction.
- Gracefully handles any location-specific failures, ensuring comprehensive testing.

## Instructions for Running the Project

### Prerequisites
- Ensure Node.js and npm are installed on your system.
- Cypress should be installed to run these tests.

### Setup and Execution
1. Clone the GitHub repository to your local machine.
2. Open a terminal and navigate to the cloned project's directory.
3. Install the required node modules (including Cypress) by running, **npm install**
4. To open Cypress and run the tests, execute: **npx cypress open**
5. In the Cypress Test Runner interface that opens, click on the test suite 'terpliPluginTest.cy.js' present in the e2e folder within the cypress directory.

### Assumptions
- For the non-bonus part, for verifying the presence of the Terpli launcher icon and its functionality to display the plugin upon clicking: I assumed that location here means the 'left' and 'right' position of the Terpli launcher since the dropdown for the first two websites does not have more than one location.
- For error logging, the following practices were followed:
1. Pass/Fail Status Indication: Cypress inherently provides a clear indication of pass or fail status for each test case. If a test passes, it's marked as such in the Cypress test runner. If a test fails, the test runner highlights the failed test.
2. Error Messages Pinpointing Failures by Each Location: a) In the "Interact with Multi-Location Dropdown and Test Functionality" test, if an error occurs during the testing of a specific location, the catch block within the cy.wrap(null).then(() => {...}) construct logs the error message along with the location value. This fulfills the requirement of pinpointing failures by each location.
b) However, the error logging is done through cy.log(), which is more of a diagnostic log and may not cause the test to fail in Cypress. The test will continue executing for all locations regardless of any individual failure.


### Additional Notes

- The Cypress Test Runner provides a detailed log for each test command, aiding in debugging and analysis.
- Tests are designed to loop through a list of URLs and screen positions systematically, verifying the Terpli plugin's functionality at each step.
- The multi-location dropdown interaction is a bonus feature, tested within a single execution sequence for efficiency.
