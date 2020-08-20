import React from 'react'

const Person = ({ person }) => {
  return (
    <tr>
      <td align='right'>{person.name}</td>
      <td align='center'>{' <> '}</td>
      <td align='left'>{person.number}</td>
    </tr>
  )
}

export default Person