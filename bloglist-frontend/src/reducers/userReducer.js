import userService from '../services/users'

const reducer = (state = [], action) => {
    switch(action.type)
    {
        case 'NEW_USER':
            return [...state, action.data]

        case 'GET_USERS':
            return action.data
        
        default:
            return state
    }
}

export const createUser = (content) => {  
    return async dispatch => {
        const newUser = await userService.create(content)
        dispatch({
            type: 'NEW_USER',
            data: newUser
        })
    }
}

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}

export default reducer