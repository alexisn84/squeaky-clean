import { isRequiredArgument } from 'graphql';
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
                        <img src={HeaderImg}/>
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
                    <div className='column is-one-third is-centered'>
                        <figure className="image is-128x128">
                            <img src={About1}/>
                        </figure>
                        <div className='title is-4'>We Supply Everything</div>
                        <div className='subtitle is-5'>Sparkling Spaces blah blah blah</div>
                    </div>
                    <div className='column is-one-third is-centered'>
                        <figure className="image is-128x128">
                            <img src={About2}/>
                        </figure>
                        <div className='title is-4'>We Supply Everything</div>
                        <div className='subtitle is-5'>Sparkling Spaces blah blah blah</div>
                    </div>
                    <div className='column is-one-third is-centered'>
                        <figure className="image is-128x128">
                            <img src={About3}/>
                        </figure>
                        <div className='title is-4'>We Supply Everything</div>
                        <div className='subtitle is-5'>Sparkling Spaces blah blah blah</div>
                    </div>
                </div>
            </div>
        )
    }

    
    return (
        <div id="landing-body">
            <Header/>
            <About/>
        </div>
    )

}