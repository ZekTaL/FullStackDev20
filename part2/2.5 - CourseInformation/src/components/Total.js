import React from 'react'

const Total = ({parts}) => {
	
	let total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
	
	return (
			<p>Total number of exercises: {total} </p>			
	)
}

export default Total