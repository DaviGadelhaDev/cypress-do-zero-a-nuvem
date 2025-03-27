Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user = {
    //Default values
    firstName: 'Tavares',
    lastName: 'Gadelha',
    email: 'tavares@gmail.com',
    phone: '85981210238'
}) => {
    Object.entries(user).forEach(([key, value]) => {
        cy.get(`#${key}`).type(value);
    });

    cy.get('textarea').type('testando textarea', {delay : 0});
    cy.get('button[type="submit"]').click();
}) 
  