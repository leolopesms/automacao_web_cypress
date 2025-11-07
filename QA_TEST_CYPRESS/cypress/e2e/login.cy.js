describe('Funcionalidade: LOGIN', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    })

    it('TESTE 1 - Login com credenciais válidas > Redirecionar para página de produtos', () => {
        const userName = `standard_user`;
        const password = "secret_sauce";

        cy.get('.form_group input[name="user-name"]').type(userName, {force: true});
        cy.get('.form_group input[name="password"]').type(password, {force: true});
        cy.get("#login-button").contains("Login").click();
    })

    it('TESTE 2 - Login com senha inválida > Exibir mensagem de erro', () => {
        const userName = `standard_user`;
        const invalidPassword = "Teste@123";

        cy.get('.form_group input[name="user-name"]').type(userName, {force: true});
        cy.get('.form_group input[name="password"]').type(invalidPassword, {force: true});
        cy.get("#login-button").contains("Login").click();
        cy.contains("Epic sadface: Username and password do not match any user in this service").should("be.visible");
    })

    it('TESTE 3 - Login com usuário bloqueado > Exibir mensagem "user has been locked out"', () => {
        const blockedUser = `locked_out_user`;
        const password = "secret_sauce";

        cy.get('.form_group input[name="user-name"]').type(blockedUser, {force: true});
        cy.get('.form_group input[name="password"]').type(password, {force: true});
        cy.get("#login-button").contains("Login").click();
        cy.contains("user has been locked out").should("be.visible");
    })

    it('TESTE 4 - Login com campos vazios > Impedir login e exibir alerta', () => {
        cy.get("#login-button").contains("Login").click();
        cy.contains("Epic sadface").should("be.visible");
    })
})