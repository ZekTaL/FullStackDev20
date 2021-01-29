import React from 'react'
import {logout} from '../reducers/loginReducer'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

const Menu = ({user}) => {
    const dispatch = useDispatch()
  
    const handleLogout = () => {
      dispatch(logout())
    }
  
    const logoutButton = () => (
      <button onClick={handleLogout}>LOGOUT</button>
    )
  
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand><i>BlogApp</i></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>
            </Nav>
            <Navbar.Text>
                Logged-in as: <i>{user.name}</i> {logoutButton()}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>   
      </div>
    )
}

export default Menu