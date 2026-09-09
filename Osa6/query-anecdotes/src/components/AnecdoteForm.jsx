import { useContext } from "react"
import CounterContext from "./CounterContext"
import { createAnecdote } from "../services/anecdote"
import { useAnecdotes } from "./customHook"

const AnecdoteForm = () => {
  const { setMessage } = useContext(CounterContext)
  
  const { addAnecdote } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
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