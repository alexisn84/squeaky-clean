import React from 'react'
import Logo from '../../assets/logo/logo.png'

// import pages

function MainNavBar() {
    return (
        <div className='navbar'>
            <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={Logo} alt="logo"/>
                        SPARKLING SPACES
                    </a>
                </div>                
        </div>
    )
}

export default MainNavBar