import { getPhone, getFieldSelectors, fillRequiredFields, fillAndClearFields, user } from '../support/utils';

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
        cy.get('.success').should('be.visible');
    });

    it('Select product Youtube by your name', () => {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('Select product Mentoria by your value', () => {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('Select product Blog by your indice', () => {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('Check the type of service "Feedback"', () => {
       cy.get('input[type="radio"]').check('feedback').should('be.checked')
    })

    it('Check each type of service', () => {
        cy.get('input[type="radio"]').each(($radio) => {
            cy.wrap($radio).check().should('be.checked')
        })
    })

    it('Check both checkboxs and then uncheck the last', () => {
        cy.get('#check input[type="checkbox"]')
            .as('checkboxes')
            .check()

        //Verification
        cy.get('@checkboxes').each(($checkbox) => {
            cy.wrap($checkbox).check().should('be.checked')
        })

        //uncheck the last
        cy.get('@checkboxes').last().uncheck().should('not.be.checked')
    })

    context('Select a file', () => {
        it('Select a file from the fixtures folder', () => {
            cy.get('#file-upload')
                .selectFile('cypress/fixtures/example.json')
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                })
        })

        it('Select a file by simulating a drag-and-drop', () => {
            cy.get('#file-upload')
                .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                })
        })

        it('Selects a file using fixture', () => {
            cy.fixture('example.json',  null).as('myFixture')
            cy.get('#file-upload')
                .selectFile('@myFixture')
                .then(input => {
                    console.log(input)
                    expect(input[0].files[0].name).to.equal('example.json')
                })
        })
    })

    context('Check phone field', () => {
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
