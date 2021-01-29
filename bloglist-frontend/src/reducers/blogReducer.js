import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch(action.type)
    {
        case 'NEW_BLOG':
            return [...state, action.data]

        case 'INIT_BLOGS':
            return action.data

        case 'LIKE':
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const updatedBlog = { 
                ...blogToLike, 
                likes: blogToLike.likes
            }
            return state.map(blog =>
                blog.id !== id ? blog : updatedBlog 
            )

        case 'COMMENT':
            const id1 = action.data.id
            const blogToComment = state.find(b => b.id === id1)
            const updatedBlog1 = { 
                ...blogToComment, 
                comments: blogToComment.comments
            }
            return state.map(blog =>
                blog.id !== id1 ? blog : updatedBlog1 
            )


        case 'DELETE_BLOG':
            const blogId = action.data
            return state.filter(blog => blog.id !== blogId)
        
        default:
            return state
    }
}

export const createBlog = (content) => {  
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
  }

export const like = (blog) => {  
    return async dispatch => {
        blog.likes += 1
        const updatedBlog = await blogService.update(blog.id, blog)
        dispatch({
            type: 'LIKE',
            data: updatedBlog
        })
    }
}

export const deleteBlog = (id) => {  
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: id
        })
    }
}

export const comment = (blog, content) => {
    return async dispatch => {
        blog.comments = blog.comments.concat(content.comment)
        const updatedBlog = await blogService.commentBlog(blog.id, content)
        dispatch({
            type: 'COMMENT',
            data: updatedBlog
        })
    }
}

export default reducer