import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({ message: null, type: null })
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const notificationType = {
    error: 'error',
    success: 'success'
  }

  const tokenName = 'loggedToBlogApp'

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(tokenName)
    if (loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      async function getBlogList() {
        const blogs = await blogService.getAll()
        setBlogs( blogs )
      }
      getBlogList()
    }
  }, [])

  const handleLogin = async (login) => {

    try
    {
      const user = await loginService.login(login)
      window.localStorage.setItem(tokenName, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotificationMessage({ message: 'Login successful', type: notificationType.success })
      setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
      const blogs = await blogService.getAll()
      setBlogs( blogs )
      blogFormRef.current.toggleVisibility()
    }
    catch (exception)
    {
      if (exception.message.includes('code 500'))
      {
        setNotificationMessage({ message: 'Server Error', type: notificationType.error })
      }
      else if (exception.message.includes('code 401'))
      {
        setNotificationMessage({ message: 'Wrong Credentials', type: notificationType.error })
      }
      else
      {
        setNotificationMessage({ message: exception.message, type: notificationType.error })
      }

      setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(tokenName)
    setUser(null)
    setNotificationMessage({ message: 'Logout successful', type: notificationType.success })
    setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
  }

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try
    {
      const returnedBlog = await blogService.create(blogObject)
      returnedBlog.user = {
        name: user.name,
        username: user.username,
        id: returnedBlog.user
      }
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage({ message: 'Blog Created!', type: notificationType.success })
      setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
    }
    catch (exception)
    {
      setNotificationMessage({ message: 'Insert a valid Title and URL', type: notificationType.error })
      setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
    }
  }

  const handleUpdateLikes = async (highlightedBlog) => {
    try
    {
      const updatedBlog = { ...highlightedBlog, likes: highlightedBlog.likes+1 }
      await blogService.update(updatedBlog.id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    }
    catch (exception)
    {
      setNotificationMessage({ message: 'Failed to like the blog!', type: notificationType.error })
      setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
    }
  }

  const handleDeleteBlog = async (highlightedBlog) => {
    try
    {
      if (window.confirm(`Delete '${highlightedBlog.title}'?`))
      {
        await blogService.deleteBlog(highlightedBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== highlightedBlog.id))
        setNotificationMessage({ message: `Deleted '${highlightedBlog.title}'`, type: 'success' })
        setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
      }
    }
    catch (exception)
    {
      if (exception.message.includes('code 401'))
      {
        setNotificationMessage({ message: 'Unauthorize: only the creator of the blog can delete it', type: notificationType.error })
      }
      else
      {
        setNotificationMessage({ message: exception.message, type: 'error' })
      }

      setTimeout(() => {setNotificationMessage({ message: null })}, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='LOGIN' ref={loginFormRef}>
      <LoginForm login={handleLogin} />
    </Togglable>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>LOGOUT</button>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel='NEW BLOG' ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )

  const blogList = () => (
    <div>
      {blogs
        .sort((x, y) => y.likes - x.likes)
        .map(blog => <Blog key={blog.id} user={user} blog={blog} handleUpdateLikes={handleUpdateLikes} handleDeleteBlog={handleDeleteBlog}/>)}
    </div>
  )

  if (user === null)
  {
    return (
      <div>
        <h1>BLOGS</h1>
        <Notification notificationMessage={notificationMessage} />
        <div>
          <h3>Login to view the blogs list!</h3>
          {loginForm()}
        </div>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h1>BLOGS</h1>
        <Notification notificationMessage={notificationMessage} />
        <div>
          <p><i>{user.name}</i> logged-in {logoutButton()}</p>
          {createBlogForm()}
          <h3>Blog list:</h3>
          {blogList()}
        </div>
      </div>
    )
  }
}

export default App
