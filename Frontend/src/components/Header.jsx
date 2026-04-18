import React, { useEffect, useState } from 'react'
import './style/Header.css'
import slugLogo from '/SlugLogo.png'
import { NavLink, useNavigate } from "react-router-dom"
import { useContextAPI } from '../context/contextAPI'
import { motion } from "motion/react"
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from './ProfileCard'
import TuxPfp from '/TuxPenguin.png'



const Header = () => {
  gsap.registerPlugin(ScrollTrigger);
  const navigate = useNavigate();
  const [show, setShow,] = useState(false);
  const { userData, setUserData, token, setToken, showAnimation } = useContextAPI();

  const [profileShow, setProfileShow] = useState(false);
  const logoutHandler = () => {
    if (token) {
      navigate("/");
      setUserData(null);
      setToken(null);
    }
  }



  useGSAP(() => {
    if (!showAnimation) return
    gsap.from(".logo-div", {
      y: -100,
      opacity: 0,
      delay: 1,
      duration: 1,
    });
  }, []);


  useGSAP(() => {
    gsap.from(".pages-div", {
      y: -100,
      opacity: 0,
      delay: 2,
      duration: 1,
    });
  }, []);


  useGSAP(() => {
    gsap.from(".tux-pfp", {
      y: -100,
      opacity: 0,
      delay: 2,
      duration: 1,
    });
  }, []);






  return (

    <header>
      <div className='logo-div' onClick={() => navigate("/")}>
        <img src={slugLogo} alt="Slug logo" id='slug-logo' />
        <p id='slug-text'>Slug</p>
        <p id='club-text'>Club</p>
      </div>

      <div className='pages-div'>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "header-a active" : "header-a"}
        >
          Home
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) => isActive ? "header-a active" : "header-a"}
        >
          Events
        </NavLink>

        {token ?
          (userData.role === "user") ?
            <></> :
            <NavLink
              to="/admin"
              className={({ isActive }) => isActive ? "header-a active" : "header-a"}
            >
              Admin
            </NavLink>
          :
          <></>
        }

        <NavLink
          to="/gallery"
          className={({ isActive }) => isActive ? "header-a active" : "header-a"}
        >
          Gallery
        </NavLink>

        {!token ?
          <div className='login-signup-btn-div'>
            <button className='login-signup-button' onClick={() => navigate("/login")}>Login</button>/
            <button className='login-signup-button' onClick={() => navigate("/signup")}>Signup</button>
          </div>
          :
          <div className='login-signup-btn-div'>
            <div onClick={() => setProfileShow(!profileShow)}>
              {token ?
                <img className='tux-pfp' src={TuxPfp} alt="pfp" />
                : <></>
              }
            </div>
            <button className='login-signup-button' onClick={() => logoutHandler()}>Logout</button>
          </div>

        }
        {token && profileShow ?
          <ProfileCard name={userData.name} email={userData.email} srn={userData.srn} />
          : <></>
        }


      </div>





      {/* mobile nav bar */}
      <div className='bars'>
        <img className='tux-pfp mobile-pfp' src={TuxPfp} alt="pfp" onClick={() => {
          setProfileShow(prev => !prev);
          setShow(false)
        }} />


        <motion.i onClick={() => {
          setShow(prev => !prev);
          setProfileShow(false);
        }}
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 1.5 }} className="fa-solid fa-bars"></motion.i>
        {show ?
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0 }}
            className='mobile-nav-bar'>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "header-a active" : "header-a"}
              onClick={() => setShow(false)}
            >
              Home
            </NavLink>


            <NavLink
              to="/events"
              className={({ isActive }) => isActive ? "header-a active" : "header-a"}
              onClick={() => setShow(false)}
            >
              Events
            </NavLink>

            {token ?
              (userData.role === "user") ?
                <></> :
                <NavLink
                  to="/admin"
                  className={({ isActive }) => isActive ? "header-a active" : "header-a"}
                  onClick={() => setShow(false)}

                >
                  Admin
                </NavLink>
              :
              <></>
            }


            <NavLink
              to="/gallery"
              className={({ isActive }) => isActive ? "header-a active" : "header-a"}
              onClick={() => setShow(false)}
            >
              Gallery
            </NavLink>


            {!token ?
              
              <div className='login-signup-btn-div' onClick={() => setShow(false)}>
                <button className='login-signup-button' onClick={() => navigate("/login")}>Login</button>/
                <button className='login-signup-button' onClick={() => navigate("/signup")}>Signup</button>
                
              </div>
              :
              <div className='login-signup-btn-div'>
                <button className='login-signup-button' onClick={() => {
                  logoutHandler();
                  setShow(false);
                }}>Logout</button>
              </div>
            }
          </motion.div>

          : <></>
        }
      </div>
      {token && profileShow ?
        <ProfileCard name={userData.name} email={userData.email} srn={userData.srn} />
        : <></>
      }
    </header>


  )
}

export default Header;
