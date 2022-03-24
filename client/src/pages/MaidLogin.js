import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';

import LoginImage from '../assets/login/login.webp';

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
          <div id='login' className='section'>
            <div className='columns is-vcentered'>
              <div className='column is-half has-text-centered'>
                <figure className="image is-5x4 is-inline-block">
                  <img src={LoginImage} alt="cleaning the kitchen"/>
                </figure>
              </div>
              <div className='column is-half'>
                <div className='title is-1'>Let's Get Cleaning!</div>
                <div className='form'>
                <form onSubmit={handleFormSubmit}>
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Employee ID"/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p clasName="control has-icons-left">
                    <input className="input" type="password" placeholder="Password"/>
                      <span className="icon is-small is-left">
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button className="button is-info">
                      Submit
                      </button>
                    </p>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </main>
    );
};

export default MaidLogin;