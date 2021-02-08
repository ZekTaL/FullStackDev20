import React, {useState, useEffect} from 'react'
import {useQuery, useApolloClient } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import {ALL_PERSONS} from './queries'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

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
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

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
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout} >logout</button>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify}/>
      {
        !result.data ? <h2>No Persons added!</h2>
                     : <Persons persons = {result.data.allPersons} />
      }
    </div>
  )
}

export default App