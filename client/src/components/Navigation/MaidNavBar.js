import React from 'react';
import Auth from "../../utils/auth";

const MaidNavBar = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item" href="/" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MaidNavBar;