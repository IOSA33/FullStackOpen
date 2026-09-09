import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './components/customHook'
import useNotify from './components/useNotify'

const App = () => {
  const { anecdotes, isPending, addAnecdote, likeAnecdote } = useAnecdotes()
  const { setMessage } = useNotify()

  const handleVote = (anecdote) => {
    setMessage(`you voted '${anecdote.content}' voted`)
    likeAnecdote(anecdote)
    console.log('vote')
  }

  if (isPending) {
    return (
      <div>
        anecdote service not available due to problem in server
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App