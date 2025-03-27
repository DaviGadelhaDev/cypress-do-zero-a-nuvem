export function stringGen(length) {
    return "A".repeat(length);
}

export function getPhone() {
    return cy.get('#phone');
}
  
export function fillAndClearFields(fields, values) {
    fields.forEach((selector, index) => {
        cy.get(selector)
            .type(values[index])
            .should('have.value', values[index])
            .clear()
            .should('have.value', '');
    });
}

export const user = {
    firstName: 'Davi',
    lastName: 'Gadelha',
    email: 'davibrgadelha@gmail.com',
    phone: '41984980238'
};
  
export function getFieldSelectors() {
    return ['#firstName', '#lastName', '#email', '#phone'];
}

export function fillRequiredFields() {
    cy.fillMandatoryFieldsAndSubmit({
        firstName: 'Davi',
        lastName : 'Gadelha',
        email : 'davibrgadelha@gmail.com',
        phone  : '123456'
    })
}