import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './style/TeamRegister.css'
import { useContextAPI } from '../context/contextAPI'



const TeamRegister = () => {
  const { id } = useParams();

  const { userData } = useContextAPI();

  const [teamName, setTeamName] = useState("");

  const [members, setMembers] = useState([
    { name: userData.name, srn: userData.srn, email: userData.email },
    { name: "", srn: "", email: "" },
    { name: "", srn: "", email: "" },
    { name: "", srn: "", email: "" }
  ]);

  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove empty members
    const filteredMembers = members.filter(
      member => member.name && member.srn && member.email
    );

    if (filteredMembers.length < 2) {
      alert("Minimum 2 members required");
      return;
    }

    try {
      await axios.post(`/api/events/${id}/register`, {
        teamName,
        members: filteredMembers
      });

      alert("Team Registered Successfully 🎉");
    } catch (error) {
      console.error(error);
      alert("Error registering team");
    }
  };

 return (
  <div className="team-register-container">
    <div className="team-register-card">
      <h2>Team Registration</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>

        <h3 className="member-heading">Team Members (Min 2 - Max 4)</h3>

        {members.map((member, index) => (
          <div key={index} className="member-card">
            <h4>Member {index + 1}</h4>

            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="SRN"
              value={member.srn}
              onChange={(e) =>
                handleChange(index, "srn", e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) =>
                handleChange(index, "email", e.target.value)
              }
            />
          </div>
        ))}

        <button type="submit" className="register-btn">
          Register Team
        </button>
      </form>
    </div>
  </div>
);
};

export default TeamRegister;