import React, { useState } from 'react'
import Person from './components/Person'

const App = () => { 
  
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('') 

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {   
    setNewName(event.target.value)  
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>  
        {'Name: '}
        <input value={newName} onChange={handleNameChange} />       
        <p></p>
        <button type="submit">ADD</button>      
      </form>  
      <h1>Numbers</h1> 
      <ul>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App 