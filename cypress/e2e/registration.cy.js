// cypress/e2e/registration.spec.js

Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});

describe('Registration Page', () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/registration');
    });

    it('check the page is renderered correctly', () => {

        cy.get('input[placeholder="Enter email"]').should('be.visible');
        cy.get('input[placeholder="Enter password"]').should('be.visible');
        cy.get('input[placeholder="Enter username"]').should('be.visible');
        cy.contains('Date of birth').should('be.visible');
        cy.get('.ant-picker-input input[placeholder=""]').should('be.visible');

        cy.contains('Gender').should('be.visible');
        cy.get('button[type="submit"] > span').contains('Login').should('be.visible');
        cy.get('button[type="submit"] > span').contains('Registration').should('be.visible');
    });

    it('submits the registration form with valid data', () => {
        // Type valid registration data
        cy.get('input[placeholder="Enter email"]').type(`test+${Math.floor(Math.random() * 100)}$@gmail.com`);
        cy.get('input[placeholder="Enter password"]').type('artemnewfwef');
        cy.get('input[placeholder="Enter username"]').type('Jgewg');


        cy.get('div[class="ant-picker-input"]').click();
        cy.get('div[class="ant-picker-cell-inner"]').contains('12').click();
        cy.get('input[type="radio"]').first().check();
        cy.get('button[type="submit"] > span').contains('Registration').click();

        // Redirection to the HomePage
        cy.url().should('include', '/users');
    });

    // Add more tests as needed for error handling, form validation, etc.
});
