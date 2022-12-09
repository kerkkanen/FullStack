import PropTypes from 'prop-types'

const LoginForm = ({
  Login,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={Login}>
        <div>
          username: <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password: <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  Login: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm