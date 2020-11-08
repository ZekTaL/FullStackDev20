import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>  
        <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))}/>
        ALL
        <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))}/>
        IMPORTANT
        <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))}/>
        NON IMPORTANT
    </div>
  )
}

export default VisibilityFilter