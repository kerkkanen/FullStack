import { login, createBlog } from '../support/commands'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Testaaja',
      username: 'testaaja',
      password: 'salasana',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('testaaja logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salsasana')
      cy.get('#login-button').click()
      cy.contains('wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testaaja', password: 'salasana' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Uusi blogi')
      cy.get('#author').type('Blogin kirjoittaja')
      cy.get('#url').type('www.bloggi.fi')
      cy.get('#create').click()
      cy.contains('a new blog Uusi blogi is added').should(
        'have.css',
        'color',
        'rgb(0, 128, 0)'
      )
      cy.contains('Uusi blogi by Blogin kirjoittaja')
    })

    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'Uusi blogi',
        author: 'Blogin kirjoittaja',
        url: 'www.bloggi.fi',
      })
      cy.contains('Uusi blogi by Blogin kirjoittaja')
      cy.get('#view').click()
      cy.contains('likes 0')
      cy.get('#like').click()
      cy.contains('likes 1')
    })

    it('a blog can be removed by creator', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Uusi blogi')
      cy.get('#author').type('Blogin kirjoittaja')
      cy.get('#url').type('www.bloggi.fi')
      cy.get('#create').click()
      cy.contains('Uusi blogi by Blogin kirjoittaja')
      cy.get('#view').click()
      cy.get('#remove').click()
      cy.contains('Uusi blogi by Blogin kirjoittaja').should('not.exist')
    })

    it('a blog can not be removed by anyone else', function () {
      cy.createBlog({
        title: 'Uusi blogi',
        author: 'Blogin kirjoittaja',
        url: 'www.bloggi.fi',
      })
      cy.contains('Uusi blogi by Blogin kirjoittaja')
      cy.get('#logout').click()

      const secondUser = {
        name: 'Poistaja',
        username: 'poistaja',
        password: 'salasana',
      }
      cy.request('POST', 'http://localhost:3003/api/users', secondUser)

      cy.login({ username: 'poistaja', password: 'salasana' })
      cy.contains('poistaja logged in')

      cy.get('#view').click()
      cy.contains('#remove').should('not.exist')
    })

    it('blogs are ordered by most likes', function () {
      cy.createBlog({
        title: 'Eka blogi',
        author: 'Blogin kirjoittaja',
        url: 'www.bloggi.fi',
      })
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('likes 1')
      cy.get('#like').click()
      cy.contains('likes 2')

      cy.createBlog({
        title: 'Tykätyin blogi',
        author: 'Blogin kirjoittaja',
        url: 'www.plokki.fi',
      })
      cy.contains('Tykätyin blogi').parent().find('#view').click()
      cy.contains('Tykätyin blogi').parent().find('#like').click()
      cy.contains('Tykätyin blogi').contains('likes 1')
      cy.contains('Tykätyin blogi').parent().find('#like').click()
      cy.contains('Tykätyin blogi').contains('likes 2')
      cy.contains('Tykätyin blogi').parent().find('#like').click()
      cy.contains('Tykätyin blogi').contains('likes 3')

      cy.contains('Eka blogi').parent().find('#view').click()

      cy.get('.moreInfo').eq(0).should('contain', 'Tykätyin blogi')
      cy.get('.moreInfo').eq(1).should('contain', 'Eka blogi')
    })
  })
})
