Cypress.on('uncaught:exception', () => {
    return false;
});

describe('Contact users List', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Enter email"]').type('artemtest@gmail.com');
        cy.get('input[placeholder="Enter password"]').type('123456789');
        cy.get('button[type="submit"] > span').contains('Login').click();


    });

    it('E2E Scenario: Login > navigating > creating new contact > share > edit', () => {
        const phoneNumber = generateUniquePhoneNumber();
        //Visit Information Page

        cy.get('div[class="profile-menu"]').click();
        cy.get('span[class="ant-dropdown-menu-title-content"]').contains('About').click();
        cy.get('button').contains('About the Project').should('be.visible');
        cy.get('button').contains('About the Project').click();
        cy.get('div[class=\'ant-modal-content\']').should('be.visible');
        cy.get('span[aria-label="close"]').click();

        //Visit Profile Page

        cy.get('div[class="profile-menu"]').click();
        cy.get('span[class="ant-dropdown-menu-title-content"]').contains('Profile').click();
        cy.get('h1[class="profile-title"]').contains('Profile Information').should('be.visible');

        //Visit Contact Users Page
        cy.get('div[class="profile-menu"]').click();
        cy.get('span[class="ant-dropdown-menu-title-content"]').contains('Contacts').click();
        cy.contains('Contact users List').should('be.visible');

        //Create New Contact
        cy.get('button.createBtn').click();
        cy.get('.ProductModal').should('be.visible');

        // const phoneNumber = generateUniquePhoneNumber();

        cy.get('input[placeholder="Enter First name"]').type('Scenario');
        cy.get('input[placeholder="Enter Last name"]').type('Bob');
        cy.get('input[placeholder="Enter Phone number"]').type(phoneNumber);

        cy.get('.ProductModal button.ant-btn-primary').click();

        cy.get('.ProductModal').should('not.exist');

        cy.get('tr[class="ant-table-row ant-table-row-level-0"] > td').first().contains('Scenario');


        // Check Edit of the Created Contact
        cy.get('button[class="ant-btn ant-btn-link BASE_Button edit-button"]').first().click();
        cy.contains('Edit contact').should('be.visible');
        cy.get('input[placeholder="Enter First name"]').type('Updated Scenario');
        cy.get('button').contains('Update').click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"] > td').first().contains('Updated Scenario');


        //Check Share of the contact
        cy.get('button[class="ant-btn ant-btn-link BASE_Button share-button"]').first().click();
        cy.contains('Share Contact').should('be.visible');
        cy.get('input[type="search"]').click();
        cy.get('div[class="option"]').contains('artemkas350@gmail.com').click();
        cy.get('button[class="ant-btn ant-btn-primary"]').contains('Share').click();


        // Logout
        cy.get('div[class="profile-menu"]').click();
        cy.get('span[class="ant-dropdown-menu-title-content"]').contains('Log out').click();
        cy.get('div[class="login-paper"]').should('be.visible');

    })
    function generateUniquePhoneNumber() {
        // Generate a random number between 100000000000 and 999999999999
        const randomNumber = Math.floor(Math.random() * 900000000000) + 100000000000;

        return `+${randomNumber}`;
    }
})