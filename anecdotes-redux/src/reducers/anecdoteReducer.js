import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
    switch(action.type)
    {
        case 'NEW_ANECDOTE':
            return [...state, action.data]

        case 'INIT_ANECDOTES':
            return action.data

        case 'VOTE':
            const id = action.data.id
            const anecdoteToVote = state.find(a => a.id === id)
            const updatedAnecdote = { 
                ...anecdoteToVote, 
                votes: anecdoteToVote.votes
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : updatedAnecdote 
            )
        
        default:
            return state
    }
}

export const createAnecdote = (content) => {  
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
  }

export const vote = (anecdote) => {  
    return async dispatch => {
        anecdote.votes += 1
        const updateAnecdote = await anecdoteService.update(anecdote.id, anecdote)
        dispatch({
            type: 'VOTE',
            data: updateAnecdote
        })
    }
}

export default reducer