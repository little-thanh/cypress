describe('template spec', () => {
    const baseurl = Cypress.env('baseUrl')

    it('should have a link to go to login page on the home page', () => {
        cy.visit(baseurl + '/men')
        cy.get('img[alt="Strutter shoes"]').click()
        cy.url().should('contains', baseurl + '/men/strutter-shoes-45')
        cy.get('.variant-option-list a').contains('XL').click()
        cy.get('.variant-option-list a').contains('Grey').click()
        cy.url().should('contain', baseurl+'/men/strutter-shoes-45?color=23')

        cy.intercept('POST', ' /api/cart.mine.items').as('addTocart')
        cy.get('button[type=button"]').should('contain','ADD TO CART').click()
        cy.wait('@addToCart').then(()=>{
        cy.get('.toast-mini-cart a[href="/cart"]').click()
        })
    })
})

