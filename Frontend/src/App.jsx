import React, { Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './context/contextAPI'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
const Events = React.lazy(() => import("./pages/Events"));
import Gallery from './pages/Gallery'
import EventForm from './components/EventForm'
import VerifyAccount from './components/VerifyAccount'
import Loading from './components/Loading'
import TeamRegister from './components/TeamRegister'
import Admin from './pages/Admin'
import EventRegisterationInfo from './components/EventRegisterationInfo'
import Header from './components/Header'
import Footer from './components/Footer'
import DetailedEventCard from './components/DetailedEventCard'

const App = () => {

  const dotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="dot-div"></div>
      <BrowserRouter>
        <ContextProvider>
          <Suspense fallback={<Loading />}>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/events' element={<Events />} />
              <Route path='/events/:eventID' element={<DetailedEventCard />} />
              <Route path='/admin/eventRegisterationInfo' element={<EventRegisterationInfo />} />
              <Route path='/admin/eventform' element={<EventForm />} />
              <Route path="/admin" element={<Admin />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verifyAccount" element={<VerifyAccount />} />
              <Route path="/teamRegister/:id" element={<TeamRegister />} />
            </Routes>
          </Suspense>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App