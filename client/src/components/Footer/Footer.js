import React from 'react'

function Footer() {
    return (
        <div className='footer'>
            <div className='content has-text-centered'>
                <div class="columns">
                    <div class="column">
                        <h4>
                            Sparkling Spaces
                        </h4>
                        <ul className='list-unstyled'>
                            <li>407-SPA-RKLE</li>
                            <li>123 Main St.</li>
                            <li>Orlando, FL</li>
                        </ul>
                    </div>
                    <div class="column">
                        <h4>MERN Project by</h4>
                        <ul className='list-unstyled'>
                            <li>Alexis El Armani</li>
                            <li>Mark Dale</li>
                            <li>Ivy Do</li>
                            <li>Patricia Manneci</li>
                            <li>Shawna Boucher</li>
                        </ul>
                    </div>
                    <div class="column">
                        <h4>Corporate</h4>
                        <ul className='list-unstyled'>
                            <a href="/maidlogin">                        
                            <li>Employee Login</li>
                            </a>
                            {/* Filler List Items */}
                            <li>Contact Us</li>
                            <li>Customer Support</li>
                            <li>Company Policies</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer