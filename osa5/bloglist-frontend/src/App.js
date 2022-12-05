import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const Login = async (event) => {
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

  const newBlog = async (event) => {
    event.preventDefault()

    if (title.length === 0 || url.length === 0) {
      setErrorMessage('title or url us missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      return
    }
    
    try {
      const blog = await blogService.create({
        author, title, url
      })
      setBlogs(blogs.concat(blog))

      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 4000)

    }catch (exception) {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = async (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <Notification message={successMessage} className="success"/>
      <Notification message={errorMessage} className="error"/>

      <h2>Blogs</h2>
      
      {user === null ?
        <LoginForm
        Login={Login}
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        /> :

        <BlogView
        user={user}
        handleLogout={handleLogout}
        blogs={blogs}
        newBlog={newBlog}
        title={title}
        handleTitleChange={handleTitleChange}
        author={author}
        handleAuthorChange={handleAuthorChange}
        url={url}
        handleUrlChange={handleUrlChange}
        />
      }      
    </div>
  )
}

export default App
