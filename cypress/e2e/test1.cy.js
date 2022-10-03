describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.get('h4').then(($els) => {
      const texts = Array.from($els, el => el.innerText)
    })
    console.log(texts)
  })
})