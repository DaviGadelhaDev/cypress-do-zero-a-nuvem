import { stringGen, getFieldSelectors, fillRequiredFields, fillAndClearFields } from '../support/utils';

const user = {
    firstName: 'Davi',
    lastName: 'Gadelha',
    email: 'davibrgadelha@gmail.com',
    phone: '123456'
};

describe('Central of Support to Client', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('Check title', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('Fills the required fields and submits the form', () => { 
        fillRequiredFields();
    });

    it('Displays an error message when submitting the form with an invalid email format', () => {
        cy.get('#email').type('davigadelha');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('Fills and clears the name, email, and phone fields' , () => {
        fillAndClearFields(getFieldSelectors(), ['Davi', 'Gadelha', 'davibrgadelha@gmail.com', '41984980238'])
    });

    it('Displays an error message when submitting an empty form', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('Submit form with success using a custom command', () => {
        cy.fillMandatoryFieldsAndSubmit(user);
    });

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
