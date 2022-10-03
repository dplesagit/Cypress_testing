// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('navigate_to_register', () => {
    cy.contains('My Account').click()
    cy.contains('Register').click()
    cy.get('h1').should('have.text', 'Register Account')
  })

Cypress.Commands.add('navigate_to_login', () => {
    cy.contains('My Account').click()
    cy.contains('Login').click()
  })

Cypress.Commands.add('navigate_to_logout', () => {
    cy.contains('My Account').click()
    cy.contains('Logout').click()
  })

Cypress.Commands.add('logout_assert', () => {
    cy.get('.alert-success').should('exist')
    cy.get('h3').should('have.text', 'Featured')
  })

Cypress.Commands.add('register_user', (first_name, last_name, email, password) => {
    cy.get('#input-firstname').type(first_name)
    cy.get('#input-lastname').type(last_name)
    cy.get('#input-email').type(email)
    cy.get('#input-password').type(password)
    cy.get('input[name="agree"]').check()
    cy.get('button[type="submit"]').click()
  })

Cypress.Commands.add('register_assert', () => {
    cy.get('.alert-success').should('exist')
    cy.get('h2').should('have.text', 'Returning Customer')
  }) 

Cypress.Commands.add('login', (email, password) => {
    cy.get('#input-email').type(email)
    cy.get('#input-password').type(password)
    cy.get('button[type="submit"]').click()
  })

Cypress.Commands.add('login_assert', () => {
    cy.get('.alert-success').should('exist')
    cy.get('h3').should('have.text', 'Featured for you Danijel')
  })