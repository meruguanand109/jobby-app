import {Component} from 'react'
import {Link} from 'react-router-dom'
import Headers from '../Headers'
import './index.css'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <>
        <Headers />
        <div className="home-container">
          <h1 className="home-heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary
            <br className="br" /> information, company reviews. Find the job
            that fits your
            <br className="br" /> abilities and potential.
          </p>
          <Link to="/jobs" className="nav-link">
            <button className="find-jobs-btn" onClick={this.onClickFindJobs}>
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
