import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Profile extends Component {
  state = {
    profileDetails: '',
    isLoaing: false,
    isRequestDone: false,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({isLoaing: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const formattedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: formattedProfileDetails,
        isLoaing: false,
        isRequestDone: true,
      })
    } else {
      this.setState({isLoaing: false, isRequestDone: false})
    }
  }

  onClickRetryBtn = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button className="retry-btn" onClick={this.onClickRetryBtn}>
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingPage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNonLoadingPage = () => {
    const {isRequestDone} = this.state
    return (
      <>
        {isRequestDone
          ? this.renderProfileSuccessView()
          : this.renderProfileFailureView()}
      </>
    )
  }

  render() {
    const {isLoaing, isRequestDone} = this.state
    return (
      <>{isLoaing ? this.renderLoadingPage() : this.renderNonLoadingPage()}</>
    )
  }
}
export default withRouter(Profile)
