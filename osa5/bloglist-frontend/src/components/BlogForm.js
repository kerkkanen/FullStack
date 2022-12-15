import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create Blog</h2>

      <form onSubmit={addBlog}>
        <div>
            title: <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder='title here'
          />
        </div>
        <div>
            author: <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            placeholder='author here'
          />
        </div>
        <div>
            url: <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            placeholder='url here'
          />
        </div>
        <button id='create' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
