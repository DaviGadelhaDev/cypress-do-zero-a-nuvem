import { 
    getPhone, 
    getFieldSelectors, 
    fillRequiredFields, 
    fillAndClearFields, 
    user 
} from '../support/utils';

describe('Customer Support Center', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('Checks the page title', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it.only('Fills required fields and submits the form', () => { 
        cy.clock();
        fillRequiredFields();
        cy.get('.success').should('be.visible');
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    });

    it('Displays an error message for invalid email format', () => {
        cy.get('#email').type('davigadelha');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('Fills and clears the name, email, and phone fields', () => {
        fillAndClearFields(getFieldSelectors(), ['Davi', 'Gadelha', 'davibrgadelha@gmail.com', '41984980238']);
    });

    it('Displays an error message when submitting an empty form', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('Submits form successfully using a custom command', () => {
        cy.fillMandatoryFieldsAndSubmit(user);
        cy.get('.success').should('be.visible');
    });

    context('Product Selection', () => {
        it('Selects YouTube by name', () => {
            cy.get('#product').select('YouTube').should('have.value', 'youtube');
        });

        it('Selects Mentoria by value', () => {
            cy.get('#product').select('mentoria').should('have.value', 'mentoria');
        });

        it('Selects Blog by index', () => {
            cy.get('#product').select(1).should('have.value', 'blog');
        });
    });

    context('Service Type Selection', () => {
        it('Checks the "Feedback" service type', () => {
            cy.get('input[type="radio"]').check('feedback').should('be.checked');
        });

        it('Checks each service type', () => {
            cy.get('input[type="radio"]').each(($radio) => {
                cy.wrap($radio).check().should('be.checked');
            });
        });
    });

    context('Checkbox Interaction', () => {
        it('Checks both checkboxes and then unchecks the last', () => {
            cy.get('#check input[type="checkbox"]').as('checkboxes').check();

            cy.get('@checkboxes').each(($checkbox) => {
                cy.wrap($checkbox).check().should('be.checked');
            });

            cy.get('@checkboxes').last().uncheck().should('not.be.checked');
        });
    });

    context('Privacy Policy', () => {
        it('Verifies privacy policy opens in a new tab', () => {
            cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank');
        });

        it('Accesses privacy policy by removing target attribute', () => {
            cy.contains('a', 'Política de Privacidade')
                .invoke('removeAttr', 'target')
                .click();
            

            cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
        });
    });

    context('File Upload', () => {
        it('Uploads a file from fixtures folder', () => {
            cy.get('#file-upload')
                .selectFile('cypress/fixtures/example.json')
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json');
                });
        });

        it('Simulates file drag-and-drop', () => {
            cy.get('#file-upload')
                .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json');
                });
        });

        it('Selects a file using fixture alias', () => {
            cy.fixture('example.json', null).as('myFixture');
            cy.get('#file-upload')
                .selectFile('@myFixture')
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json');
                });
        });
    });

    context('Phone Field Validation', () => {
        it('Clears phone field when non-numeric characters are entered', () => {
            getPhone().type('abcdef').should('have.value', '');
        });

        it('Clears phone field when special characters are entered', () => {
            getPhone().type('@#%&*').should('have.value', '');
        });

        it('Allows only numeric characters when mixed input is entered', () => {
            getPhone().type('123ab@456').should('have.value', '123456');
        });

        it('Displays error if phone is required but not filled before submission', () => {
            fillRequiredFields();
            cy.get('#phone-checkbox').check().should('be.checked'); 
            cy.wait(100); 
            getPhone().should('have.value', ''); 
            cy.get('button[type="submit"]').click(); 
            cy.get('.error').should('be.visible'); 
        });

        it('Accepts valid numeric input', () => {
            getPhone().type('123456').should('have.value', '123456');
        });
    });
});