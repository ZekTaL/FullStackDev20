describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {      
            name: 'Francesco',      
            username: 'zekt',      
            password: 'password'    
        }
        const rootUser = {      
            name: 'Superuser',      
            username: 'root',      
            password: 'password'    
        }        
        cy.request('POST', 'http://localhost:3003/api/users/', user)  
        cy.request('POST', 'http://localhost:3003/api/users/', rootUser)
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('LOGIN')
    })

    describe('Login',function() {    
        it('succeeds with correct credentials', function() {
            cy.contains('LOGIN').click()
            cy.get('#username').type('zekt')
            cy.get('#password').type('password')
            cy.get('#loginButton').click()
    
            cy.contains('logged-in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('LOGIN').click()
            cy.get('#username').type('zekt')
            cy.get('#password').type('wrong')
            cy.get('#loginButton').click()
        
            cy.get('.error')
                .should('contain', 'Wrong Credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
    
            cy.get('html').should('not.contain', 'logged-in')
        })
    })

    describe('When logged in', function() {    
        beforeEach(function() {
            cy.login({ username: 'zekt', password: 'password' })
        })
     
        it('a blog can be created', function() {      
            cy.contains('NEW BLOG').click()      
            cy.get('#blogTitle').type('blog Title') 
            cy.get('#blogAuthor').type('blog Author')  
            cy.get('#blogUrl').type('blog Url')       
            cy.get('#createBlogButton').click()     
            cy.get('#blogList').should('contain', 'blog Title') 
                .and('contain', 'blog Author')
                .and('contain', 'blog Url')   
        }) 

        describe('and several blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'title1', author: 'A', url: '-', likes: 10 })      
                cy.createBlog({ title: 'title2', author: 'B', url: '-', likes: 15 }) 
                cy.createBlog({ title: 'title3', author: 'C', url: '-', likes: 5 })
            })
        
            it('you can increase the likes of a blog', function () {
                cy.contains('title1').parent().contains('VIEW').click()
                cy.contains('title1').parent().contains('Likes: 10')
                cy.contains('title1').parent().contains('+1').click()
                cy.contains('title1').parent().contains('Likes: 11')
            })

            it('a blog can be deleted by the user who created it', function() {
                cy.contains('title1').parent().parent().find('#deleteButtonCell').find('button').click()
                cy.get('#blogList').should('not.contain', 'title1')
            })

            it('but not from another user', function() {
                cy.contains('LOGOUT').click()
                cy.login({ username: 'root', password: 'password' })
                cy.contains('title1').parent().parent().find('#deleteButtonCell').find('button').should('be.disabled')
            })

            it('they are ordered by likes', function() {
                cy.get('#blogList').children().should(items => {
                    expect(items[0]).to.contain.text('title2')
                    expect(items[1]).to.contain.text('title1')
                })               
            })
        })
    })
})