import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnectodeList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {useDispatch} from 'react-redux'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {    
    anecdoteService      
      .getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))  
  }, [dispatch])

  return (
    <div>
      <h2>Anecdote List</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>Create new anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
