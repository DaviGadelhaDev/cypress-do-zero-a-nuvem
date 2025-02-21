function stringGen(length) {
  return "A".repeat(length);
}

function fillRequiredFields() {
  cy.get('#firstName').type('Davi');
  cy.get('#lastName').type('Gadelha');
  cy.get('#email').type('davibrgadelha@gmail.com');
  cy.get('textarea').type('testando textarea', { delay: 0 });
}

function getFieldSelectors() {
  return ['#firstName', '#lastName', '#email', '#phone'];
}

describe('Central of support to Client', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('Check title', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('Fills the required fields and submits the form', () => { 
    fillRequiredFields();
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
  });

  it('Displays an error message when submitting the form with an invalid email format', () => {
    cy.get('#email').type('davigadelha');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  });

  it('Fills and clears the name, email and phone fields' ,() => {
    const field = getFieldSelectors()
    const values = ['Davi', 'Gadelha', 'davibrgadelha@gmail.com', '41984980238']

    field.forEach((selector, index) => {
      cy.get(selector)
      .type(values[index])
      .should('have.value', values[index])
      .clear()
      .should('have.value', '')
    })
  });

  it('Displays an error message when submitting an empty form', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  context('Check phone field', () => {
    function getPhone() {
      return cy.get('#phone');
    }

    it('Should clear the phone field when non-numeric input (letters) is entered', () => {
      getPhone().type('abcdef').should('have.value', '');
    });

    it('Should clear the phone field when special characters are entered', () => {
      getPhone().type('@#%&*').should('have.value', '');
    });

    it('Should contain only numeric characters when a mixed value is entered', () => {
      getPhone().type('123ab@456').should('have.value', '123456');
    });

    it('Displays an error message when the phone becomes required but isn’t filled before submitting the form', () => {
      fillRequiredFields(); 
      cy.get('#phone-checkbox').check().should('be.checked'); 
      cy.wait(100); 
      getPhone().should('have.value', ''); 
      cy.get('button[type="submit"]').click(); 
      cy.get('.error').should('be.visible'); 
    });

    it('Should accept normally', () => {
      getPhone().type('123456').should('have.value', '123456');
    });
  });
});
