import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdoteObject => {
  return async dispatch => {
    const votes = anecdoteObject.votes + 1
    const updatableAnecdote = {...anecdoteObject, votes}
    await anecdoteService.update(anecdoteObject.id, updatableAnecdote)    
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
