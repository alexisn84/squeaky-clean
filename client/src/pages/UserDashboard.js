import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import MaidNavBar from '../components/Navigation/MaidNavBar';
import DashboardImage from "../assets/dashboard/dashboard.png";
const UserDashboard = (props) => {
<<<<<<< HEAD
    const { username: userParam } = useParams();

    const [addBooking] = useMutation(ADD_BOOKING);
    const {maidList} = useQuery(QUERY_MAIDS);
    
    const [addReview] = useMutation(ADD_REVIEW);

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

    
=======
  var loggedIn = Auth.loggedIn()
  const navigate = useNavigate()
  console.log("LOGIN STATUS " + loggedIn);
  if (!loggedIn) { navigate("/login") }
>>>>>>> 9df87d222838cd398b9998c40d57db58cbdfeb31
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