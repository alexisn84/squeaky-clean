import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

// import imagges
import LoginImage from '../assets/login/login.webp';

// import component
import MainNavBar from '../components/Navigation/MainNavBar';


//import pages 
// ************ not being called  but if i take it away it doesnt work
import MaidDashboard from './MaidDashboard';

const MaidLogin = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(value, name, 'this is the name');

  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();


    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
    navigate('/maiddashboard')
  };

  return (
    <main>
      <div>
        <MainNavBar />
        <div id='login' className='section'>
          <div className='columns is-vcentered'>
            <div className='column is-half has-text-centered'>
              <figure className="image is-5x4 is-inline-block">
                <img src={LoginImage} alt="cleaning the kitchen" />
              </figure>
            </div>
            <div className='column is-half'>
              <div className='title is-1'>Let's Get Cleaning!</div>
              <div className='form'>
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <input
                      className="input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className="field">
                    <input
                      className="input"
                      placeholder="******"
                      name="password"
                      type="password"
                      id="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                    <p>
                      <Link to="/login">Not an Employee? Back to user login.</Link>
                    </p>
                  </div>
                  <div className="field">
                    <button className="button is-info">
                      Submit
                    </button>
                  </div>
                </form>
                {error && <div>Login failed</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MaidLogin;