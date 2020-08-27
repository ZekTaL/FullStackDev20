import React from 'react'

const Filter = (props) => {
  return (
    <div>Search: <input value={props.newFilter} onChange={props.handleFilterChange} /></div>
  )
}

export default Filter