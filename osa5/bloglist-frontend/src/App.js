import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import User from './components/User'
import BlogPage from './components/BlogPage'
import Users from './components/Users'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
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
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
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
      setSuccessMessage(`a new blog ${blog.title} is added`)
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

  const blogFormRef = useRef()

  const addLike = async (blogObject) => {
    const likes = blogObject.likes + 1
    const updatableBlog = { ...blogObject, likes }

    await blogService.update(updatableBlog.id, updatableBlog)

    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

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

      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = async (event) => {
    setPassword(event.target.value)
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <div className="container">
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />

      <div className="header">
        <h1>Blogs</h1>
      </div>

      {user === null ? (
        <LoginForm
          Login={login}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <div className="insides">
          <Navigation user={user} handleLogout={handleLogout} />

          <Routes>
            <Route
              path="/blogs/:id"
              element={<BlogPage blog={blog} addLike={addLike} />}
            />
            <Route
              path="/users/:id"
              element={<User users={users} blogs={blogs} />}
            />
            <Route
              path="/users"
              element={<Users users={users} blogs={blogs} />}
            />
            <Route
              path="/"
              element={
                <Blogs
                  blogs={blogs}
                  user={user}
                  addBlog={addBlog}
                  addLike={addLike}
                  removeBlog={removeBlog}
                  blogFormRef={blogFormRef}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
