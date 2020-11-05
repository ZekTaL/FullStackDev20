import React, { useState, useEffect, useRef } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App