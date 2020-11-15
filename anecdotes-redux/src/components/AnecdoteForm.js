import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setTimedNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setTimedNotification(`Anecdote '${content}' created!`, 3)
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = { createAnecdote, setTimedNotification }

export default connect(null, mapDispatchToProps)(AnecdoteForm)