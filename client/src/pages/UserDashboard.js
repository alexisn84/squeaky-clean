import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import MaidNavBar from '../components/Navigation/MaidNavBar';
import DashboardImage from "../assets/dashboard/dashboard.png";
const UserDashboard = (props) => {
  var loggedIn = Auth.loggedIn()
  const navigate = useNavigate()
  console.log("LOGIN STATUS " + loggedIn);
  if (!loggedIn) { navigate("/login") }
  return (
    <main>
      <MaidNavBar />
      <div className='page-container'>
        <section className="hero is-small is-light">
          <div className="hero-body">
            <img src={DashboardImage} alt="dashboard logo"></img>
          </div>
        </section>
        <hr />
        <div className='scheduled-cleanings-container'>
          <h1 className='title'>
            Appointment Requests
          </h1>
          <div className='scheduled-cleanings-list'>
            <form>
            <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      placeholder="date"
                      name="date"
                      type="date"
                      id="date"
                    />
                  </p>
                  <button className="button is-info">
                      Submit
                    </button>
                </div>
            </form>
          </div>
        </div>
        <hr />
        <div className='maid-reviews-container'>
          <h1 className='title'>
            My Reviews
          </h1>
          <div className='maid-reviews-list'>
            comming soon
          </div>
        </div>
        <hr />
        <div className='maid-rating-container'>
          <h1 className='title'>
            My Rating
          </h1>
          <div className='maid-rating-list'>
          </div>
        </div>
      </div>
    </main>
  );
};
export default UserDashboard;