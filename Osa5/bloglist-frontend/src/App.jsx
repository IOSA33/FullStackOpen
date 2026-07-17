import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)  

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleSubmitBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Missed some inputs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (id, updatedBlogObject) => {
    try {
      const response = await blogService.update(id, updatedBlogObject)
      setBlogs(blogs.map(b => b.id === id ? response : b))
    } catch {
      setErrorMessage('Missed some inputs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutHandle = () => {
    window.localStorage.clear()
    setUser(null)
    return
  }

  const func_setFormVisible = () => {
    setFormVisible(!formVisible)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in application</h2>

      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const showErrorMessage = () => {
    return (
      <div>
        <b>
          {errorMessage}
        </b>
      </div>
    )
  }

  return (
    <div>
      {!user && (
        <div>
          {errorMessage && showErrorMessage()}
          {loginForm()}
        </div>
        )}
      
      {user && (
        <div>
          <h1>blogs</h1>
          {errorMessage && showErrorMessage()}

          <p>{user.name} logged in
            <button onClick={logoutHandle}>logout</button>
          </p>

          <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
            <CreateForm createBlog={handleSubmitBlog} />
          </Togglable>

          {
            [...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} updateLikes={handleUpdateBlog} />
            )
          }
        </div>
      )}
    </div>
  )
}

export default App