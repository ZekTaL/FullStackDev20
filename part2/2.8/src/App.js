import React, { useState } from 'react'
import Person from './components/Person'

const App = () => { 
  
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('') 

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

  const isADigit = (event) => {
    if ((event.charCode < 48 || event.charCode > 57) && event.charCode !== 45)
    {
      event.preventDefault()
    }    
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
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
      <h1>Numbers</h1> 
      <ul>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )
}

export default App 