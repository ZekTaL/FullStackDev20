import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({PersonsToShow, setPersons, setNotificationMessage}) => {

  const deletePersonOf = id => {
    const person = PersonsToShow.find(p => p.id === id)
  
    if (window.confirm(`Delete ${person.name}?`))
    {
      personService
      .deleteP(id)
      .then(returnedPersons => {
        setPersons(PersonsToShow.filter(person => person.id !== id))
        setNotificationMessage({message: `Deleted '${person.name}'`, type: 'success'})
        setTimeout(() => {setNotificationMessage({message: null})}, 5000)
      })
      .catch(error => {      
        setNotificationMessage({message: `'${person.name}' was already deleted from server`, type: 'error'})
        setTimeout(() => {setNotificationMessage({message: null})}, 5000)
        setPersons(PersonsToShow.filter(p => p.id !== id))    
      })
    }
  }

  return (
    <table>
      <tbody>
        {PersonsToShow.map(person => <Person key={person.name} person={person} deletePerson={() => deletePersonOf(person.id)} />)}
      </tbody>
    </table>
  )
}

export default Persons