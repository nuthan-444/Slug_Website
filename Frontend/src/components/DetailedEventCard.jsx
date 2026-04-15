import { useState } from "react";
import "./style/DetailedEventCard.css";
import Popup from "./Popup";
import axios from "axios";
import { useContextAPI } from '../context/contextAPI'
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import { useEffect } from "react";


const DetailedEventCard = () => {

    const navigate = useNavigate();
    const { eventID } = useParams();
    const { token, userData } = useContextAPI();
    const [showLoading, setShowLoading] = useState(false);


    const [event, setEvent] = useState({});
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [totalRegistration, setTotalRegistration] = useState(null);


    // fetching the event details
    const getEventDetails = async () => {
        setShowLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/events/getEvent/${eventID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.data.status) {
                if (!response.data.eventData.getEvent) {
                    navigate("/");
                    setPopupMessage(response.data.message || "Client error");

                } else {
                    setEvent(response.data.eventData.getEvent);
                    setIsUserRegistered(response.data.eventData.isUserRegistered);
                    setTotalRegistration(response.data.eventData.totalRegistrations);
                    setShowLoading(false);
                }

            }
        } catch (error) {
            setShowLoading(false);
            console.log(error)
            navigate("/events")
            setPopupMessage(response.data.message || "Client error");

        }
    }

    useEffect(() => {
        getEventDetails();
    }, [eventID])

    const _id = event?._id || ""
    const eventImage = event?.eventImage
    const eventTitle = event?.eventTitle || ""
    const eventDescription = event?.eventDescription || ""
    const eventCategory = event?.eventCategory || ""
    const eventStartDate = event?.eventStartDate || ""
    const eventEndDate = event?.eventEndDate || ""
    const eventRegStartDate = event?.eventRegStartDate || ""
    const eventRegEndDate = event?.eventRegEndDate || ""
    const eventLocation = event?.eventLocation || ""
    const eventCreatedBy = event?.eventCreatedBy || ""
    const eventMaxParticipants = event?.eventMaxParticipants || ""
    const eventMode = event?.eventMode




    const copyEventId = async () => {
        try {
            await navigator.clipboard.writeText(_id);
            setPopupMessage("Event ID copied!");
        } catch (error) {
            console.log(error);
            setPopupMessage("Failed to copy");
        }
    };


    const isEventStarted = new Date() > new Date(eventStartDate);
    const [popupMessage, setPopupMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(event);

    // handling the registration and cancelation
    const handleRegister = async (register_cancel) => {

        if (!token) {
            navigate("/login");
            return
        }

        if (eventCategory === "Hackthon") {   // add hackthon model and controller of hackthon
            navigate(`/teamRegister/:${_id}`);
            return;
        }

        try {
            if (register_cancel === "register") {

                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/registerForEvents/${event._id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })


                if (response.data.status) {
                    setTotalRegistration(prev => prev + 1);
                    setIsUserRegistered(true);
                    setPopupMessage(`${eventTitle} ${response.data.message}`);
                    setShowLoading(false)
                }
            } else {
                const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/registerCancelForEvents/${event._id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })


                if (response.data.status) {
                    setTotalRegistration(prev => prev - 1);
                    setPopupMessage(`${eventTitle} ${response.data.message}`);
                    setIsUserRegistered(false);
                    setShowLoading(false);
                }
            }
        } catch (error) {
            console.log(error)
            setShowLoading(false);
            setPopupMessage(error.response?.data?.message || "Client error");
        }
    };


    const handleEditChange = (e) => {

        const { name, value } = e.target;

        setEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updateEvent = () => {

        setEditData({
            _id: event._id,
            eventImage: event.eventImage || "",
            eventTitle: event.eventTitle || "",
            eventDescription: event.eventDescription || "",
            eventCategory: event.eventCategory || "",
            eventStartDate: event.eventStartDate?.slice(0, 10),
            eventEndDate: event.eventEndDate?.slice(0, 10),
            eventMaxParticipants: event.eventMaxParticipants || "",
            eventLocation: event.eventLocation || "",
            eventCreatedBy: userData._id,
            eventMode: event.eventMode || "Offline"
        });

        setIsEditing(true);
    };

    // updating in DB
    const saveUpdatedEvent = async () => {

        try {

            setShowLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/events/updateEvents`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.status) {
                setPopupMessage(response.data.message);
                setIsEditing(false);
                setShowLoading(false);
            }

        } catch (error) {
            console.log(error);
            setShowLoading(false);
            setPopupMessage(response.data.message || "Client error");

        }

    };

    // deleting from database 
    const deleteEvent = async () => {
        const confirmDelete = prompt(`Enter "${eventTitle}" to delete.`);

        if (eventTitle !== confirmDelete) {
            alert("Enter Correct Title");
            return;
        }
        setShowLoading(true);
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/events/deleteEvents/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                setPopupMessage(`${eventTitle} Deleted Successfully!`);
                setShowLoading(false);
            }
        } catch (error) {
            console.log(error);
            setShowLoading(false);
            setPopupMessage(error.response?.data?.message || "Client error");
            navigate("/events/")
        }
    }




    return (
        <>
            <div className="single-event-div">
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0 }} className="eventDetailed-card">
                    <div className="IMG-DIV">{eventImage ? (
                        <img
                            src={eventImage}
                            alt={eventTitle}
                            loading="lazy"
                            className="eventDetailed-card-image"
                        />
                    ) : (
                        <div className="eventDetailed-card-image-placeholder">Loading...</div>
                    )}</div>


                        <div className="eventDetailed-card-content">
                            <h2>{eventTitle}</h2>

                            <p className="eventDetailed-description">
                                {eventDescription}
                            </p>

                            <div className="eventDetailed-info">
                                <span>📍 {eventLocation}</span>
                                <span>{event.eventCategory}</span>
                                <span>🖥 {eventMode}</span>
                            </div>

                            <div className="eventDetailed-dates">
                                <span> Registration :&nbsp;
                                    {new Date(eventRegStartDate).toLocaleDateString()} |&nbsp;
                                    {new Date(eventRegEndDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="eventDetailed-dates">
                                <span> Event :&nbsp;
                                    {new Date(eventStartDate).toLocaleDateString()} |&nbsp;
                                    {new Date(eventEndDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="eventDetailed-dates">
                                Event Added by <span style={{ fontWeight: "bold" }}>{eventCreatedBy.name}</span>
                            </div>
                            <div className="eventDetailed-footer">
                                <span>
                                    {eventMaxParticipants > 0
                                        ? `👥 ${totalRegistration}/${eventMaxParticipants}`
                                        : "👥 No limit"}
                                </span>




                                {isUserRegistered ? (
                                    <div className="register-delete-update-event-btns">
                                        {userData?.role === "user" ?
                                            <></> : <>
                                                <div className="deleteEventDetailed" title="copy event id" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => copyEventId()}><i className="fa-regular fa-copy"></i></div>
                                                <div className="deleteEventDetailed" title="update" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => updateEvent()}><i className="fa-regular fa-pen-to-square"></i></div>
                                                <div className="deleteEventDetailed" title="delete" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => deleteEvent()}><i className="fa-solid fa-trash"></i></div>
                                            </>
                                        }
                                        <button title={isEventStarted ? "Can't Cancel now" : "Cancel now"} className="join-btn" onClick={() => handleRegister("cancel")} disabled={isEventStarted}
                                            style={{
                                                backgroundColor: isEventStarted ? "#ccc" : "#000",
                                                color: isEventStarted ? "#666" : "#fff",
                                                cursor: isEventStarted ? "not-allowed" : "pointer",
                                                opacity: isEventStarted ? 0.6 : 1,
                                                borderRadius: 0
                                            }}
                                        >Cancel</button>
                                    </div>
                                ) : (
                                    <div className="register-delete-update-event-btns">
                                        {userData?.role === "user" ?
                                            <></> : <>
                                                {token ? <>
                                                    <div className="deleteEventDetailed" title="copy event id" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => copyEventId()}><i className="fa-regular fa-copy"></i></div>
                                                    <div className="deleteEventDetailed" title="update" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => updateEvent()}><i className="fa-regular fa-pen-to-square"></i></div>
                                                    <div className="deleteEventDetailed" title="delete" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => deleteEvent()}><i className="fa-solid fa-trash"></i></div>
                                                </>
                                                    : <></>}
                                            </>
                                        }
                                        <button title={isEventStarted ? "Can't Register now" : "Register"} className="join-btn" onClick={() => handleRegister("register")} disabled={isEventStarted}
                                            style={{
                                                backgroundColor: isEventStarted ? "#ccc" : "#000",
                                                color: isEventStarted ? "#666" : "#fff",
                                                cursor: isEventStarted ? "not-allowed" : "pointer",
                                                opacity: isEventStarted ? 0.6 : 1,
                                                borderRadius: 0
                                            }}
                                        >Register</button>
                                    </div>
                                )}

                            </div>
                        </div>
                </motion.div>

                {showLoading ?
                    <Loading />
                    : <></>
                }
                {popupMessage && (
                    <Popup
                        message={popupMessage}
                        type="success"
                        onClose={() => setPopupMessage("")}
                    />
                )}


                {isEditing && (
                    <div className="edit-popup">

                        <div className="edit-box">

                            <h3>Edit Event</h3><br />
                            <p>Image URL:</p>
                            <input
                                type="text"
                                name="eventImage"
                                placeholder="Event Image URL"
                                value={editData.eventImage}
                                onChange={handleEditChange}
                            />

                            <p>Title:</p>
                            <input
                                type="text"
                                name="eventTitle"
                                value={editData.eventTitle}
                                onChange={handleEditChange}
                            />

                            <p>Description:</p>
                            <textarea
                                name="eventDescription"
                                value={editData.eventDescription}
                                onChange={handleEditChange}
                            />

                            <p>Category:</p>
                            <select
                                style={{ height: "40px" }}
                                name="eventCategory"
                                value={editData.eventCategory}
                                onChange={handleEditChange}
                            >
                                <option value="Hackthon">Select</option>
                                <option value="Hackthon">Hackthon</option>
                                <option value="Session">Session</option>
                                <option value="Work shop">Work shop</option>
                            </select>

                            <p>Start Date:</p>
                            <input
                                type="date"
                                name="eventStartDate"
                                value={editData.eventStartDate}
                                onChange={handleEditChange}
                            />

                            <p>End Date:</p>
                            <input
                                type="date"
                                name="eventEndDate"
                                value={editData.eventEndDate}
                                onChange={handleEditChange}
                            />
                            <p>Max Participants:</p>
                            <input
                                type="number"
                                name="eventMaxParticipants"
                                value={editData.eventMaxParticipants}
                                onChange={handleEditChange}
                            />

                            <p>Locaton:</p>
                            <input
                                type="text"
                                name="eventLocation"
                                value={editData.eventLocation}
                                onChange={handleEditChange}
                            />

                            <p>Mode:</p>
                            <select
                                style={{ height: "40px" }}
                                name="eventMode"
                                value={editData.eventMode}
                                onChange={handleEditChange}
                            >
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>

                            <div className="edit-buttons">
                                <button onClick={saveUpdatedEvent}>Save</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>

                        </div>

                    </div>
                )}

            </div >
        </>
    );
};

export default DetailedEventCard;