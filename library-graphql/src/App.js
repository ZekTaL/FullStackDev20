import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {useQuery, useApolloClient, useSubscription} from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED} from './queries'
import Recommended from './components/Recommended'

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  } 
  
  return (    
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>  
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-gql-token')
    if ( token ) {
      setToken(token)
    }
  }, [token])

  if (result.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000) 
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify}/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout} >logout</button>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} authors={result.data.allAuthors} setError={notify}/>
      <Books show={page === 'books'} setError={notify} />
      <NewBook show={page === 'add'} setError={notify} updateCacheWith={updateCacheWith} setPage={setPage} />
      <Recommended show={page === 'recommended'} setError={notify} />
    </div>
  )
}

export default App