import React from "react";
import "./style/ProfileCard.css";
import TuxPfp from '/TuxPenguin.png'
const ProfileCard = ({ name, email, srn}) => {
  return (
    <div className="profile-card">
      <img src={TuxPfp} alt="profile" className="profile-img" />

      <h2 className="profile-name">Name: {name}</h2>

      <p className="profile-srn">SRN: {srn}</p>

      <p className="profile-email">Email: {email}</p>
    </div>
  );
};

export default ProfileCard;