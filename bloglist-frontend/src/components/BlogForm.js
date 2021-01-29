import React, {useState} from 'react'
import {connect} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {setTimedNotification} from '../reducers/notificationReducer'
import {Form, Col, Button, Collapse} from 'react-bootstrap'

/*const createBlogForm = () => {
    
  const handleNewBlogButtonClick = () => {
    (!visible) 
      ? document.querySelector("#newBlogButton").textContent = "CLOSE"
      : document.querySelector("#newBlogButton").textContent = "NEW BLOG"

    setVisible(!visible)
  }

  return (
    <div>
      <Button id="newBlogButton" onClick={handleNewBlogButtonClick} aria-controls="newBlogForm" aria-expanded={visible}>
        NEW BLOG
      </Button>
      <Collapse in={visible}>
        <div id="newBlogForm">
          <BlogForm />
        </div>
      </Collapse>
    </div>
  )
}*/


const BlogForm = (props) => {
  const [visible, setVisible] = useState(false)

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogTitle = event.target.blogTitle.value
    const blogAuthor = event.target.blogAuthor.value
    const blogUrl = event.target.blogUrl.value

    props.createBlog({
      title: blogTitle,
      author: blogAuthor === '' ? 'anonymous' : blogAuthor,
      url: blogUrl
    })

    props.setTimedNotification(`Blog '${blogTitle}' created!`, 3)

    event.target.blogTitle.value = ''
    event.target.blogAuthor.value = ''
    event.target.blogUrl.value = ''
  }

  const handleNewBlogButtonClick = () => {
    (!visible) 
      ? document.querySelector("#newBlogButton").textContent = "CLOSE"
      : document.querySelector("#newBlogButton").textContent = "NEW BLOG"

    setVisible(!visible)
  }

  return (
    <div>
      <Button id="newBlogButton" onClick={handleNewBlogButtonClick} aria-controls="newBlogForm" aria-expanded={visible}>
        NEW BLOG
      </Button>
      <Collapse in={visible}>
        <div id="newBlogForm">
          <br />
          <Form id="BlogForm" onSubmit={handleCreateBlog}>
            <Form.Group>
              <Form.Row>
                <Form.Label column="lg" lg={1}>Title</Form.Label>
                <Col xs={3}>
                  <Form.Control type="text" name="blogTitle"/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Label column="lg" lg={1}>Author</Form.Label>
                <Col xs={3}>
                  <Form.Control type="text" name="blogAuthor"/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Label column="lg" lg={1}>URL</Form.Label>
                <Col xs={3}>
                  <Form.Control type="text" name="blogUrl"/>
                </Col>
              </Form.Row>
              <br />
              <Form.Row>
                <Col>
                  <Button type="submit" variant="primary" id="createBlogButton">CREATE</Button>
                </Col>
              </Form.Row>         
            </Form.Group>
          </Form>  
        </div>
      </Collapse>     
    </div>

  )
}

const mapDispatchToProps = { createBlog, setTimedNotification }

export default connect(null, mapDispatchToProps)(BlogForm)