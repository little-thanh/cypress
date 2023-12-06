describe('template spec', () => {

  const baseurl = Cypress.env('baseUrl')
  const email = 'toto@testeur.fr'
  const password = '1234'
  // Demander à Cypress de se rendre sur un page web
  //cy.visit()

  it('should have a link to go to login page on the home page', () => {
    // Demander à Cypress de se rendre sur une page web
    cy.visit(baseurl)
    // Cibler l'élément "lien" (<a>) qui est contenu dans une balise qui a la classe ".header"
    cy.get('.header a[href="/account/login"]').click()

    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })

  it('should be successful to login account with existing credentials', () => {
    cy.login(email,password)

    //Nous sommes redirigés sur la page d'accueil : le login a fonctionné
    cy.url().should('be.oneOf', [baseurl, baseurl + '/']) // Comparaison
    cy.visit(baseurl + '/account')
    cy.get('input[name="email"]').should('not.exist')
    cy.get('input[name="password"]').should('not.exist')
    cy.get('.account-details').should('contain', 'toto@testeur.fr')

  })

  it('should be able to logout', () => {
    cy.login(email,password)
    cy.visit(baseurl + '/account')
    cy.contains('Logout').click()
    cy.url().should('contain', baseurl)
  })

  it('should be a login invalid', () => {
    cy.visit(baseurl + '/account/login')
    cy.get('input[name="email"]').type('toto@test.fr')
    cy.get('input[name="password"]').type('1234')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password').should('exist')
  })


  it('should be a password invalid', () => {
    cy.visit(baseurl + '/account/login')
    cy.get('input[name="email"]').type('toto@testeur.fr')
    cy.get('input[name="password"]').type('12345')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password').should('exist')
  })

  it('should be a login and password invalid', () => {
    cy.visit(baseurl + '/account/login')
    cy.get('input[name="email"]').type('toto@test.fr')
    cy.get('input[name="password"]').type('1234667')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password').should('exist')
  })

  it('should be a login and password empty', () => {
    cy.visit(baseurl + '/account/login')
    cy.get('button[type="submit"]').click()
    cy.contains('This field can not be empty').should('exist')
  })

  it('creation a new account' , () => {
    // Demander à Cypress de se rendre sur une page web
    cy.visit(baseurl)
    // Cibler l'élément "lien" (<a>) qui est contenu dans une balise qui a la classe ".header"
    cy.get('.header a[href="/account/login"]').click()

    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.contains('Create an account').click()
    cy.get('input[name="full_name"]').type('tenten')
    cy.get('input[name="email"]').type('thanhquy@ep.fr')
    cy.get('input[name="password"]').type('1234667')
    cy.contains('SIGN UP').click()
    cy.url().should('contain', baseurl)

  })
})