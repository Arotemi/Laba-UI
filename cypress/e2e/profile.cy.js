// cypress/e2e/registration.spec.js



Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});
// cypress/integration/profile.spec.js

describe('Profile Page', () => {
    beforeEach(async () => {

        cy.visit('http://localhost:3000/login');
    });

    //Login and proceeding to Profile page
    it('check the page is renderered correctly', () => {
        cy.get('input[placeholder="Enter email"]').type('artemtest@gmail.com');
        cy.get('input[placeholder="Enter password"]').type('123456789');
        cy.get('button[type="submit"] > span').contains('Login').click();
        cy.get('div[class="profile-menu"]').click();
        cy.get('span[class="ant-dropdown-menu-title-content"]').contains('Profile').click();
        cy.get('h1[class="profile-title"]').contains('Profile Information').should('be.visible'); //check

    //additional check of displaying ellements

        cy.get('span').contains('ID').should('be.visible');
        cy.get('span').contains('Name').should('be.visible');
        cy.get('span').contains('Gender').should('be.visible');
        cy.get('span').contains('Email').should('be.visible');
        cy.get('span').contains('Birth Date').should('be.visible');
    });
});
