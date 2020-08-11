import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>

const points = new Array(anecdotes.length).fill(0)

const App = (props) => {
  // save clicks of each button to own state
	const [selected, setSelected] = useState(0)	
	const setToSelected = newValue => {setSelected(newValue)}
	
	const [voted, setVoted] = useState(0)
	const AddPoint = voted => {setVoted(points[voted] += 1)}
	
	console.log(points)		

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<h3>{props.anecdotes[selected]}</h3>
			<h4>Current Votes: {points[selected]}</h4>
			<Button handleClick={() => AddPoint(selected)} text="Vote" />
			<Button handleClick={() => setToSelected(Math.floor(Math.random()*props.anecdotes.length))} text="Next" />
		</div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))