import React, { useState } from 'react'
import Person from './components/Person'

const App = () => { 
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newFilter, setNewFilter] = useState('') 

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '')
    {
      window.alert('Name or Number is empty!')
      return
    }

    if (persons.map(personName => personName.name).includes(newName))
    {
      window.alert(`'${newName}' is already added to phonebook!`)
      return
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {   
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {  
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => {  
    setNewFilter(event.target.value)  
  }

  const isADigit = (event) => {
    if ((event.charCode < 48 || event.charCode > 57) && event.charCode !== 45)
    {
      event.preventDefault()
    }    
  }

  const PersonsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h1>Phonebook</h1>
      <div>Search: <input value={newFilter} onChange={handleFilterChange} /></div>
      <h2>Add New Person</h2>
      <form onSubmit={addPerson}>  
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td><input value={newName} onChange={handleNameChange} /></td>
            </tr>
            <tr>
              <td>Number: </td>
              <td><input value={newNumber} onKeyPress={isADigit} onChange={handleNumberChange} /></td>
            </tr>
          </tbody>
        </table>  
        <p></p>
        <button type="submit">ADD</button>      
      </form>  
      <h2>Numbers</h2> 
      <ul>
        {PersonsToShow.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App 