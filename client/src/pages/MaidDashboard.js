import React from 'react'

// import components
import MaidNavBar from '../components/Navigation/MaidNavBar'

//import images and css
import DashboardImage from "../assets/dashboard/dashboard.png"
import "./MaidDashboard.css"

const MaidDashboard = (props) => {


  
  return (
    <div>
      <MaidNavBar />
      <div className='page-container'>
        <section className="hero is-small is-light">
          <div className="hero-body">
            <img src={DashboardImage} alt="dashboard logo"></img>
          </div>
          </section>
          <hr/>
          <div className='scheduled-cleanings-container'>
              <h1 className='title'>
                Scheduled Cleanings
              </h1>
              <div className='scheduled-cleanings-list'>
                Here are the times
              </div>
          </div>
          <hr/>
          <div className='maid-reviews-container'>
            <h1 className='title'>
              My Reviews
            </h1>
            <div className='maid-reviews-list'>
                Here are the times
              </div>
          </div>
          <hr/>
          <div className='maid-rating-container'>
            <h1 className='title'>
              My Rating
              </h1>
              <div className='maid-rating-list'>
                Rating here
              </div>
              <div className='maid-buttons'>
          <button className="button is-link is-light">Contact Supervisor</button>
          <button className="button is-link is-light">Rating Forgiveness Request</button>
          <button className="button is-link is-light">Request PTO</button>
          </div>
          </div>
          {/* not functioning just for filler */}
      </div>
      <hr/>
    </div>
  )
}

export default MaidDashboard