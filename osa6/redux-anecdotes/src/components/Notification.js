import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'none',
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    color: 'green'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
