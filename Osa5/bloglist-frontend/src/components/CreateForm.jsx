import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAddBlog = (event) => {
      event.preventDefault()

      createBlog({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')
    }

    return (
      <div>
        <h2>add new blog</h2>
        <form onSubmit={handleAddBlog}>
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
        </form>
      </div>
    )
}

export default CreateForm