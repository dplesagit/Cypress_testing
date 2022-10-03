import signUp from '../fixtures/example.json'
import { faker } from '@faker-js/faker'

describe('example to-do app', () => {
    beforeEach(() => {
      cy.visit('https://demo.opencart.com/')
    })

    it('registers a new user', () => {
      // Accessing the registration page
      cy.navigate_to_register()

      // Filling out all the inputs for registration
      cy.register_user(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.datatype.password())

      // A toast message should appear to inform that the user is created. 
      // It should point the user to verify their credentials via email or redirect them to the login page for example

      // Example of verifying a toast message and redirecting the user to the login page
      cy.register_assert()

    })

    it('logs in a newly registered user', () => {
      // store the email and password in variable so we can reuse it
      
      // Accessing the registration page
      cy.navigate_to_register()

      // Filling out all the inputs for registration
      cy.register_user(faker.name.firstName(), faker.name.lastName(), faker.internet.email(), faker.datatype.password())

      // Successful creation
      cy.register_assert()

      // Filling out the login page
      cy.login(signUp.email, signUp.password)

      // Asserting that the user is logged in; the user should be redirected to the home page with some indication that they're logged in
      cy.login_assert()

    })  

    it('logs out a user', () => {
      // Navigate to login page
      cy.navigate_to_login()

      // Filling out the login page
      cy.login(signUp.email, signUp.password)

      // Asserting that the user is logged in; the user should be redirected to the home page with some indication that they're logged in
      cy.login_assert()

      // Navigate to the account dropdown and select log out
      cy.navigate_to_logout()

      // The user should be directed to the main page which should be the stock page
      cy.logout_assert()
    })

    it('searches for products on the page', () => {
      // The user searches for an iPhone
      cy.get('#search').type('iPhone')
      cy.get('.btn-light').click()

      // A list of corresponding products should be available to the user
      cy.get('li').should('have.text', 'iPhone')
    })

    it('views products on the page', () => {
      // The user views the MacBook
      cy.contains('MacBook').click()

      // Assert the user is on the specific product page
      cy.get('h1').should('have.text', 'MacBook')
      cy.get('#button-cart').should('be.visible')
    })

    it('adds products to cart from the home page (featured)', () => {
      // The user wants to buy a Macbook
      cy.get('button[aria-label="Add to Cart"]').first().click()
      cy.get('.alert-success').should('exist')

      // Assert the product is in the cart
      cy.get('a[title="Shopping Cart"]').click()
      cy.get('#content').should('not.contain.text', 'Your shopping cart is empty!')
    })

    it('adds products to cart from the product view', () => {
      // The user wants to buy a Macbook
      cy.contains('MacBook').click()

      // Assert the user is on the specific product page
      cy.get('h1').should('have.text', 'MacBook')
      cy.get('#button-cart').should('be.visible').click()
      cy.get('.alert-success').should('exist')

      // Assert the product is in the cart
      cy.get('a[title="Shopping Cart"]').click()
      cy.get('#content').should('not.contain.text', 'Your shopping cart is empty!')
    })

    it('finishes the product purchase', () => {
      
    })

    })
