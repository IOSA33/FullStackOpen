import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAll} from './services/anecdote'
import CounterContext from './components/CounterContext'

import { useQuery } from '@tanstack/react-query'

const App = () => {
  const { setMessage } = useContext(CounterContext)

  const handleVote = (anecdote) => {
    setMessage(`you voted '${anecdote.content}' voted`)
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if (result.isPending) {
    return (
      <div>
        anecdote service not available due to problem in server
      </div>
    )
  }

  const anecdotes_result = result.data

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes_result.map((anecdote) => (
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