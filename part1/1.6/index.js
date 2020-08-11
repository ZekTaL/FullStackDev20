import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>
const Display = (props) => <div>{props.text} {props.value}</div>

const App = (props) => {
  // save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const setToGood = newValue => {setGood(newValue)}
	const setToNeutral = newValue => {setNeutral(newValue)}
	const setToBad = newValue => {setBad(newValue)}

	return (
		<div>
			<h1>Give Feedback</h1>
			<Button handleClick={() => setToGood(good + 1)} text="GOOD" />
			<Button handleClick={() => setToNeutral(neutral + 1)} text="NEUTRAL" />
			<Button handleClick={() => setToBad(bad + 1)} text="BAD" />
			<h1>Statistics</h1>
			<Display text='Good: ' value={good} />
			<Display text='Neutral: ' value={neutral} />
			<Display text='Bad: ' value={bad} />
		</div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))