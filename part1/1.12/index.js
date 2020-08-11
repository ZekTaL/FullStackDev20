import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>

const App = (props) => {
  // save clicks of each button to own state
	const [selected, setSelected] = useState(0)

	const setToSelected = newValue => {setSelected(newValue)}

	return (
		<div>
			<h1>{props.anecdotes[selected]}</h1>
			<Button handleClick={() => setToSelected(Math.floor(Math.random()*props.anecdotes.length))} text="next anecdote" />
		</div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))