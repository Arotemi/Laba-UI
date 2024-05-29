// cypress/e2e/login.spec.js

Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});

describe('Login Page Test', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('http://localhost:3000/login');
    });

    it('Check if the page is rendered correctly ', () => {
        // Check if the login form elements are present
        cy.get('div[class="login-paper"]').should('be.visible');
        cy.get('h2[class="login-title"]').contains('Sign in').should('be.visible');

        cy.get('input[type=\'text\']').should('be.visible');
        cy.get('input[type=\'password\']').should('be.visible');

        cy.get('button[type="submit"] > span').contains('Login').should('be.visible');
        cy.get('button[type="submit"] > span').contains('Register').should('be.visible');
    });

    it('Check successful login and redirection from Login to Registration', () => {
        //Proceed to Registration
        cy.get('button[type="submit"] > span').contains('Register').click();
        cy.get('h2[class="login-title"]').contains('Sign up').should('be.visible');

        //Proceed back to Login
        cy.get('button[type="submit"] > span').contains('Login').click();
        cy.get('h2[class="login-title"]').contains('Sign in').should('be.visible');

        //Login
        cy.get('input[placeholder="Enter email"]').type('artemtest@gmail.com');
        cy.get('input[placeholder="Enter password"]').type('123456789');
        cy.get('button[type="submit"] > span').contains('Login').click();

        //Redirection check
        cy.url().should('include','/users');
        cy.get('div[class="Content"]').should('be.visible');
    });

    it('Check if errors are thrown after incorrect input', () => {
        cy.get('input[placeholder="Enter email"]').type('artemtest@gmail.com');
        cy.get('button[type="submit"] > span').contains('Login').click();

        //Empty Field Check
        cy.get('div').contains('REQUIRED').should('be.visible');

    });

    it('Check if errors are thrown after empty pass input', () => {
        // Type invalid email and password
        cy.get('input[placeholder="Enter email"]').type('test');
        cy.get('input[placeholder="Enter password"]').type('123456789');
        cy.get('button[type="submit"] > span').contains('Login').click();

        // Email Error
        cy.get('div').contains('WRONG_EMAIL').should('be.visible');
    })
});
