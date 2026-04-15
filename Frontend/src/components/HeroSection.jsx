import React, { useEffect, useState } from 'react'
import './style/HeroSection.css'
import { NavLink, useNavigate } from "react-router-dom"
import slugLogo from '/SlugLogo.png'
import { useContextAPI } from '../context/contextAPI'
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroSection = () => {
  const navigate = useNavigate();
  const { token } = useContextAPI();
gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.from(".hero-section-text", {
    y: 100,
    opacity: 0,
    delay:1,
    duration: 1,
  });
}, []);

useGSAP(() => {
  gsap.from(".hero-section-sub-text", {
    y: 100,
    opacity: 0,
    delay:2,
    duration: 1,
  });
}, []);

useGSAP(() => {
  gsap.from(".btns-hero-section", {
    y: 100,
    opacity: 0,
    delay:3,
    duration: 1,
  });
}, []);

useGSAP(() => {
  gsap.from(".logo-div-hero-section", {
    y: 100,
    opacity: 0,
    delay:3,
    duration: 1,
  });
}, []);
  return (
    <div className='hero-section'>
      <div className='hero-section-inside'>
      <div className='logo-div-hero-section' onClick={() => navigate("/")}>
        <img src={slugLogo} alt="Slug logo" id='slug-logo-hero-section' />
        <p id='slug-text-hero-section'>Slug</p>
        <p id='club-text-hero-section'>Club</p>
      </div>
      <div className='welcome-div'>
        <pre
        className='hero-section-text'>Open Source, Open Future.</pre>
        <pre 
        className='hero-section-sub-text'>Join the movement of developers shaping the future with <br />Free & Open Source Software — transparent, collaborative,<br />and limitless.</pre>
      </div>

      <div className='btns-hero-section'>
        {!token ?
        <button  className='join-us-btn' onClick={() => navigate("/signup")}>Join us</button>
         : <></>}
        <button className='explore-us-btn' onClick={() => navigate("/events")}>Explore <i className="fa-solid fa-arrow-right-long"></i></button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection
