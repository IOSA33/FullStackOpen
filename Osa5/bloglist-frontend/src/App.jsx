import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [formVisible, setFormVisible] = useState(false)

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

  const handleSubmitBlog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(response))
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setErrorMessage('Missed some inputs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logoutHandle = () => {
    window.localStorage.clear()
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

  const blogForm = () => {
    return (
      <div>
        <br></br>
        <h2>add new blog</h2>
        <form onSubmit={handleSubmitBlog}>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
          <br></br>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
          <br></br>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
          <br></br>
          <button type="submit">create</button>
          <br></br>
          <button type='button' onClick={ () => func_setFormVisible() }>cancel</button>
        </form>
      </div>
    )
  } 

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

          {blogForm()}

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App