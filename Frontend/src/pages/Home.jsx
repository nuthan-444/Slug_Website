import './style/Home.css'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {


  return (
    <div className='Home' >


      <HeroSection />
      <About />
      <Contact />
      <Footer />

    </div>
  )
}

export default Home