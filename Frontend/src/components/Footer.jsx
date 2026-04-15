import './style/Footer.css'
import { 
  FaInstagram, 
  FaLinkedin, 
  FaGithub, 
  FaGitlab, 
  FaYoutube, 
  FaEnvelope,
  FaTelegram
} from "react-icons/fa";


const Footer = () => {



  return (
       <footer className="footer">
      <div className="footer-container">

        <h3 className="footer-logo">SLUG</h3>

        <p className="footer-text">
          Empowering students through Linux, open-source, and innovation.
        </p>

        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>

          <a href="https://gitlab.com/sapthagirinpsuniversityslug" target="_blank" rel="noreferrer">
            <FaGitlab />
          </a>

          <a href="https://github.com/slug-snpsu" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>


          <a href="https://www.youtube.com/@slugATsnpsu" target="_blank" rel="noreferrer">
            <FaYoutube />
          </a>

          <a href="mailto:sapthagirinpsuniversityslug@gmail.com">
            <FaEnvelope />
          </a>

          <a href="https://t.me/slugsnpsu">
            <FaTelegram/>
          </a>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} SLUG. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;