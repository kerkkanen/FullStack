const Navigation = ({ user, handleLogout }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-custom">
        <ul className="navbar-nav">
          <li className="nav-link">
            <a className="nav-link" href="/">
              blogs
            </a>
          </li>
          <li className="nav-link">
            <a className="nav-link" href="/users">
              users
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-link" textAlign="right">
            <strong>{user.username} logged in</strong>{' '}
            <button id="logout" onClick={() => handleLogout()}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
