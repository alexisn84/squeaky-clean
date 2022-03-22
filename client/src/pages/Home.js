import React from 'react';
import ReactDom from 'react-dom';
import '../index.css';

// Image Imports!
import HeaderImg from '../assets/header/clean.jpg';
import About1 from '../assets/about/about1.png';
import About2 from '../assets/about/about2.png';
import About3 from '../assets/about/about3.png';

export default function Home() {

    const Header = () => {
        return (
            <div id="header" className="columns is-mobile is-vcentered">
                <div className="column is-one-third is-centered m-6">
                    <div className="title is-1 p-2">
                        Life's Busy, <br/> Let Us Help
                    </div>
                    <div className="subtitile is-5 p-2">
                        Your home will be cleaned to your higest expectations by trained professionals at surprisingly affordable rates. Your home and your priorities. We take pride in providing cleaning services that match your needs and your budget. It is time to discover the magic of Sparkling Spaces. 
                    </div>
                    <button className="button is-info is-medium m-2">Login to Schedule</button>
                </div>
                <div className="column is-two-thirds is-centered">
                    <figure className="image is-5by3 m-6">
                        <img src={HeaderImg} alt="clean kitchen counter"/>
                    </figure>
                </div>
            </div>   
        )
    }

    const About = () => {
        return (
            <div id="about" className="container is-fluid">
                <div className='title is-2 has-text-centered'>
                Sparkling Spaces provides residential <br/> cleaning services to the Orlando, FL area!
                </div>
                <div className="columns is-mobile is-vcentered">
                    <div className='column is-one-third is-centered has-text-centered'>
                        <figure className="image is-128x128 is-inline-block">
                            <img src={About1} alt="cleaning supplies"/>
                        </figure>
                        <div className='title is-4'>We Supply Everything</div>
                        <div className='subtitle is-5'>Sparkling Spaces blah blah blah</div>
                    </div>
                    <div className='column is-one-third is-centered has-text-centered'>
                        <figure className="image is-128x128 is-inline-block">
                            <img src={About2} alt="people mopping"/>
                        </figure>
                        <div className='title is-4'>We Supply Everything</div>
                        <div className='subtitle is-5'>Sparkling Spaces blah blah blah</div>
                    </div>
                    <div className='column is-one-third is-centered has-text-centered'>
                        <figure className="image is-128x128 is-inline-block">
                            <img src={About3} alt="three stars"/>
                        </figure>
                        <div className='title is-4'>We Supply Everything</div>
                        <div className='subtitle is-5'>Sparkling Spaces blah blah blah</div>
                    </div>
                </div>
            </div>
        )
    }

    const Rates = () => {
        return (
            <div id="rates" className="container is-fluid mt-6">
                <div className='title is-2 has-text-centered'>Rates</div>
                <div className='subtitle is-5 has-text-centered'>
                Price is an accurate estimate based on standard scope of work. Upon booking, a maid will work with you to create a custom-made cleaning list to make sure your priorities are met.
                </div> 
                <div className='title is-3 has-text-centered'>Average Cleaning Times:</div>
                <div className='subtitle is-5 has-text-centered'>
                2 Hours: 1-2 Bedrooms <br/>4 Hours: 2-3 Bedrooms<br/>6 Hours: 3-4 Bedrooms
                </div> 
            </div>
        )
    }

    
    return (
        <div id="landing-body">
            <Header/>
            <About/>
            <Rates/>
        </div>
    )

}