import React from 'react'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, user, addBlog, addLike, removeBlog, blogFormRef }) => {
  const sortedBlogs = blogs
    .map((blog) => blog)
    .sort((a, b) => {
      if (a.likes > b.likes) return 1
      if (a.likes < b.likes) return -1
      return 0
    })

  return (
    <div>
      <div className="createBlog">
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <div>
        {sortedBlogs
          .reverse()
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              removeBlog={removeBlog}
              user={user}
            />
          ))
          .sort((a, b) => a.likes - b.likes)}
      </div>
    </div>
  )
}

export default Blogs
