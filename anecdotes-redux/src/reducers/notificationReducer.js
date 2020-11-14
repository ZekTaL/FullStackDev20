const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'HIDE_NOTIFICATION':
            return ''
        case 'SET_TIMED_NOTIFICATION':
            return action.message
        default:
            return state
    }
}

export const setNotificationMessage = message => {
    return {
      type: 'SET_NOTIFICATION',
      message,
    }
}

export const hideNotificationMessage = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export const setTimedNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(setNotificationMessage(message))
        setTimeout(() => {dispatch(hideNotificationMessage())}, seconds*1000)
        dispatch({
            type: 'SET_TIMED_NOTIFICATION',
            message,
            seconds
        })
    }
}
  
export default notificationReducer