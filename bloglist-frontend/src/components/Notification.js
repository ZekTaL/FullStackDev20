import React from 'react'

const Notification = ({ notificationMessage }) => {
  if (notificationMessage.message === null) {
    return null
  }

  return (
    <div className={notificationMessage.type}>
      {notificationMessage.message}
    </div>
  )
}

export default Notification