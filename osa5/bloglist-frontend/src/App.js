import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    }catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const addBlog = async (blogObject) => {

    if (blogObject.title.length === 0 || blogObject.url === 0) {
      setErrorMessage('title or url us missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      return
    }

    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...blog, user }))
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 4000)
    } catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const addLike = async (blogObject) => {
    const likes = blogObject.likes + 1
    const updatableBlog = { ...blogObject, likes }

    await blogService.update(updatableBlog.id, updatableBlog)

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {

      try {
        await blogService.remove(blog.id)

        setSuccessMessage(`blog ${blog.title} by ${blog.author} is deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
      } catch (exception) {
        setErrorMessage('something went wrong')
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }

      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = async (event) => {
    setPassword(event.target.value)
  }

  const sortedBlogs = (blogs.map(blog => blog)).sort((a, b) => {
    if (a.likes > b.likes) return 1
    if (a.likes < b.likes) return -1
    return 0
  })

  return (
    <div className='page'>
      <Notification message={successMessage} className="success"/>
      <Notification message={errorMessage} className="error"/>

      <h2>Blogs</h2>

      {user === null ?
        <LoginForm
          Login={login}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        /> :

        <div>
          <p>
            <strong>{user.username} logged in</strong> <button onClick={() => handleLogout(user)}>Logout</button>
          </p>
          <div className='createBlog'>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>

          {sortedBlogs.reverse().map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>
          ).sort((a, b) => a.likes - b.likes)}


        </div>
      }
    </div>
  )
}

export default App
