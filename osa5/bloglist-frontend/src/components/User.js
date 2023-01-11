import { useParams } from 'react-router-dom'

const User = ({ users, blogs }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  const usersBlogs = blogs.filter((blog) => blog.user.id === id)

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>added blogs</h4>
      {usersBlogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default User
