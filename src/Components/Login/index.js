import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
    isSubmitFailed: false,
  }

  onSubmitFormSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchResult = await response.json()
    if (response.ok) {
      const jwtToken = fetchResult.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.setState({
        usernameInput: '',
        passwordInput: '',
        errorMsg: '',
        isSubmitFailed: false,
      })
      this.onSubmitFormSuccess()
    } else {
      const errorMsg = fetchResult.error_msg
      this.setState({errorMsg, isSubmitFailed: true})
    }
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({usernameInput: event.target.value})
  }

  render() {
    const {usernameInput, passwordInput, errorMsg, isSubmitFailed} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-page-logo"
          />
          <label htmlFor="username" className="label-username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-username"
            placeholder="Username"
            value={usernameInput}
            onChange={this.onChangeUserName}
          />
          <label htmlFor="password" className="label-password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-password"
            placeholder="Password"
            value={passwordInput}
            onChange={this.onChangePassword}
          />
          <button className="login-btn" type="submit">
            Login
          </button>
          {isSubmitFailed && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
