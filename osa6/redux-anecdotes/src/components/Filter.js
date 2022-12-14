import { useDispatch } from 'react-redux'
import { searchedFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(searchedFilter(event.target.value))    
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name='searched' onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter
