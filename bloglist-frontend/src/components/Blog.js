import React from 'react'
import Togglable from './Togglable'
import '../index.css'

const Blog = ({ user, blog, handleUpdateLikes, handleDeleteBlog }) => (
  <table className="blogTable">
    <tbody>
      <tr>
        <td id="deleteButtonCell" width="55" align="center">
          {blog.user
            ? user.username === blog.user.username
              ? <button onClick={() => handleDeleteBlog(blog)}><img src="https://image.flaticon.com/icons/png/512/39/39220.png" height="30" alt="DELETE"></img></button>
              : <button onClick={() => handleDeleteBlog(blog)} disabled><img src="https://image.flaticon.com/icons/png/512/39/39220.png" height="30" alt="DELETE"></img></button>
            : <button onClick={() => handleDeleteBlog(blog)}><img src="https://image.flaticon.com/icons/png/512/39/39220.png" height="30" alt="DELETE"></img></button>
          }

        </td>
        <td>
          <div className="blog">
            {blog.title} [{blog.author}]
            <Togglable buttonLabel='VIEW' alternateButton="HIDE">
              <div>
                {blog.url}
                <br></br>
                <i>Likes:</i> {blog.likes} <button id="likesButton" onClick={() => handleUpdateLikes(blog)}>+1</button>
                <br></br>
                <i>Posted by: </i> {blog.user ? blog.user.name : 'guest'}
              </div>
            </Togglable>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
)

export default Blog