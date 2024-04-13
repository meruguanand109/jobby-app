import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'
import Profile from '../Profile'
import Headers from '../Headers'
import FilterByType from '../FilterByType'
import FilterByPackage from '../FilterByPackage'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    activeFilterTypeId: [],
    activeFilterPackageId: '',
    isLoading: false,
    jobsList: '',
    isRequestDone: false,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({isLoading: true})
    const {searchInput} = this.state
    const {activeFilterTypeId, activeFilterPackageId} = this.state
    const typeIds = activeFilterTypeId.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeIds}&minimum_package=${activeFilterPackageId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const formattedData = fetchedData.jobs.map(eachData => ({
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
        isLoading: false,
        jobsList: formattedData,
        isRequestDone: true,
      })
    } else {
      this.setState({
        isLoading: false,
        isRequestDone: false,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = event => {
    event.preventDefault()
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.getJobsList()
    }
  }

  onClickRetryBtn = () => {
    this.getJobsList()
  }

  onClickFilterType = (event, id) => {
    const {activeFilterTypeId} = this.state
    if (event.target.checked) {
      this.setState(
        {activeFilterTypeId: [...activeFilterTypeId, id]},
        this.getJobsList,
      )
    } else {
      const typeRemovedArray = activeFilterTypeId.filter(each => each !== id)
      this.setState({activeFilterTypeId: typeRemovedArray}, this.getJobsList)
    }
  }

  onClickPackageFilter = id => {
    this.setState({activeFilterPackageId: id}, this.getJobsList)
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length === 0 ? (
          <div className="jobs-route-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="jobs-route-failure-img"
            />
            <h1 className="jobs-route-failure-heading">No Jobs Found</h1>
            <p className="jobs-route-failure-para">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        ) : (
          <>
            <ul className="jobs-list">
              {jobsList.map(eachJob => (
                <JobItem jobDetails={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </>
        )}
      </>
    )
  }

  renderAfterRequest = () => {
    const {isRequestDone} = this.state
    return (
      <>
        {isRequestDone ? (
          this.renderSuccessView()
        ) : (
          <div className="jobs-route-failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
              className="jobs-route-failure-img"
            />
            <h1 className="jobs-route-failure-heading">
              Oops! Something Went wrong
            </h1>
            <p className="jobs-route-failure-para">
              We cannot seem to find the page you are looking for
            </p>
            <button className="retry-btn" onClick={this.onClickRetryBtn}>
              Retry
            </button>
          </div>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading, searchInput} = this.state
    return (
      <>
        <Headers />
        <div className="jobs-page-container">
          <div className="jobs-left-container ">
            <form
              className="jobs-search-container mb"
              onSubmit={this.onClickSearchBtn}
            >
              <input
                type="search"
                className="input-search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="submit"
                data-testid="searchButton"
                onClick={this.onClickSearchBtn}
                className="search-btn"
              >
                <BsSearch className="search-icon" />
              </button>
            </form>
            <Profile />
            <hr className="separator" />
            <p className="filter-heading">Types of Employement</p>
            <ul className="filters-container">
              {employmentTypesList.map(eachData => (
                <FilterByType
                  data={eachData}
                  key={eachData.employmentTypeId}
                  onClickFilterType={this.onClickFilterType}
                />
              ))}
            </ul>
            <hr className="separator" />
            <p className="filter-heading">Salary Range</p>
            <ul className="filters-container">
              {salaryRangesList.map(eachData => (
                <FilterByPackage
                  data={eachData}
                  key={eachData.salaryRangeId}
                  onClickPackageFilter={this.onClickPackageFilter}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-list-container">
            {isLoading ? (
              this.renderLoader()
            ) : (
              <>
                <form
                  className="jobs-search-container"
                  onSubmit={this.onClickSearchBtn}
                >
                  <input
                    type="search"
                    className="input-search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="submit"
                    data-testid="searchButton"
                    onClick={this.onClickSearchBtn}
                    className="search-btn"
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </form>
                {this.renderAfterRequest()}
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
