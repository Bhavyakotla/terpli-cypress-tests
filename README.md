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
3. Install the necessary dependencies with the command:
4. To open Cypress and run the tests, execute:
5. In the Cypress UI, select the test file you wish to run.

### Additional Notes

- The Cypress Test Runner provides a detailed log for each test command, aiding in debugging and analysis.
- Tests are designed to loop through a list of URLs and screen positions systematically, verifying the Terpli plugin's functionality at each step.
- The multi-location dropdown interaction is a bonus feature, tested within a single execution sequence for efficiency.
