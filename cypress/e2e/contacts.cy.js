// Handle any uncaught exceptions to prevent Cypress from failing the test
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


    it('Check the page ellements are rendered correctly', () => {
        cy.contains('Contact users List').should('be.visible');
        cy.get('button[class="ant-btn ant-btn-primary BASE_Button BASE_Primary_button createBtn"]').contains("Create").should('be.visible');
        cy.get('button[class="ant-btn ant-btn-primary BASE_Button BASE_Primary_button submit-button shared-button"]').contains("Shared Users").should('be.visible');
        cy.get('table').should('be.visible');
        cy.contains('First Name').should('be.visible');
        cy.contains('Action').should('be.visible');


    });

    it('Check if the contacts have interaction buttons', () => {
        cy.get('button[class="ant-btn ant-btn-link BASE_Button edit-button"]').should('be.visible');
        cy.get('button[class="ant-btn ant-btn-link BASE_Button share-button"]').should('be.visible');
        cy.get('button[class="ant-btn ant-btn-link BASE_Button delete-button"]').should('be.visible');

    })



    it('Check share contact', () => {
        cy.get('button[class="ant-btn ant-btn-link BASE_Button share-button"]').first().click();
        cy.contains('Share Contact').should('be.visible');

    });

    it('Check edit contact', () => {
        cy.get('button[class="ant-btn ant-btn-link BASE_Button edit-button"]').first().click();
        cy.contains('Edit contact').should('be.visible');
        cy.get('input[placeholder="Enter First name"]').type('New Name');
        cy.get('button').contains('Update').click();
        cy.get('tr[class="ant-table-row ant-table-row-level-0"] > td').first().contains('New Name');

    });

    it('allows creating a new contact', () => {
        cy.get('button.createBtn').click();
        cy.get('.ProductModal').should('be.visible');

        const phoneNumber = generateUniquePhoneNumber();

        cy.get('input[placeholder="Enter First name"]').type('TEST');
        cy.get('input[placeholder="Enter Last name"]').type('NEW ONE');
        cy.get('input[placeholder="Enter Phone number"]').type(phoneNumber);

        cy.get('.ProductModal button.ant-btn-primary').click();

        cy.get('.ProductModal').should('not.exist');

        cy.get('table tbody tr').should('have.length', 6);
    });

    // Function to generate a unique phone number
    function generateUniquePhoneNumber() {
        // Generate a random number between 100000000000 and 999999999999
        const randomNumber = Math.floor(Math.random() * 900000000000) + 100000000000;

        return `+${randomNumber}`;
    }
});
