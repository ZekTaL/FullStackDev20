import React from 'react'
import Person from './Person'

const Persons = (props) => {
  return (
    <table>
      <tbody>
        {props.PersonsToShow.map(person => <Person key={person.name} person={person} />)}
      </tbody>
    </table>
  )
}

export default Persons