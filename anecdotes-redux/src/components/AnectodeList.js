import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    const handleVoteClick = (anecdote) => {
        props.vote(anecdote)
        props.setTimedNotification('You voted ' + anecdote.content, 5)
    }
    
    return (
        <div>
            <ul>
                {anecdotes.length !== 0
                ? anecdotes
                    .sort((x, y) => y.votes - x.votes)
                    .map(anecdote =>
                        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => {handleVoteClick(anecdote)}} />
                    )
                : ''
                }
            </ul>      
        </div>
    )
}

const mapStateToProps = (state) => {  
    if (state.filter === '') {
        return { anecdotes: state.anecdotes }
    } 
    else 
    {
        return { anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    }
}

const mapDispatchToProps = { vote, setTimedNotification }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)