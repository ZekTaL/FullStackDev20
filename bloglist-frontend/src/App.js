import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({message: null, type: null})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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

  const handleLogin = async (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)  
    try 
    {      
      const user = await loginService.login({username, password})   
      window.localStorage.setItem(tokenName, JSON.stringify(user)) 
      blogService.setToken(user.token)   
      setUser(user)      
      setUsername('')      
      setPassword('')
      setNotificationMessage({message: 'Login successful', type: notificationType.success})
      setTimeout(() => {setNotificationMessage({message: null})}, 5000) 
      const blogs = await blogService.getAll()
      setBlogs( blogs ) 
    } 
    catch (exception) 
    {   
      if (exception.message.includes('code 500'))
      {
        setNotificationMessage({message: 'Server Error', type: notificationType.error})
      }
      else if (exception.message.includes('code 401'))
      {
        setNotificationMessage({message: 'Wrong Credentials', type: notificationType.error})
      }
      else
      {
        setNotificationMessage({message: exception.message, type: notificationType.error})
      }
  
      setTimeout(() => {setNotificationMessage({message: null})}, 5000) 
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(tokenName)
    setUser(null)
    setNotificationMessage({message: 'Logout successful', type: notificationType.success})
    setTimeout(() => {setNotificationMessage({message: null})}, 5000) 
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor === '' ? 'anonymous' : blogAuthor,
      url: blogUrl
    }
  
    try
    {
      const returnedBlog = await blogService.create(blogObject) 
      setBlogs(blogs.concat(returnedBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setNotificationMessage({message: 'Blog Created!', type: notificationType.success})
      setTimeout(() => {setNotificationMessage({message: null})}, 5000) 
    }
    catch (exception)
    {
      setNotificationMessage({message: 'Insert a valid Title and URL', type: notificationType.error})
      setTimeout(() => {setNotificationMessage({message: null})}, 5000)
    }
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">LOGIN</button>
    </form>      
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>LOGOUT</button>
  )

  const createBlogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <div>
        Title
        <input
          value={blogTitle}
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          value={blogAuthor}
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          value={blogUrl}
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button type="submit">CREATE</button>
    </form>      
  )

  const blogList = () => (
    <ul>{blogs.map(blog => <Blog key={blog.id} blog={blog} />)}</ul>
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
          <h3>Create new blog!</h3>
          {createBlogForm()}
          <h3>Blog list:</h3>
          {blogList()}
        </div>
      </div>
    )
  }
}

export default App
