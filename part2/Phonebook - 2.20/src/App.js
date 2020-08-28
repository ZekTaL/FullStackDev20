import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => { 
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 
  const [newFilter, setNewFilter] = useState('') 
  const [notificationMessage, setNotificationMessage] = useState({message: null, type: null})

  const notificationType = {
    error: 'error',
    success: 'success'
  }

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
        setNotificationMessage({message: 'Error! You are adding a duplicate!', type: notificationType.error})
        setTimeout(() => {setNotificationMessage({message: null})}, 5000)
        return
      }

      if (window.confirm(`'${newName}' is already added to phonebook! Replace the old number with the new one?`))
      {  
        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNotificationMessage({message: `'${personToUpdate.name}' updated!`, type: notificationType.success})
            setTimeout(() => {setNotificationMessage({message: null})}, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {      
            setNotificationMessage({message: `The person '${personToUpdate.name}' was already deleted from server`, type: notificationType.error})
            setTimeout(() => {setNotificationMessage({message: null})}, 5000)
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
        setNotificationMessage({message: `Added '${returnedPerson.name}'`, type: notificationType.success})
        setTimeout(() => {setNotificationMessage({message: null})}, 5000)
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
      <Notification notificationMessage={notificationMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add New Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} isADigit={isADigit} />
      <h2>Numbers</h2> 
      <Persons PersonsToShow={PersonsToShow} setPersons={setPersons} setNotificationMessage={setNotificationMessage} />
    </div>
  )
}

export default App 