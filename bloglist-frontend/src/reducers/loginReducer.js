import loginService from '../services/login'
import blogService from '../services/blogs'

const tokenName = 'loggedToBlogApp'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return action.data
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login = (credentials) => {  
    return async dispatch => {
        const user = await loginService.login(credentials)
        window.localStorage.setItem(tokenName, JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const getUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem(tokenName)
        if (loggedUserJSON)
        {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'INIT_USER',
                data: user
            })  
        }
        else
        {
            dispatch({
                type: 'INIT_USER',
                data: null
            })
        }
    }
}

export const logout = () => {
    window.localStorage.removeItem(tokenName)
    return {
        type: 'LOGOUT'
    }
}
  
export default loginReducer