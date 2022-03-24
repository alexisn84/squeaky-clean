// import React from 'react';
// import { Navigate, useParams } from 'react-router-dom';

// //if we get multiple maids schedules working use below so maid can see cleanings scheduled 
// //import BookingList from '../components/BookingList';

// import Rating from '../components/Rating';
// import ReviewList from '../components/ReviewList';

// import { useQuery, useMutation } from '@apollo/client';
// import Auth from '../utils/auth';

// //import in utils/mutations and queries if needed as buildout progresses
// import { ADD_RATING } from '../utils/mutations';
// import { QUERY_EMPL, QUERY_MAID } from '../utils/queries';
// import { isConstValueNode } from 'graphql';

// const MaidDashboard = (props) => {
//     const { username: userParam } = useParams();
//     const [addRating] = useMutation(ADD_RATING);

//     //useQuery Hook 
//     const { loading, data } = useQuery(userParam ? QUERY_MAID : QUERY_EMPL, {
//         variables: { username: userParam },
//       });

//     //   might alter and use for now comment out 
//     //   const maid = data?.me || data?.maid || {};

//     if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//         return <Navigate to="/maidlogin" />;
//       }

//     if (!maid?.name) {
//         return (
//             <h4>Please login to view your employee dashboard</h4>
//         );
//     }

//     //click function to add rating
//     const handleClick = async () => {
//         try {
//             await addRating({
//                 variables: { id: user._id }
//             });
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     return (
// <div>
//   <div className="">
//   <h2 className="">
//       {userParam ? `${user.username}` : 'Dashboard'} 
//     </h2>
//   </div>

//   <div className="">
//     <div className="">
//       <BookingList
//         bookings={user.bookings}
//         title={`${user.username}`}
//       />
//       <Rating />
//     </div>

//     <div className="">
//       <ReviewList
//         username={user.username}
//         reviewCount={user.reviewCount}
//         reviews={user.reviews}
//       />
//     </div>
//   </div>
//   <div className=''>{!userParam && <Rating /> && <BookingList /> && <ReviewList />}
//   </div>
// </div>
//       );

// };

// export default MaidDashboard;

import React from 'react'

// import components
import MaidNavBar from '../components/Navigation/MaidNavBar'

//import images and css
import DashboardImage from "../assets/dashboard/dashboard.png"
import "./MaidDashboard.css"

function MaidDashboard() {
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