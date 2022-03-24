import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo/logo.png'

function MainNavBar() {
    return (
        <div className='navbar'>
            <div className="navbar-brand">
                    <a className="navbar-item" href="#header">
                        <img src={Logo} alt="logo"/>
                        SPARKLING SPACES
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-primary">
                                Sign up
                            </button>
                            <Link to='login'><button className="button is-info">
                                Log in
                            </button></Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default MainNavBar