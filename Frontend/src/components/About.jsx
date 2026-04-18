import React from 'react'
import './style/About.css'
import { useNavigate } from 'react-router-dom'
import { useContextAPI } from '../context/contextAPI'
import slugLogo from '/SlugLogo.png'
import GNULogo from '/GNU.png'
import { motion } from "motion/react"
import { useGSAP } from '@gsap/react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {

gsap.registerPlugin(ScrollTrigger);
  const navigate = useNavigate()

  const { token } = useContextAPI();

  useGSAP(() => {
    gsap.fromTo(".inside-about-slug",{
      opacity:0,
      y:100,
    } ,{
      duration: 1,
      y: 0,
      opacity:1,
      scrollTrigger: {
        trigger: ".about-slug",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 2,
        // pin: true,
      }
    })
  }, []);


    useGSAP(() => {
    gsap.fromTo(".slug-img-div",{
      opacity:0,
      y:100,
    } ,{
      duration: 1,
      y: 0,
      opacity:1,
      scrollTrigger: {
        trigger: ".about-slug",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 2,
        // pin: true,
      }
    })
  }, []);


    useGSAP(() => {
    gsap.fromTo(".inside-about-GNU",{
      opacity:0,
      y:100,
    } ,{
      duration: 1,
      y: 0,
      opacity:1,
      scrollTrigger: {
        trigger: ".about-GNU",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 2,
        // pin: true,
      }
    })
  }, []);


    useGSAP(() => {
    gsap.fromTo(".GNU-img-div",{
      opacity:0,
      y:100,
    } ,{
      duration: 1,
      y: 0,
      opacity:1,
      scrollTrigger: {
        trigger: ".about-GNU",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        // scrub: 2,
        // pin: true,
      }
    })
  }, []);
  return (
    <>
      <div id='about-section'>
        <div className='slug-fullform-text'>Sapthagiri Libre-Software Users Group is our student community dedicated to Free and Open Source Software.</div>
        <div className='about-slug'>
          <div className='inside-about-slug'>
            <p style={{ fontWeight: "600", fontSize: "40px" }}>About Slug</p>
            <p>Sapthagiri Libre-Software Users Group is a student-driven community focused on learning, building, and contributing to the world of Free and Open Source Software.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora corrupti sit fugit exercitationem dolores odit officiis, incidunt delectus laudantium maiores. Cupiditate commodi soluta ipsum illo perferendis est rem labore facere.
            </p>
          </div>
          <div className='slug-img-div'><img src={slugLogo} alt="" /></div>
        </div>

        <div className='about-GNU'>
          <div className='inside-about-GNU'>
            <p style={{ fontWeight: "600", fontSize: "40px" }}>About GNU</p>
            <p>GNU is a foundational project in the Free Software movement, developing essential tools and software that power many open systems, including GNU/Linux.</p>
          </div>
          <div className='GNU-img-div'><img src={GNULogo} alt="GNU" /></div>
        </div>
      </div>
    </>
  );
};

export default About
