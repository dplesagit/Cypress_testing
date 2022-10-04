# Cypress_testing

Install requirements:
Install NodeJS => https://nodejs.org/en/

Clone repository somewhere locally

Download dependencies for cypress and fakerJS
-npm install cypress
-npm install @faker-js/faker

Running cypress scripts:

npm run cypress:open => opens the cypress dashboard where specs can be run

npx cypress run --options => run tests through terminal

To run headless/with browser displayed (headless is the default):
--headless, --headed

Choosing a browser:
--browser chrome, --browser edge

More options here => https://docs.cypress.io/guides/guides/command-line#What-you-ll-learn

for example to run a whole spec:
npx cypress run --browser chrome --spec "cypress/e2e/QA_app.cy.js"
