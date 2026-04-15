import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import EventCard from '../components/EventCard'
import axios from 'axios'
import { useContextAPI } from '../context/contextAPI'
import './style/Event.css'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'


const Events = () => {
  const navigate = useNavigate()
  const { allEvents, setAllEvents } = useContextAPI();

  const [showLoading, setShowLoading] = useState(false);


  const getAllEvents = async () => {
    setShowLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/getAllEvents`);
      if (response.data.status) {
        if (response.data.allEvents.length <= 0) {
          navigate("/")
        } else {
          setAllEvents(response.data.allEvents);
          setShowLoading(false);
        }

      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, [])


  return (
    <>
      {!showLoading ?
        <>
          <h1 id='event-heading'>Events</h1>
          <div className='event-section'>
            {allEvents.length > 0 ? [...allEvents].reverse().map((event, idx) => (
              <EventCard key={idx} event={event} />
            ))
              : <></>
            }
          </div>
        </> : <Loading />
      }
    </>
  )
}

export default Events
