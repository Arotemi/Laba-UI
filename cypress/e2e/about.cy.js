// cypress/e2e/about.spec.js



Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});

describe('Information Page', () => {


    beforeEach(async () => {
           cy.visit('http://localhost:3000/login');

    });

    it('Information Page rendering', () => {

        //Login

            cy.get('input[placeholder="Enter email"]').type('artemtest@gmail.com');
            cy.get('input[placeholder="Enter password"]').type('123456789');
            cy.get('button[type="submit"] > span').contains('Login').click();
            cy.get('div[class="profile-menu"]').click();
            cy.get('span[class="ant-dropdown-menu-title-content"]').contains('About').click();

        // Check if the page is rendered
        cy.get('button').contains('About the Project').should('be.visible');
        cy.get('button').contains('About the Project').click();
        cy.get('div[class=\'ant-modal-content\']').should('be.visible'); // check if Modal is active

        cy.get('div[class= \'ant-modal-body\']').should('be.visible');
        cy.contains('p', 'This project provides an easy way to manage your contacts. You can:').should('be.visible');

        //check info in flyout
        cy.get('div[class="ant-modal-body"] > ul').within(() => {
            cy.contains('li', 'Add new contacts').should('be.visible');
            cy.contains('li', 'Delete contacts quickly').should('be.visible');
            cy.contains('li', 'Update contact information').should('be.visible');
            // cy.contains('li', 'Search and filter contacts efficiently').should('be.visible');
        });
    });
});
