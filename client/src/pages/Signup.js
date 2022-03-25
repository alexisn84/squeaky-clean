import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { useNavigate as navigate} from 'react-router-dom';
import Auth from '../utils/auth';

//import images
import SignUpImage from "../assets/signup/signup.gif"

//import component
import MainNavBar from '../components/Navigation/MainNavBar';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
        navigate('/userdashboard')

    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='main-container'>
            <MainNavBar/>
            <div>
            {/* form */}
            <div>
            <div id='login' className='section'>
            <div className='columns is-vcentered'>
              <div className='column is-half has-text-centered'>
                <figure className="image is-5x4 is-inline-block">
                  <img src={SignUpImage} alt="cleaning the kitchen"/>
                </figure>
              </div>
              <div className='column is-half'>
                <div className='title is-1'>Create Account</div>
                <div className='form'>
                <form onSubmit={handleFormSubmit}>
                  <div className="field">
                    <p className="control has-icons-right">
                    <input className="input" type="text" name="email" onChange={() => handleChange()} placeholder="Email"/>
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                    <input className="input" type="password" name="password" onChange={() => handleChange()} placeholder="Password"/>
                      <span className="icon is-small is-left">
                      </span>
                    </p>
                    <p>
                      <Link to="/login">Already have an account? Go back to user login.</Link>
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
          </div>

            </div>
        </div>
    );
};

export default Signup;