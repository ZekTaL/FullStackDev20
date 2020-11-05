import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <li>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
            </div>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()  
    const anecdotes = useSelector(state => state)
    
    return (
        <div>
            <h2>Anecdote List</h2>
            <ul>
                {anecdotes
                    .sort((x, y) => y.votes - x.votes)
                    .map(anecdote =>
                        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(vote(anecdote.id))} />
                    )
                }
            </ul>      
        </div>
    )
}

export default AnecdoteList