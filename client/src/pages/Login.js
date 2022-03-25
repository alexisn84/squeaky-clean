import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate as navigate } from 'react-router-dom';

import Auth from '../utils/auth';

//images
import LoginImage from '../assets/login/login.webp';
import MaidNavBar from '../components/Navigation/MaidNavBar';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(name, value, 'this is the name');
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
    navigate("/userdashboard")
  };

  return (
    <main>
      <MaidNavBar />
      <div id='login' className='section'>
        <div className='columns is-vcentered'>
          <div className='column is-half has-text-centered'>
            <figure className="image is-5x4 is-inline-block">
              <img src={LoginImage} alt="cleaning the kitchen" />
            </figure>
          </div>
          <div className='column is-half'>
            <div className='title is-1'>Welcome Back!</div>
            <div className='form'>
              <form onSubmit={handleFormSubmit}>
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </p>
                </div>
                <div className="field">
                  <input
                    className="input"
                    placeholder="******"
                    name="password"
                    type="password"
                    id="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <a href="/signup">No account? Sign up today!</a>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-info">
                      Login
                    </button>
                  </p>
                </div>
              </form>
              {error && <div>Login failed</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;