import {MdLocationOn} from 'react-icons/md'
import {IoBagCheck} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails, history} = props
  const {
    id,
    title,
    location,
    jobDescription,
    packagePerAnnum,
    employmentType,
    rating,
    companyLogoUrl,
  } = jobDetails
  const onClickJobItem = () => {
    history.push(`/jobs/${id}`)
  }
  return (
    <li className="job-item">
      <button className="btn" onClick={onClickJobItem}>
        <div className="job-profile-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-company-logo"
          />
          <div className="job-title">
            <h1 className="job-title-heading">{title}</h1>
            <div className="job-rating">
              <FaStar className="yellow" />
              <p className="job-rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-text-container">
          <div className="job-location-container">
            <div className="job-sub-1">
              <div className="job-location">
                <MdLocationOn />
                <p className="job-location-text">{location}</p>
              </div>
              <div className="job-type">
                <IoBagCheck />
                <p className="job-type-text">{employmentType}</p>
              </div>
            </div>
            <div className="job-package">
              <p className="job-package-text">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="separator" />
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </button>
    </li>
  )
}

export default withRouter(JobItem)
