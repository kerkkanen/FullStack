import React from 'react'

import { Link } from 'react-router-dom'

const Users = ({ users, blogs }) => {
  ;<h2>Users</h2>

  const blogCount = (user) => {
    let count = 0
    blogs.forEach((blog) => {
      if (blog.user.username === user) {
        count += 1
      }
    })
    return count
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">user</th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{blogCount(user.username)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
