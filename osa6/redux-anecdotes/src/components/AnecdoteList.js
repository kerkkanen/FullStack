import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    anecdotes = anecdotes.filter(a => {
      const filtered = a.content.toLowerCase().includes(filter.toLowerCase())
      if (filtered) {
        return a
      }
    })

    const voteAction = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 2))
    }

    return (
      <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAction(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
      )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdoteList
