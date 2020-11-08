import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnectodeList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

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
