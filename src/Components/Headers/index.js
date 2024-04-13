import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {IoBagSharp, IoExitOutline} from 'react-icons/io5'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Headers = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onCLickLogo = () => {
    history.push('/')
  }
  return (
    <div className="headers-container">
      <div className="header-logo-section">
        <Link className="nav-link" to="/">
          <button className="header-log-btn" onClick={onCLickLogo}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="header-logo"
            />
          </button>
        </Link>
      </div>
      <div className="header-nav-links">
        <Link to="/" className="nav-link">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="nav-link">
          <p>Jobs</p>
        </Link>
      </div>
      <button className="logout-btn" onClick={onClickLogout}>
        Logout
      </button>
      <ul className="mobile-view">
        <li>
          <Link className="nav-link" to="/">
            <MdHome />
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/jobs">
            <IoBagSharp />
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/login">
            <button className="m-logout-btn" onClick={onClickLogout}>
              <IoExitOutline className="logout-btn-icon" />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Headers)
