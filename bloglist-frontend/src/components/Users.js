import React, { useEffect } from 'react'
import '../index.css'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'
import {setTimedNotification} from '../reducers/notificationReducer'
import {getUsers} from '../reducers/userReducer'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import {Table, ListGroup, Card} from 'react-bootstrap'


const User = ({user}) => (
      <tr>
        <td>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </td>
        <td>
          {user.name}
        </td>
        <td align="center">
          {user.blogs.length}
        </td>
      </tr>
)

const UserView = ({user}) => {
  if (!user)
    return null

  return (
    <div>
      <Card bg="light">
        <Card.Header><h2><i>{user.username}</i></h2></Card.Header>
          {user.blogs.length === 0 
            ?   <Card.Body>
                  <Card.Title>No Added Blogs</Card.Title>
                </Card.Body>

            :   <Card.Body>
                  <Card.Title>Added Blogs</Card.Title>
                  <ListGroup>
                    {user.blogs.map((userBlog, idx) => <ListGroup.Item key={idx}>{userBlog.title}</ListGroup.Item>)}
                  </ListGroup>
                </Card.Body>
          }   
      </Card>
    </div>
  )
}

const Users = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUsers())
    }, [dispatch])

    const match = useRouteMatch('/users/:id') 

    if (!props.users)
        return null
      
    const user = match     
      ? props.users.find(user => user.id === match.params.id)
      : null

    return (
        <div id="userList">
            <Switch>
              <Route path="/users/:id">
                <UserView user={user}/>
              </Route>
              <Route path="/users">
                <Table striped bordered className="w-auto p-3">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Blogs Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.users
                      .sort((x, y) => y.blogs.length - x.blogs.length)
                      .map(user => <User key={user.username} user={user}/>)
                    }
                  </tbody>
                </Table>
              </Route>
            </Switch>  
        </div>
    )
}

const mapStateToProps = (state) => {  
    return { users: state.users }
}

const mapDispatchToProps = { getUsers, setTimedNotification }

export default connect(mapStateToProps, mapDispatchToProps)(Users)