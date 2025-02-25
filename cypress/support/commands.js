Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user) => {
    Object.entries(user).forEach(([key, value]) => {
        cy.get(`#${key}`).type(value);
    });

    cy.get('textarea').type('testando textarea', {delay : 0});
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
}) 
  