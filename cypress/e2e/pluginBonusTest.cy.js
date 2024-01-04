describe('Terpli Plugin Positioning Tests', () => {
  const urls = [
      'https://demo.terpli.io?hwcannabis.co',
      'https://demo.terpli.io?traderoots.buzz',
      'https://demo.terpli.io?livewithsol.com'
  ];

  const positions = ['left', 'right'];

  urls.forEach(url => {
      positions.forEach(position => {
          it(`should test Terpli plugin on ${url} with position ${position}`, () => {
              cy.visit(url);

              // Select position from dropdown
              cy.get('#demo_side_select')
                .select(position)
                .should('have.value', position);

              // Reinitialize the plugin to apply new position
              cy.window().then((win) => {
                  win.terpliLoadPlugin();
              });

              // Wait for reinitialization
              cy.wait(1000); // Adjust based on expected load time

              // Verify Terpli launcher button presence
              cy.get('#terpli_launcher_button')
                .should('exist', 'Terpli launcher button should be present on the page')
                .then((launcher) => {
                    // Trigger Terpli launcher button
                    cy.wrap(launcher).click()
                      .should('be.visible', 'Terpli launcher button should be visible and clickable');

                    // Confirm Terpli plugin (modal) display
                    cy.get('#terpli_app')
                      .should('be.visible', 'Terpli plugin modal should be visible after clicking the launcher');
                });

              // Additional step: Verify plugin position
              cy.get('#terpli_floating')
                  .should('have.class', `terpli_${position}`, `Terpli plugin should be on the ${position}`);
          });
      });
  });
});


describe('Terpli Plugin Tests', () => {
  // URL of the website to test
  const url = 'https://demo.terpli.io?livewithsol.com';

  beforeEach(() => {
    // Visits the website before each test
    cy.visit(url);
  });

  // Function to test launcher functionality
  const testLauncherFunctionality = () => {
    cy.get('#terpli_launcher_button')
      .should('exist', 'Terpli launcher button should be present on the page')
      .click()
      .should('be.visible', 'Terpli launcher button should be visible and clickable');

    cy.get('#terpli_app')
      .should('be.visible', 'Terpli plugin modal should be visible after clicking the launcher')
      .then($app => {
        // If the modal is visible, this block will execute
        // Additional checks or actions can be added here if needed
      });
  };

  it('Test Launcher Icon Functionality', () => {
    testLauncherFunctionality();
  });

  it('Interact with Multi-Location Dropdown and Test Functionality', () => {
    // Test D: Locate and interact with the dropdown menu
    cy.get('#demo_retailer_select').should('exist');

    // Retrieve all options from the dropdown
    cy.get('#demo_retailer_select').children('option').each(($option, index, $list) => {
      if (index === 0) return; // Skip the first option if it's not actionable

      const locationValue = $option.val();

      // Log the location being tested
      cy.log(`Testing location: ${locationValue}`);

      // Manually set the value of the dropdown and trigger the change event
      cy.get('#demo_retailer_select').invoke('val', locationValue).trigger('change');

      // Wait for potential dynamic content loading (adjust the wait time as necessary)
      cy.wait(1000); // Use a realistic wait time

      // Test launcher functionality for the selected location
      cy.wrap(null).then(() => {
        try {
          testLauncherFunctionality();
        } catch (error) {
          // Log the error and continue with the next iteration
          cy.log(`Error testing location ${locationValue}: ${error.message}`);
        }
      });
    });
  });
});
