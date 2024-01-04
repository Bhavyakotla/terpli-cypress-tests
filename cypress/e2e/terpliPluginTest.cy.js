// Common function used in both test suites
const verifyTerpliPlugin = () => {
    cy.get('#terpli_launcher_button')
      .should('exist', 'Terpli launcher button should be present on the page')
      .click()
      .should('be.visible', 'Terpli launcher button should be visible and clickable');
  
    cy.get('#terpli_app')
      .should('be.visible', 'Terpli plugin modal should be visible after clicking the launcher');
  };
  
  // Terpli Plugin Positioning Tests
  describe('Terpli Plugin Positioning Tests', () => {
    const urls = [
      'https://demo.terpli.io?hwcannabis.co',
      'https://demo.terpli.io?traderoots.buzz',
      'https://demo.terpli.io?livewithsol.com'
    ];
  
    const positions = ['left', 'right'];
  
    const testPluginPosition = (url, position) => {
      cy.visit(url);
      cy.get('#demo_side_select')
        .select(position)
        .should('have.value', position);
  
      cy.window().then(win => {
        win.terpliLoadPlugin();
      });
  
      cy.wait(3000); // Adjust based on expected load time
      verifyTerpliPlugin();
      cy.get('#terpli_floating')
        .should('have.class', `terpli_${position}`, `Terpli plugin should be on the ${position}`);
    };
  
    urls.forEach(url => {
      positions.forEach(position => {
        it(`should test Terpli plugin on ${url} with position ${position}`, () => {
          testPluginPosition(url, position);
        });
      });
    });
  });
  
  // Terpli Plugin Tests
  describe('Terpli Plugin Tests', () => {
    const url = 'https://demo.terpli.io?livewithsol.com';
  
    beforeEach(() => {
      cy.visit(url);
    });
  
    it('Test Launcher Icon Functionality', () => {
      verifyTerpliPlugin();
    });
  
    it('Interact with Multi-Location Dropdown and Test Functionality', () => {
        let errors = [];
        cy.get('#demo_retailer_select').should('exist');
        cy.get('#demo_retailer_select').children('option').each(($option, index) => {
          if (index === 0) return;
      
          const locationValue = $option.val();
          cy.log(`Testing location: ${locationValue}`);
          cy.get('#demo_retailer_select').invoke('val', locationValue).trigger('change');
          cy.wait(1000); // Use a realistic wait time
      
          cy.wrap(null).then(() => {
            try {
              verifyTerpliPlugin();
            } catch (error) {
              errors.push(`Error testing location ${locationValue}: ${error.message}`);
            }
          });
        }).then(() => {
          if (errors.length) {
            throw new Error(`Errors encountered: \n${errors.join('\n')}`);
          }
        });
      });
  });
  