it.only('independently tests the privacy policy page', () => {
    cy.visit('./src/privacy.html');
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
    cy.contains('p', 'Talking About Testing').should('be.visible');
})