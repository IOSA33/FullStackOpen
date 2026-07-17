import Togglable from "./Togglable"
import { useState } from "react"

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const changeShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const visibilityFunc = () => {
    if (showInfo) {
      return "hide"
    } else {
      return "view"
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} 
      
        <button onClick={() => changeShowInfo()}>
          {visibilityFunc()}
        </button>
     
      <div style={visibilityStyle}>
        {blog.url}
        <br></br>
        likes {blog.likes} <button>like</button>
        <br></br>
        {blog.user?.name}
      </div>

    </div>
  )
}

export default Blog