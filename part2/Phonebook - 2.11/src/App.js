import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

import axios from 'axios'

const App = () => { 
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newFilter, setNewFilter] = useState('') 

  useEffect(() => {     
    axios      
      .get('http://localhost:3001/persons')      
      .then(response => {setPersons(response.data)}) 
  }, [])  

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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} isADigit={isADigit} />
      <h2>Numbers</h2> 
      <Persons PersonsToShow={PersonsToShow}/>
    </div>
  )
}

export default App 