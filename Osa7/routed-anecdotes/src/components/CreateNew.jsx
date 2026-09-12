import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({ 
      content: content.value, 
      author: author.value, 
      info: info.value, 
      votes: 0 
    })
    navigate("/")
  }

  const clearInputs = () => {
    content.onChange('')
    author.onChange('')
    info.onChange('')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        
      </form>
      <button onClick={clearInputs}>reset</button>
    </div>
  )
}

export default CreateNew
