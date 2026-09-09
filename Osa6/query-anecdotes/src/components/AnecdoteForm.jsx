import { useAnecdotes } from "./customHook"
import useNotify from "./useNotify"

const AnecdoteForm = () => {
  const { setMessage } = useNotify()
  
  const { addAnecdote } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      setMessage(`Length is less than 5: '${content}'`)
      return
    }

    setMessage(`Created Anecdote ${content}`)
    event.target.reset()
    console.log('new anecdote')
    addAnecdote(content)    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm