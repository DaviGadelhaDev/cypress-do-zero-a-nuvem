export function stringGen(length) {
    return "A".repeat(length);
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