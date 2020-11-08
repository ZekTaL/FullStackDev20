const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'HIDE_NOTIFICATION':
            return ''
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
  
export default notificationReducer