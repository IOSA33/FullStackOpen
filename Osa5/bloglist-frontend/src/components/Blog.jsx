import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const changeShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const visibilityFunc = () => {
    if (showInfo) {
      return 'hide'
    } else {
      return 'view'
    }
  }

  const visibilityStyle = { display : showInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdatedLikes = () => {
    updateLikes(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}

        <button onClick={() => changeShowInfo()}>
          {visibilityFunc()}
        </button>

      <div style={visibilityStyle}>
        {blog.url}
        <br></br>
        likes {blog.likes} <button onClick={() => handleUpdatedLikes()}>like</button>
        <br></br>
        {blog.user?.name}
        <br></br>
        <button onClick={() => handleDeleteBlog()}>remove</button>
      </div>

    </div>
  )
}

export default Blog