
  import { createSlice } from '@reduxjs/toolkit'

  const initialState = null
  
  const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
          return action.payload
        },

        resetNotification(state, action) {
          return null
        }
    }
  })
  
  export const { showNotification, resetNotification } = notificationSlice.actions
  export default notificationSlice.reducer

  export const setNotification = (message, time) => {
    return async dispatch => {
      dispatch(showNotification(message))

      setTimeout(() => {
        dispatch(resetNotification(null))
      }, time * 1000)
    }

  }