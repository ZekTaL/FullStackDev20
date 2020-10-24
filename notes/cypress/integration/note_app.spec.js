describe('Note app', function() {
    beforeEach(function() {   
        cy.request('POST', 'http://localhost:3001/api/testing/reset')    
        const user = {      
            name: 'Francesco',      
            username: 'zekt',      
            password: 'password'    
        }    
        cy.request('POST', 'http://localhost:3001/api/users/', user)  
        cy.visit('http://localhost:3000')  
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
    })

    it('login form can be opened', function() {
        cy.contains('LOGIN').click()
    })

    it('user can login', function () {
        cy.contains('LOGIN').click()
        cy.get('#username').type('zekt')
        cy.get('#password').type('password')
        cy.get('#login-button').click()

        cy.contains('logged-in')
    })  

    it('login fails with wrong password', function() {
        cy.contains('LOGIN').click()
        cy.get('#username').type('zekt')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            //.and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'logged-in')
    })

    describe('when logged in', function() {    
        beforeEach(function() {
            cy.login({ username: 'zekt', password: 'password' })
        })
     
        it('a new note can be created', function() {      
            cy.contains('NEW NOTE').click()      
            cy.get('input').type('a note created by cypress')      
            cy.contains('SAVE').click()     
            cy.contains('a note created by cypress')    
        }) 

        describe('and several notes exist', function () {
            beforeEach(function () {
              cy.createNote({ content: 'first note', important: false })      
              cy.createNote({ content: 'second note', important: false })      
              cy.createNote({ content: 'third note', important: false })    
            })
        
            it('other of those can be made important', function () {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'set NOT important')
              })
          })
    })
})