import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>  
        <table>
          <tbody>
            <tr>
              <td align='right'>Name: </td>
              <td><input value={props.newName} onChange={props.handleNameChange} /></td>
              <td rowSpan='2'><button type="submit">ADD</button></td>
            </tr>
            <tr>
              <td align='right'>Number: </td>
              <td><input value={props.newNumber} onKeyPress={props.isADigit} onChange={props.handleNumberChange} /></td>
            </tr>
          </tbody>
        </table>  
    </form>  
  )
}

export default PersonForm