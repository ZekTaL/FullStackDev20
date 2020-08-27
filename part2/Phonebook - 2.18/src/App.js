import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => { 
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newFilter, setNewFilter] = useState('') 

  useEffect(() => {     
    personService      
      .getAll()     
      .then(initialPersons => {setPersons(initialPersons)}) 
  }, [])  

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '')
    {
      window.alert('Name or Number is empty!')
      return
    }
   
    const personObject = {
      //id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName))
    {
      const personToUpdate = persons.find(person => person.name === newName)
      if (personToUpdate.name === personObject.name && personToUpdate.number === personObject.number)
      {
        window.alert('Error! You are adding a duplicate!')
        return
      }

      if (window.confirm(`'${newName}' is already added to phonebook! Replace the old number with the new one?`))
      {  
        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {      
            alert(`the person '${personToUpdate.name}' was already deleted from server`)
            setPersons(persons.filter(p => p.id !== personToUpdate.id))    
          })

        return
      }
      else
      {
        return
      }
    }
  
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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

  /*const UpdateNumberOf = id => {
    const person = persons.find(p => p.id === id)
    const updatedNumber = { ...person, number: newNumber }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {      
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))    
      })
  }*/

  const PersonsToShow = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} isADigit={isADigit} />
      <h2>Numbers</h2> 
      <Persons PersonsToShow={PersonsToShow} setPersons={setPersons}/>
    </div>
  )
}

export default App 