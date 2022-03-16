import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const NavBar = () => {
    //set modal display set
    //const [showModal, setShowModal] = useState(false);
    const links = ["Login", "Book Online"]

    return (
        <div className='links'>
            <ul className='nav nav-links'>
                {links.map((link) => (
                    <li
                        className={props.currentPage === link ? "nav-item is-active" : "nav-item"
                    }
                    key={link}
                    >
                    <a href={"#" + link.toLowerCase()}
                    // link is clicked on, current page is set through the handlePageChange props.
                    onClick={() => props.handlePageChange(link)}
                    className={
                        props.currentPage === link ? "nav-link active" : "nav-link"
                    }
                    >
                        {link}
                    </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavBar;