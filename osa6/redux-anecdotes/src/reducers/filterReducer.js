
  import { createSlice } from '@reduxjs/toolkit'

  const initialState = ''
  
  const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        searchedFilter(state, action) {
            return action.payload
        }
    }
  })
  
  export const { searchedFilter } = filterSlice.actions
  export default filterSlice.reducer

