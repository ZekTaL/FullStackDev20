import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, hideNotificationMessage } from '../reducers/notificationReducer'

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
    const anecdotes = useSelector(({anecdotes, filter, notification}) => {
         return filter === '' ? anecdotes : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const handleVoteClick = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotificationMessage('You voted ' + anecdote.content))
        setTimeout(() => {dispatch(hideNotificationMessage())}, 5000)
    }
    
    return (
        <div>
            <ul>
                {anecdotes
                    .sort((x, y) => y.votes - x.votes)
                    .map(anecdote =>
                        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => {handleVoteClick(anecdote)}} />
                    )
                }
            </ul>      
        </div>
    )
}

export default AnecdoteList