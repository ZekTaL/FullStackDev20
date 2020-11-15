import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  return (
    <div>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { filterChange }

export default connect(null, mapDispatchToProps)(Filter)