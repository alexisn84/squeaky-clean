import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

//images
import LoginImage from '../assets/login/login.webp';

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
  };

  return (
    <main>
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
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      name="email" onChange={() => handleChange()}
                      placeholder="Email" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p clasName="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      name="password" onChange={() => handleChange()}
                      placeholder="Password" />
                    <span className="icon is-small is-left">
                    </span>
                  </p>
                  <a href="/signup">No account? Sign up today!</a>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-info">
                      Login
                    </button>
                  </p>
                  <a href="/userdashboard">Login</a>
                </div>
              </form>
              {error && <div>Login failed</div>}
              <a href="/userdashboard">Link to userdashboard noAuth</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;