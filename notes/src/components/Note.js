import React from 'react'

const Note = ({ note, toggleImportance }) => {

  const label = note.important ? 'set NOT important' : 'set important'

  return (
    <li className='note'>
      <span>{note.content}</span><br></br>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note