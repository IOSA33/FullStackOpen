import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        if (event === '') {
            setValue('')
            return
        }
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = async (object) => {
        const response_json = await anecdoteService.createNew(object)
        setAnecdotes(anecdotes.concat(response_json))
    }

    return {
        anecdotes,
        addAnecdote
    }
}
