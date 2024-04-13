import {MdLocationOn} from 'react-icons/md'
import {IoBagCheck} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    title,
    location,
    jobDescription,
    employmentType,
    rating,
    companyLogoUrl,
  } = jobDetails
  return (
    <li className="similar-jobs-item">
      <div className="s-j-profile">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="s-j-logo"
        />
        <div className="s-j-title-container">
          <h1 className="s-j-title">{title}</h1>
          <div className="s-j-rating">
            <FaStar className="yellow" />
            <p className="s-j-rating-text">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="s-j-description-h">Description</h1>
      <p className="s-j-description-p">{jobDescription}</p>
      <div className="s-j-footer">
        <div className="job-location">
          <MdLocationOn />
          <p className="job-location-text">{location}</p>
        </div>
        <div className="job-type">
          <IoBagCheck />
          <p className="job-type-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
