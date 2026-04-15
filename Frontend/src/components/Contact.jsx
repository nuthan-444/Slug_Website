import React from 'react'
// import Header from '../components/Header'
import './style/Contact.css'
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaYoutube,
  FaEnvelope,
  FaTelegram
} from "react-icons/fa";
const Contact = () => {

  const links = [{
    platform: "Instagram",
    link: "https://www.instagram.com/slug_snpsu",
    compo: <FaInstagram />,
  }, {
    platform: "LinkedIn",
    link: "https://www.linkedin.com/company/sapthagiri-libre-software-users-group/",
    compo: <FaLinkedin />,
  }, {
    platform: "GitLab",
    link: "https://gitlab.com/sapthagirinpsuniversityslug",
    compo: <FaGitlab />,
  }, {
    platform: "GitHub",
    link: "https://github.com/slug-snpsu",
    compo: <FaGithub />,
  },
    {platform: "Youtube",
    link: "https://www.youtube.com/@slugATsnpsu",
    compo: <FaYoutube />,
  }, {
    platform: "Email",
    link: "mailto:sapthagirinpsuniversityslug@gmail.com",
    compo: <FaEnvelope />,
  },
  {
    platform: "Telegram",
    link: "https://t.me/slugsnpsu",
    compo: <FaTelegram />,
  }
  ]




  return (
    <div>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <h2 className="contact-title">CONTACT SLUG</h2>

          <p className="contact-text">
            Connect with us on our social platforms and stay updated with
            workshops, events, and open-source projects.
          </p>

          <div className="social-links">
            {links.length > 0 ? links.map((oneLink, idx) => (
              <a href={oneLink.link} key={idx} target="_blank" rel="noreferrer">
                {oneLink.compo}&nbsp;&nbsp;{oneLink.platform}
              </a>
            )) : <></>

            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
