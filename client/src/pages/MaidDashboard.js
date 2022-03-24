import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

//if we get multiple maids schedules working use below so maid can see cleanings scheduled 
//import BookingList from '../components/BookingList';

import Rating from '../components/Rating';
import ReviewList from '../components/ReviewList';

import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

//import in utils/mutations and queries if needed as buildout progresses
import { ADD_RATING } from '../utils/mutations';
import { QUERY_EMPL, QUERY_MAID } from '../utils/queries';
import { isConstValueNode } from 'graphql';

const MaidDashboard = (props) => {
    const { username: userParam } = useParams();
    const [addRating] = useMutation(ADD_RATING);

    //useQuery Hook 
    const { loading, data } = useQuery(userParam ? QUERY_MAID : QUERY_EMPL, {
        variables: { username: userParam },
      });

    //   might alter and use for now comment out 
    //   const maid = data?.me || data?.maid || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/maidlogin" />;
      }

    if (!maid?.name) {
        return (
            <h4>Please login to view your employee dashboard</h4>
        );
    }

    //click function to add rating
    const handleClick = async () => {
        try {
            await addRating({
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
              {userParam ? `${user.username}` : 'Dashboard'} 
            </h2>
          </div>
    
          <div className="">
            <div className="">
              <BookingList
                bookings={user.bookings}
                title={`${user.username}`}
              />
              <Rating />
            </div>
    
            <div className="">
              <ReviewList
                username={user.username}
                reviewCount={user.reviewCount}
                reviews={user.reviews}
              />
            </div>
          </div>
          <div className=''>{!userParam && <Rating /> && <BookingList /> && <ReviewList />}
          </div>
        </div>
      );
    
};

export default MaidDashboard;
