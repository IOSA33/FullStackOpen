import { createContext, useContext, useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

const AnecdoteContext = createContext()

export const AnecdoteProvider = ({ children }) => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (object) => {
    const response = await anecdoteService.createNew(object)
    setAnecdotes(prev => [...prev, response])
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteAnecdote(id)
    setAnecdotes(prev => prev.filter(anecdote => anecdote.id !== id))
  }

  return (
    <AnecdoteContext.Provider value={{ anecdotes, addAnecdote, deleteAnecdote }}>
      {children}
    </AnecdoteContext.Provider>
  )
}

export const useAnecdotes = () => {
  return useContext(AnecdoteContext)
}
