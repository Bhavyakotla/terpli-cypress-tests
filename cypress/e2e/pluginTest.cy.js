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