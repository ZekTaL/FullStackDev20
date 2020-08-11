import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>
const Statistic = (props) => 
	(<tr>
		<td>{props.text}</td>
		<td>{props.value}</td>
	</tr>)

const Statistics = (props) => {
	
	let all = props.all
	let total = props.total
	
	if (total === 0) {
		return (<div>No Feedback Given</div>)
	}
	
	return (
		<>
			<table>
				<tbody>
					<Statistic text='Good: ' value={all.good} />
					<Statistic text='Neutral: ' value={all.neutral} />
					<Statistic text='Bad: ' value={all.bad} />
				</tbody>
			</table>
			<p></p>
			<table>
				<tbody>
					<Statistic text='All: ' value={total} />
					<CalcAverage all={all} total={total} />
					<CalcPositive all={all} total={total} />
				</tbody>
			</table>
		</>
	)	
}

const CalcAverage = (props) => {
	/*if (props.total === 0) {
		return (<Statistic text='Average: ' value='0' />)
	}*/
	
	return (<Statistic text='Average: ' value={ (props.all.good - props.all.bad) / props.total} />)
}

const CalcPositive = (props) => {
	/*if (props.total === 0) {
		return (<Statistic text='Positive: ' value='0 %' />)
	}*/
	
	return (<Statistic text='Positive: ' value={ (props.all.good / props.total) * 100 + ' %'} />)
}

const App = (props) => {
  // save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	const setToGood = newValue => {setGood(newValue)}
	const setToNeutral = newValue => {setNeutral(newValue)}
	const setToBad = newValue => {setBad(newValue)}
	
	const all = {
		good,
		neutral,
		bad
	}

	return (
		<div>
			<h1>Give Feedback</h1>
			<Button handleClick={() => setToGood(good + 1)} text="GOOD" />
			<Button handleClick={() => setToNeutral(neutral + 1)} text="NEUTRAL" />
			<Button handleClick={() => setToBad(bad + 1)} text="BAD" />
			<h1>Statistics</h1>
			<Statistics all={all} total={good + neutral + bad} />
		</div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))