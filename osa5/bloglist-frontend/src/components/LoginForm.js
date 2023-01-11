import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const LoginForm = ({
  Login,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={Login}>
        <div>
          username:{' '}
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password:{' '}
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="success" id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  Login: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
