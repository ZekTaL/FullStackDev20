import React, {useState} from 'react'
import '../index.css'
import {connect} from 'react-redux'
import {setTimedNotification} from '../reducers/notificationReducer'
import {like} from '../reducers/blogReducer'
import {deleteBlog, comment} from '../reducers/blogReducer'
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom'
import {Card, Table, Button, Form, Col, ListGroup, Modal} from 'react-bootstrap'


const Blog = ({ user, blog, handleDeleteBlog }) => {
  
  const [show, setShow] = useState(false)
  
  return (
    <tr>
      <td id="deleteButtonCell" width="55" align="center">
        {blog.user
          ? user.username === blog.user.username
            ? <Button variant="outline-dark" onClick={() => setShow(true)}><img src="https://image.flaticon.com/icons/png/512/39/39220.png" height="30" alt="DELETE"></img></Button>
            : <Button variant="outline-dark" disabled><img src="https://image.flaticon.com/icons/png/512/39/39220.png" height="30" alt="DELETE"></img></Button>
          : <Button variant="outline-dark" onClick={() => setShow(true)}><img src="https://image.flaticon.com/icons/png/512/39/39220.png" height="30" alt="DELETE"></img></Button>
        }

        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Confirm to delete '{blog.title}'?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => handleDeleteBlog(blog)}>Delete</Button>
          </Modal.Footer>
        </Modal>

      </td>
      <td>
        <div className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title} [{blog.author}]</Link>
        </div>
      </td>
    </tr>
  )
}

const BlogView = ({blog, handleUpdateLikes, addComment}) => {

  if (!blog)
    return null

  return (
    <div>
      <Card bg="light">
        <Card.Header><h2>{blog.title} <i>[{blog.author}]</i></h2></Card.Header>
          <Card.Body>
            <Card.Title>Url: <i>{blog.url}</i></Card.Title>
            <Card.Title>
              Likes: <i>{blog.likes}</i> <Button variant="outline-primary" id="likesButton" onClick={() => handleUpdateLikes(blog)}>+1</Button>
            </Card.Title>
            <Card.Title>Posted by: <i>{blog.user ? blog.user.name : 'guest'}</i></Card.Title>
            <br/>
            <Card.Title><b>Comments</b></Card.Title>
            <Form id="CommentForm" onSubmit={addComment(blog)}>
              <Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Control type="text" name="comment"/>
                  </Col>
                  <Col>
                    <Button type="submit" variant="primary" id="addCommentButton">ADD</Button>
                  </Col>
                </Form.Row>      
              </Form.Group>
            </Form>  
            
            <ListGroup>
              {blog.comments.length === 0 ? 'No comments' : blog.comments.map((blogComment, idx) => <ListGroup.Item key={idx}>{blogComment}</ListGroup.Item> )} 
            </ListGroup>
          </Card.Body>
      </Card>
    </div>
  )
}

const BlogList = (props) => {
    const blogs = props.blogs

    const handleUpdateLikes = (highlightedBlog) => {
        props.like(highlightedBlog)
        props.setTimedNotification(`You liked '${highlightedBlog.title}'`, 3)
    }

    const handleDeleteBlog = async (highlightedBlog) => {

      try
      {
        props.deleteBlog(highlightedBlog.id)
        props.setTimedNotification(`You deleted '${highlightedBlog.title}'`, 3)
      }
      catch (exception)
      {
        
      }
    }

    const addComment = (blog) => (event) => {
      event.preventDefault()
      const content = {comment: event.target.comment.value}
      event.target.comment.value = ''
      props.comment(blog, content)
      //props.setTimedNotification(`Comment '${content}' added!`, 3)
    }

    const match = useRouteMatch('/blogs/:id') 

    if (!blogs)
        return null
      
    const blog = match     
      ? blogs.find(blog => blog.id === match.params.id)
      : null
    
    return (
        <div id="blogList">
          <Switch>
              <Route path="/blogs/:id">
                <BlogView blog={blog} handleUpdateLikes={handleUpdateLikes} addComment={addComment}/>
              </Route>
              <Route path="/">
                {blogs.length === 0 
                  ? <Card bg="light">
                      <Card.Header><h2><i>No Added Blogs</i></h2></Card.Header>
                    </Card>
                  : <Table bordered striped>
                      <tbody>
                        {blogs
                        .sort((x, y) => y.likes - x.likes)
                        .map(blog => <Blog key={blog.id} user={props.user} blog={blog} handleDeleteBlog={handleDeleteBlog}/>)}
                      </tbody>
                    </Table>
                }
              </Route>
            </Switch>  
        </div>
    )
}

const mapStateToProps = (state) => {  
    return { blogs: state.blogs, user: state.user }
}

const mapDispatchToProps = { like, deleteBlog, comment, setTimedNotification }

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)