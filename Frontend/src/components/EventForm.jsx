import { useState } from "react";
import "./style/EventForm.css";
import { useContextAPI } from '../context/contextAPI'
import axios from 'axios'
import Loading from "./Loading";
import Header from "./Header";
import Admin from '../pages/Admin'
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";


const EventForm = () => {

  const navigate = useNavigate();

  const { userData, setUserData, token, setToken } = useContextAPI();
  const [popupMessage, setPopupMessage] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventShortDescription: "",
    eventDescription: "",
    eventCategory: "",
    eventRegStartDate: "",
    eventRegEndDate: "",
    eventStartDate: "",
    eventEndDate: "",
    eventLocation: "",
    eventMaxParticipants: 0,
    eventMode: "",
  });


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);


  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };


  const handleImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Only image files allowed!");
    }
  };


  const handleDrop = (e) => {
    e.preventDefault();
    handleImage(e.dataTransfer.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    const formData = new FormData();
    Object.keys(eventData).forEach((key) =>
      formData.append(key, eventData[key])
    );
    formData.append("eventImage", image);
    formData.append("eventCreatedBy", userData._id);




    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/events/addEvents`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      if (response.data.status) {
        setShowLoading(false);
        setPopupMessage(response.data.message);
        navigate(`/events/${response.data.addEvent._id}`);
      }
    } catch (error) {
      setShowLoading(false);
      setPopupMessage(error.response?.data?.message)
      console.log(error.response?.data?.message);
    }
  };



  return (

    <>
      <div className="event-from-outer">
        <Admin />
        <div className="event-form-container">
          <h2>Create Event</h2>

          <form onSubmit={handleSubmit} className="event-form">


            {/* Drag & Drop Image Upload */}
            <div
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {preview ? (
                <img src={preview} alt="Preview" />
              ) : (
                <p>Drag & Drop Event Image Here</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files[0])}
                hidden
                id="fileUpload"
              />
              <label htmlFor="fileUpload">Browse Image</label>
            </div>


            <input min={3} max={100}
              type="text"
              name="eventTitle"
              placeholder="Event Title"
              onChange={handleChange}
              required
            />

            <textarea minLength={50} maxLength={300}
              name="eventShortDescription"
              placeholder="Event Short Description"
              onChange={handleChange}
              required
            />

            <textarea minLength={100}
              name="eventDescription"
              placeholder="Event Description"
              onChange={handleChange}
              required
            />

            <select
              name="eventCategory"
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Hackthon">Hackthon</option>
              <option value="Session">Session</option>
              <option value="Work shop">Work shop</option>
            </select>


            <p>Event Start date:</p>
            <input
              type="date"
              name="eventStartDate"
              onChange={handleChange}
              required
            />
            <p>Event End date:</p>
            <input
              type="date"
              name="eventEndDate"
              onChange={handleChange}
              required
            />

            <p>Registration Start date:</p>
            <input
              type="date"
              name="eventRegStartDate"
              onChange={handleChange}
              required
            />
            <p>Registration End date:</p>
            <input
              type="date"
              name="eventRegEndDate"
              onChange={handleChange}
              required
            />


            <input
              type="text"
              name="eventLocation"
              placeholder="Location"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="eventMaxParticipants"
              placeholder="Max Participants"
              onChange={handleChange}
              required
            />

            <select
              name="eventMode"
              onChange={handleChange}
              required
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            {!showLoading ?
              <button className="" type="submit">Create Event</button>
              : <Loading />
            }
          </form>
        </div>
        {popupMessage && (
          <Popup
            message={popupMessage}
            type="success"
            onClose={() => setPopupMessage("")}
          />
        )}
      </div>
    </>
  );
};

export default EventForm;