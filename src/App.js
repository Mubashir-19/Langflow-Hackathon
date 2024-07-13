import React, { useState } from 'react';
import './App.css'
import {Link} from 'react-router-dom'
import Questionare from './Components/Questionare';
const TravelShowcase = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
    <section className={`showcase ${menuActive ? 'active' : ''}`}>
      <header>
        <h2 className="logo">CareerShip.io</h2>
        <div className={`toggle ${menuActive ? 'active' : ''}`} onClick={handleMenuToggle}></div>
      </header>
      <video src="https://traversymedia.com/downloads/videos/explore.mp4" muted loop autoPlay></video>
      <div className="overlay"></div>
      <div className="text">
        <h2>Welcome to <span style={{backgroundColor: '#ADD8E6'}} >CareerShip</span></h2> 
        <h3>Your AI Career Advisor</h3>

        <p>At CareerShip, we simplify your job search with personalized career advice through our AI-driven process. Whether you need help exploring new paths, refining your resume, or preparing for interviews, we’re here to support you.</p>
        <p>Start your journey toward your dream job today and let CareerShip guide you every step of the way! 
        </p>
        <Link to="/questions">Get started</Link>
      </div>
      <ul className="social">
        <li><Link><img src="https://i.ibb.co/x7P24fL/facebook.png" alt="Facebook" /></Link></li>
        <li><Link><img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="Twitter" /></Link></li>
        <li><Link><img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="Instagram" /></Link></li>
      </ul>
    </section>
    <div className={`menu ${menuActive ? 'active' : ''}`}>
      <ul>
        <li><Link>Home</Link></li>
        <li><Link>News</Link></li>
        <li><Link>Destination</Link></li>
        <li><Link>Blog</Link></li>
        <li><Link>Contact</Link></li>
      </ul>
    </div>
    </>
  );
};

export default TravelShowcase;
