import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='content has-text-centered'>
                <div class="columns is-mobile is-centered">
                    <div class="column">
                        <h4 className='title has-text-centered'>
                            Sparkling Spaces
                        </h4>
                        <div className='list'>
                            <ul>
                                <div className='list-item'>
                                    <li>407-SPA-RKLE</li>
                                    <li>123 Main St.</li>
                                    <li>Orlando, FL 32832</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="column">
                        <h4 className='title has-text-centered'>MERN Project by</h4>
                        <div className='list'>
                            <ul>
                                <div className='list-item'>
                                    <li>Alexis El Armani</li>
                                    <li>Mark Dale</li>
                                    <li>Ivy Do</li>
                                    <li>Patricia Manneci</li>
                                    <li>Shawna Boucher</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="column">
                        <h4 className='title has-text-centered'>Corporate</h4>
                        <div className='list'>
                            <ul>
                                <div className='list-item'>
                                    <a href="/maidlogin">
                                        <li>Employee Login</li>
                                    </a>
                                    {/* Filler List Items */}
                                    <li>Customer Support</li>
                                    <li>Company Policies</li>
                                    <li>Contact Us</li>

                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='column has-text-is-centered'>
                    <p>
                        &copy; {new Date().getFullYear()} SPARKLING SPACES | All Rights Reserved | Terms of Service 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer