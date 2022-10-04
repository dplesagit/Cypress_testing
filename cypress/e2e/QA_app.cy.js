import signUp from '../fixtures/example.json'
import { faker } from '@faker-js/faker'

describe('demo opencart basic functionalities', () => {
    beforeEach(() => {
      cy.visit('https://demo.opencart.com/')
    })

    it('registers a new user', () => {
      // Accessing the registration page
      cy.navigate_to_register()

      // Filling out all the inputs for registration
      cy.register_user(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.datatype.uuid())

      // A toast message should appear to inform that the user is created. 
      // It should point the user to verify their credentials via email or redirect them to the login page for example

      // Example of verifying a toast message and redirecting the user to the login page
      cy.register_assert()

    })

    it('logs in a newly registered user', () => {  
      const name = faker.name.firstName()
      const mail = faker.internet.email()  
      const password = faker.datatype.uuid()
      // Accessing the registration page
      cy.navigate_to_register()

      // Filling out all the inputs for registration
      cy.register_user(name, faker.name.lastName(), mail, password)

      // It should point the user to verify their credentials via email or redirect them to the login page for example
      cy.register_assert()

      // Filling out the login page
      cy.login(mail, password)

      // Asserting that the user is logged in; for example the user should be redirected to the home page with some indication that they're logged in
      cy.login_assert(name)

    })  

    it('logs out a user', () => {
      // Navigate to login page
      cy.navigate_to_login()

      // Filling out the login page
      cy.login(signUp.email, signUp.password)

      // Asserting that the user is logged in; for example the user should be redirected to the home page with some indication that they're logged in
      cy.login_assert(signUp.firstname)

      // Navigate to the account dropdown and select log out
      cy.navigate_to_logout()

      // The user should be, for example, directed to the main page which should be the stock landing page
      cy.logout_assert()
    })

    it('searches for products on the page', () => {
      // The user searches for the first featured product
      cy.get('h4').first()
        .then(function(get_text){
          return get_text.text()
        }).then(function(text){
          cy.get('#search').type(text)
          cy.get('.btn-light').click()

          // A list of corresponding products should be available to the user
          cy.search_result_assert(text)
        })
    })

    it('searches for products on the detailed search page', () => {
      // The user searches for the first featured product
      cy.get('h4').first()
        .then(function(get_text){
          return get_text.text()
        }).then(function(text){
          cy.get('.btn-light').click()
          cy.get('#input-search').type(text)
          cy.get('#button-search').click()

          // A list of corresponding products should be available to the user
          cy.search_result_assert(text)
        })
    })

    it('views products on the page', () => {
      // The user views the MacBook
      cy.contains('MacBook').click()

      // Assert the user is on the specific product page
      cy.get('h1').should('have.text', 'MacBook')
      cy.get('#button-cart').should('be.visible')
    })

    it('adds product to cart from the home page (featured)', () => {
      // The user wants to buy a Macbook
      cy.get('button[aria-label="Add to Cart"]').first().click()
      cy.get('.alert-success')
        .should('be.visible')
        .should('contain.text', 'Success: You have added MacBook to your shopping cart!')

      // Assert the product is in the cart
      cy.add_to_cart_assert()
    })

    it('adds product to cart from the product view', () => {
      // The user wants to buy a Macbook
      cy.contains('MacBook').click()

      // Assert the user is on the specific product page
      cy.get('h1').should('have.text', 'MacBook')
      cy.get('#button-cart').should('be.visible').click()
      cy.get('.alert-success')
        .should('be.visible')
        .should('contain.text', 'Success: You have added MacBook to your shopping cart!')

      // Assert the product is in the cart
      cy.add_to_cart_assert()
    })

    it('finishes the product purchase', () => {
      // The user wants to buy a Macbook
      cy.get('button[aria-label="Add to Cart"]').first().click()
      cy.get('.alert-success')
        .should('be.visible')
        .should('contain.text', 'Success: You have added MacBook to your shopping cart!')

      // Assert the product is in the cart
      cy.add_to_cart_assert()

      // Continue to checkout, payment steps, etc.
      cy.get('.btn-primary')
        .should('contain.text', 'Continue')
        .click()

      // Assert the next step is checkout (placeholder)
      cy.get('h1').should('have.text', 'Checkout')
      
      // the next steps should be checkout, entering payment info, delivery and shipping etc.
    })

    })
