import React from 'react'

const CreateBlog = ({newBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => {
  return (    
    <div>
        <h2>Create Blog</h2>

        <form onSubmit={newBlog}>
        <div>
            title: <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            />
        </div>
        <div>
            author: <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            />
        </div>
        <div>
            url: <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            />
        </div>
        <button type="submit">create</button>
        </form>

   </div>
  )
}

export default CreateBlog











