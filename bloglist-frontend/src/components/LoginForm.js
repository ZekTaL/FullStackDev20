import React from 'react'
import {connect} from 'react-redux'
import {login} from '../reducers/loginReducer'
import {setTimedNotification} from '../reducers/notificationReducer'
import {Form, Button, Col} from 'react-bootstrap'

const LoginForm = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    console.log('logging in with', username, password)
    props.login({
      username: username,
      password: password
    })

    props.setTimedNotification(`Logged in '${username}'`, 3)

    event.target.username.value = ''
    event.target.password.value = ''

  }

  return (
    <div>
      <br />
      <Form id="loginForm" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Row>
            <Form.Label column="lg" lg={1}>Username</Form.Label>
            <Col xs={3}>
              <Form.Control type="text" name="username" size="lg"/>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label column="lg" lg={1}>Password</Form.Label>
            <Col xs={3}>
              <Form.Control type="password" name="password" size="lg"/>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
             <Button type="submit" variant="primary">LOGIN</Button>
            </Col>
          </Form.Row>         
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.displayName = 'LoginForm'

const mapDispatchToProps = { login, setTimedNotification }

export default connect(null, mapDispatchToProps)(LoginForm)