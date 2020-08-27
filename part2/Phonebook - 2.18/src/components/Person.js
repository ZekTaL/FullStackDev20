import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <tr>
      <td align='right'>{person.name}</td>
      <td align='center'>{' <> '}</td>
      <td align='left'>{person.number}</td>
      <td><button onClick={deletePerson}>DELETE</button></td>
    </tr>
  )
}

export default Person