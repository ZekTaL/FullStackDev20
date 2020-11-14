import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setTimedNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content)) 
        dispatch(setTimedNotification(`Anecdote '${content}' created!`, 3))
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

export default AnecdoteForm