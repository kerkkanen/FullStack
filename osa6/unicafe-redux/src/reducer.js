

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changedGood = state.good +1
      return {...state, good: changedGood}
    case 'OK':
      const changedOk = state.ok + 1
      return {...state, ok: changedOk}
    case 'BAD':
      const changedBad = state.bad + 1
      return {...state, bad: changedBad}
    case 'ZERO':
      return initialState
    default: return initialState
  }
  
}

export default counterReducer