
import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center'
  }

  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  let deleteButton = ''

  if (user.username === blog.user.username) {
    deleteButton = <div><button className='deleteButton' id='remove' onClick={() => {removeBlog(blog, user)}}>remove</button></div>
  }

  if (showMore) {
    return (
      <div style={blogStyle}>
        <div className='moreInfo'>
          {blog.title} by {blog.author}
          <br></br>
          {blog.url}
          <br></br>
          likes {blog.likes} <button id='like' onClick={() => {addLike(blog)}}>like</button>
          <br></br>
          {blog.user.username}
          {deleteButton}
          <div>
            <button onClick={toggleShowMore}>hide</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div className='blog'>
          {blog.title} by {blog.author} <button id='view' onClick={toggleShowMore}>view</button>
        </div>
      </div>
    )
  }

}

export default Blog