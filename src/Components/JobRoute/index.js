import {MdLocationOn} from 'react-icons/md'
import {IoBagCheck} from 'react-icons/io5'
import {FaExternalLinkAlt, FaStar} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Headers from '../Headers'
import SkillsItem from '../SkillsItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

class JobRoute extends Component {
  state = {
    jobDetails: '',
    isLoading: false,
    isRequestDone: false,
    similarJobs: '',
    skills: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onClickRetryBtn = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const fetchedJobDetails = fetchedData.job_details
      const fetchedSimilarJobs = fetchedData.similar_jobs
      const formattedJobDetails = {
        id: fetchedJobDetails.id,
        employmentType: fetchedJobDetails.employment_type,
        packagePerAnnum: fetchedJobDetails.package_per_annum,
        location: fetchedJobDetails.location,
        rating: fetchedJobDetails.rating,
        title: fetchedJobDetails.title,
        companyLogoUrl: fetchedJobDetails.company_logo_url,
        jobDescription: fetchedJobDetails.job_description,
        lifeAtCompany: fetchedJobDetails.life_at_company,
        companyWebsiteUrl: fetchedJobDetails.company_website_url,
      }
      const formattedSkills = fetchedJobDetails.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const formattedSimilarJobs = fetchedSimilarJobs.map(eachData => ({
        title: eachData.title,
        rating: eachData.rating,
        location: eachData.location,
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        jobDescription: eachData.job_description,
        employmentType: eachData.employment_type,
        packagePerAnnum: eachData.package_per_annum,
      }))
      this.setState({
        isRequestDone: true,
        jobDetails: formattedJobDetails,
        similarJobs: formattedSimilarJobs,
        isLoading: false,
        skills: formattedSkills,
      })
    } else {
      this.setState({isLoading: false, isRequestDone: false})
    }
  }

  renderFailureView = () => (
    <div className="jobs-route-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-route-failure-img"
      />
      <h1 className="jobs-route-failure-heading">Oops! Something Went wrong</h1>
      <p className="jobs-route-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" onClick={this.onClickRetryBtn}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, skills, similarJobs} = this.state
    const {
      title,
      location,
      jobDescription,
      packagePerAnnum,
      employmentType,
      rating,
      companyLogoUrl,
      companyWebsiteUrl,
      lifeAtCompany,
    } = jobDetails
    return (
      <>
        <div className="job-route-container">
          <div className="job-route-profile-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-company-logo"
            />
            <div className="job-route-title">
              <h1 className="job-route-title-heading">{title}</h1>
              <div className="job-route-rating">
                <FaStar className="yellow" />
                <p className="job-route-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-route-text-container">
            <div className="job-route-location-container">
              <div className="job-route-sub-1">
                <div className="job-route-location">
                  <MdLocationOn />
                  <p className="job-route-location-text">{location}</p>
                </div>
                <div className="job-route-type">
                  <IoBagCheck />
                  <p className="job-route-type-text">{employmentType}</p>
                </div>
              </div>
              <div className="job-route-package">
                <p className="job-route-package-text">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="separator" />
            <div className="job-route-description-heading-container">
              <h1 className="job-route-description-heading">Description</h1>
              <button className="visit-btn">
                <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                  Visit
                  <FaExternalLinkAlt className="visit-icon" />
                </a>
              </button>
            </div>
            <p className="job-route-description">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachSkill => (
                <SkillsItem details={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
            <h1 className="life-heading">Life at Company</h1>
            <div className="life-container">
              <p className="life-text">{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.image_url} className="life-img" />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachJob => (
            <SimilarJobItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderRequest = () => {
    const {isRequestDone} = this.state
    return (
      <>{isRequestDone ? this.renderSuccessView() : this.renderFailureView()}</>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Headers />
        <div className="job-route-page">
          {isLoading ? this.renderLoader() : this.renderRequest()}
        </div>
      </>
    )
  }
}
export default JobRoute
