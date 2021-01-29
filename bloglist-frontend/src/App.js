import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Users from './components/Users'
import {useDispatch} from 'react-redux'
import {initializeBlogs} from './reducers/blogReducer'
import {getUser} from './reducers/loginReducer'
import {getUsers} from './reducers/userReducer'
import {connect} from 'react-redux'
import {Switch, Route} from "react-router-dom"


const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getUser())     
      dispatch(initializeBlogs())
      dispatch(getUsers())
  }, [dispatch])

  if (!props.user)
  {
    return (
      <div className="container">
        <h1>BlogApp</h1>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  else
  {
    return (
      <div className="container">
        <Menu user={props.user} />
        <Notification/>
        <br />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <BlogForm />
            <br />
            <BlogList />
          </Route>
        </Switch>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {  
  return { user: state.user }
}

export default connect(mapStateToProps, null)(App)
