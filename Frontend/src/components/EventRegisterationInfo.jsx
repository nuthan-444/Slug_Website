import React from 'react'
import Header from './Header'
import Admin from '../pages/Admin'
import './style/EventRegistrationInfo.css'
import { useState } from 'react'
import axios from 'axios'
import { useContextAPI } from '../context/contextAPI'
import Popup from "./Popup";


const EventRegisterationInfo = () => {
  const { token } = useContextAPI();
  const [partiLists, setPartiLists] = useState([]);
  const [eventIDValue, setEventIDValue] = useState("");
  const [popupMessage, setPopupMessage] = useState("");


  const getParticipants = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/events/getAllParticipantsData/${eventIDValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setPartiLists(response.data.eventParticipantsData.registrationList);
        setPopupMessage(response.data.message);
        return;
      }

      setPopupMessage(response.data.message);
    } catch (error) {
      setPopupMessage(error.response?.data?.message || "Client error");
      console.log(error);
    }
  };

  // DOWNLOAD CSV FUNCTION
  const downloadCSV = () => {
    if (partiLists.length === 0) {
      alert("No participants to download");
      return;
    }

    const headers = ["SRN", "Name", "Email"];

    const rows = partiLists.map((user) => [
      user.srn,
      user.name,
      user.email
    ]);

    const csvContent =
      [headers, ...rows].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `participants_${eventIDValue}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className='registration-info'>
        <div>
          <Admin />
        </div>

        <div className='info-table-div'>
          <input className='event-id'
            type="text"
            placeholder='Enter Event Id'
            value={eventIDValue}
            onChange={(e) => setEventIDValue(e.target.value)}
            style={{ width: "300px" }}
          />

          <button className='get-participants-btn' onClick={getParticipants}>
            Get Lists
          </button>

          <button className='download-data' onClick={downloadCSV}>
            Download CSV
          </button>

          <p className='parti-title'>Participants List</p>
          <p>Total Participants : {partiLists.length}</p>

          <div className='parti-list-data'>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>SRN</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {partiLists.length > 0 ? (
                  partiLists.map((singleParti, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{singleParti.srn}</td>
                      <td>{singleParti.name}</td>
                      <td>{singleParti.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No participants found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
  )
}

export default EventRegisterationInfo