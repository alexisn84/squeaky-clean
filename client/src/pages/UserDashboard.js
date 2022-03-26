import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

import MaidNavBar from '../components/Navigation/MaidNavBar';
import DashboardImage from "../assets/dashboard/dashboard.png";
import ReviewForm from '../components/ReviewForm'
import ReviewList from '../components/ReviewList';

import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS, QUERY_ME_BASIC } from '../utils/queries';

const UserDashboard = (props) => {
  var loggedIn = Auth.loggedIn()
  const navigate = useNavigate()

  const { data: userData } = useQuery(QUERY_ME_BASIC);
  

  const { loading, data } = useQuery(QUERY_REVIEWS, {
    variables: {createdByUser_id: userData?._id || "623de2c892e50b63a030a3e9"}
  });
 
  const reviews = data?.reviews || [];

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
            <ReviewForm />
          </h1>
          <div className='maid-reviews-list'>
          <ReviewList 
              reviews={ reviews }
            />
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