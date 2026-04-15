import { useState } from "react";
import "./style/EventCard.css";
import Popup from "./Popup";
import axios from "axios";
import { useContextAPI } from '../context/contextAPI'
import Loading from "./Loading";
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"


const EventCard = ({ event }) => {

  const navigate = useNavigate();

  const { token, userData } = useContextAPI();
  const [showLoading, setShowLoading] = useState(false);


  const {
    _id,
    eventImage,
    eventTitle,
    eventShortDescription,
    eventCategory,
    eventRegStartDate,
    eventRegEndDate,
    eventStartDate,
    eventEndDate,
    eventMode,
  } = event;



  const isEventStarted = new Date() > new Date(eventStartDate);


  const MoreDetailedCard = () => {
    navigate(`/events/${_id}`);
  }



  return (
    <>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0 }} className="event-card">
        <img
          src={eventImage}
          alt={eventTitle}
          loading="lazy"
          className="event-card-image"
        />

        <div className="event-card-content">
          <h3>{eventTitle}</h3>

          <pre className="event-description">
            {eventShortDescription}
          </pre>

          <div className="event-info">
            <span>🖥 {eventCategory}</span>
          </div>

          <div className="event-dates">
            <span> Registration :
              {new Date(eventRegStartDate).toLocaleDateString()} -
              {new Date(eventRegEndDate).toLocaleDateString()}
            </span>
          </div>
          <div className="event-dates">
            Event Added by <span style={{ fontWeight: "bold" }}>{event.eventCreatedBy.name}</span>
          </div>
          <div className="event-footer">


            <div className="register-delete-update-event-btns">

              <button title="See More Info" className="join-btn" onClick={MoreDetailedCard}>See More Info</button>
            </div>


          </div>
        </div>
      </motion.div>

      {showLoading ?
        <Loading />
        : <></>
      }

    </>
  );
};

export default EventCard;