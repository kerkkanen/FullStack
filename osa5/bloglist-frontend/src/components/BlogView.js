import React from 'react'
import ShowBlogs from './ShowBlogs'
import CreateBlog from './CreateBlog'

const BlogView = ({user, handleLogout, blogs, newBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => {
  return (    
    <div>
    <p>
      {user.username} logged in <button onClick={(event) => handleLogout(user)}>Logout</button>
    </p>

    <CreateBlog
    newBlog={newBlog}
    title={title}
    handleTitleChange={handleTitleChange}
    author={author}
    handleAuthorChange={handleAuthorChange}
    url={url}
    handleUrlChange={handleUrlChange}
    />
    
    <ShowBlogs blogs={blogs} />
  </div>
  )
}

export default BlogView











