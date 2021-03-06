import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import BookingList from '../components/BookingList';


import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_MAIDS } from '../utils/queries';
import { ADD_BOOKING, ADD_REVIEW } from '../utils/mutations';
import Auth from '../utils/auth';

const UserDashboard = (props) => {
    const { username: userParam } = useParams();

    const [addReview] = useMutation(ADD_REVIEW);
    const [addBooking] = useMutation(ADD_BOOKING);
    const {maidList} = useQuery(QUERY_MAIDS);
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    // redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />;
    }

    if (!user?.username) {
        return (
        <h4>
            Please login to see your Profile
        </h4>
        );
    }

    //click function to schedule booking
  const handleClick = async () => {
    try {
      await addBooking({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  //click function to look at maid reviews
  const maidClick = async () => {
    try {
      await maidList({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  //click function to leave review
  const reviewClick = async () => {
    try {
      await addReview({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="">
      <h2 className="">
          Welcome Back {userParam ? `${user.username}` : ' to your'} profile.
        </h2>
      </div>

      <div className="">
        <div className="">
            {/* container/card for schedule buttons */}
          <BookingList
            bookings={user.bookings}
            title={`${user.username}'s Scheduled Cleanings'`}
          />
          {/* schedule cleaning button click */}
           {userParam && (
          <button className='' onClick={handleClick}>
            Schedule Cleaning
            </button>
          )}

            {/* button to go see maids and reviews */}
        {userParam && (
          <button className='' onClick={maidClick}>
            Checkout our Maids
            </button>
          )}
        </div>

            {/* new container/card for review form and ratings */}
        <div className="">
          <ReviewForm
            username={user.username}
            reviewBody={user.reviewText}
          />

          {/* submit review button  */}
        {userParam && (
          <button className='' onClick={reviewClick}>
            Submit
            </button>
          )}
        </div>

            {/* new container for list of previous left reviews by 
            logged in user */}
        <div className="">
          <ReviewList
            username={user.username}
            reviewCount={user.reviewCount}
            reviews={user.reviews}
          />

        
        </div>
      </div>
      <div className=''>{!userParam && <ReviewList />}
      </div>
    </div>
  );
};

export default UserDashboard;