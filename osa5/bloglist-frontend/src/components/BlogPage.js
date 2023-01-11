const BlogPage = ({ blog, addLike }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title}, {blog.author}
      </h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes{' '}
          <button
            id="like"
            onClick={() => {
              addLike(blog)
            }}
          >
            like
          </button>
        </div>
        <div>added by {blog.user.username}</div>
      </div>
    </div>
  )
}

export default BlogPage
