// Common function for verifying Terpli Plugin visibility and interactivity
const verifyTerpliPlugin = () => {
  // Wait for the Terpli launcher button to exist and be visible, then click it
  cy.get('#terpli_launcher_button', { timeout: 5000 })
    .should('exist', 'Terpli launcher button should be present on the page')
    .click()
    .should('be.visible', 'Terpli launcher button should be visible and clickable');

  // Ensure that the Terpli plugin modal is visible after clicking the launcher
  cy.get('#terpli_app', { timeout: 5000 })
    .should('be.visible', 'Terpli plugin modal should be visible after clicking the launcher');
};

// Suite to test Terpli Plugin positioning on different URLs
describe('Terpli Plugin Positioning Tests', () => {
// URLs to test
const urls = [
  'https://demo.terpli.io?hwcannabis.co',
  'https://demo.terpli.io?traderoots.buzz',
  'https://demo.terpli.io?livewithsol.com'
];

// Positions to test ('left' and 'right')
const positions = ['left', 'right'];

// Function to test Terpli plugin positioning
const testPluginPosition = (url, position) => {
  cy.visit(url); // Visit the URL
  // Select the position in the dropdown and verify it's selected
  cy.get('#demo_side_select')
    .select(position)
    .should('have.value', position);

  // Trigger Terpli plugin load
  cy.window().then(win => {
    win.terpliLoadPlugin();
  });

  // Verify plugin visibility and assert its position
  verifyTerpliPlugin();
  cy.get('#terpli_floating', { timeout: 5000 })
    .should('have.class', `terpli_${position}`, `Terpli plugin should be on the ${position}`);
};

// Iterate over URLs and positions to test all combinations
urls.forEach(url => {
  positions.forEach(position => {
    it(`should test Terpli plugin on ${url} with position ${position}`, () => {
      testPluginPosition(url, position);
    });
  });
});
});

// Suite for general Terpli Plugin tests
describe('Terpli Plugin Tests', () => {
const url = 'https://demo.terpli.io?livewithsol.com';

// Before each test, visit the URL
beforeEach(() => {
  cy.visit(url);
});

// Test launcher icon functionality
it('Test Launcher Icon Functionality', () => {
  verifyTerpliPlugin();
});

// Test interacting with the multi-location dropdown
it('Interact with Multi-Location Dropdown and Test Functionality', () => {
  let errors = []; // Array to collect errors
  // Ensure the dropdown exists and iterate over its options
  cy.get('#demo_retailer_select', { timeout: 5000 }).should('exist');
  cy.get('#demo_retailer_select').children('option').each(($option, index) => {
    if (index === 0) return; // Skip the first option (usually a placeholder)

    const locationValue = $option.val();
    cy.log(`Testing location: ${locationValue}`);
    cy.get('#demo_retailer_select').invoke('val', locationValue).trigger('change');
    
    // Verify plugin visibility for each location
    verifyTerpliPlugin();

    cy.wrap(null).then(() => {
      try {
        verifyTerpliPlugin();
      } catch (error) {
        errors.push(`Error testing location ${locationValue}: ${error.message}`);
      }
    });
  }).then(() => {
    // Throw an error if any were encountered during testing
    if (errors.length) {
      throw new Error(`Errors encountered: \n${errors.join('\n')}`);
    }
  });
});
});
