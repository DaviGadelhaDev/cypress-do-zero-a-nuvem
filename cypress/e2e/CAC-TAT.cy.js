// 🔹 Funções auxiliares globais (acessíveis a todos os testes)
function stringGen(length) {
  return "A".repeat(length);
}

function preencheCamposObrigatorios() {
  cy.get('#firstName').type('Davi');
  cy.get('#lastName').type('Gadelha');
  cy.get('#email').type('davibrgadelha@gmail.com');
  cy.get('textarea').type('testando textarea', { delay: 0 });
}

describe('Central de Atendimento ao Cliente', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('Verifica título', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => { 
    preencheCamposObrigatorios();
    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#email').type('davigadelha');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  });

  describe('Validação do campo de telefone', () => {
    // 🔹 Função auxiliar específica para este describe
    function getPhone() {
      return cy.get('#phone');
    }

    it('Deve ficar vazio ao inserir letras', () => {
      getPhone().type('abcdef').should('have.value', '');
    });

    it('deve ficar vazio ao inserir caracteres especiais', () => {
      getPhone().type('@#%&*').should('have.value', '');
    });

    it('Deve ficar vazio ao inserir um valor misto', () => {
      getPhone().type('123ab@456').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      preencheCamposObrigatorios();
      cy.get('#phone-checkbox').check().should('be.checked');
      cy.wait(100);
      getPhone().should('have.value', '');
      cy.get('button[type="submit"]').click();
      cy.get('.error').should('be.visible');
    });

    it('Deve aceitar normalmente', () => {
      getPhone().type('123456').should('have.value', '123456');
    });
  });
});
