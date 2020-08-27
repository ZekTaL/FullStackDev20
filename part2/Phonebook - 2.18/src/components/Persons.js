import React from 'react'
import Person from './Person'
import personService from '../services/persons'

const Persons = ({PersonsToShow, setPersons}) => {

  const deletePersonOf = id => {
    const person = PersonsToShow.find(p => p.id === id)
  
    if (window.confirm(`Delete ${person.name}?`))
    {
      personService
      .deleteP(id)
      .then(returnedPersons => {
        setPersons(PersonsToShow.filter(person => person.id !== id))
      })
      .catch(error => {      
        alert(`'${person.name}' was already deleted from server`)
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