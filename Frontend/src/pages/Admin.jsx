import React, { useState } from 'react'
import './style/Admin.css'
import { NavLink, useNavigate } from "react-router-dom"
import { useContextAPI } from '../context/contextAPI'
import Header from '../components/Header'
import EventForm from '../components/EventForm'

const Admin = () => {

       const { userData, setUserData, token, setToken } = useContextAPI();
    // style={{width:"20px",height:"20px",borderRadius:"50%",
    //                                 backgroundColor:"#00FF00",display:"flex",justifyContent:"center",alignItems:"center"}}

    return (
  <>
    {userData?.role !== "user" && (
      <div className="admin-layout">

        {/* Sidebar */}
        <div className="admin-routes-outer">
          <div className="admin-route">

            <NavLink
              to="/admin/eventform"
              className={({ isActive }) =>
                isActive
                  ? "each-route-in-admin-div active"
                  : "each-route-in-admin-div"
              }
            >
              <i className="fa-solid fa-plus icon-add"></i>
              <span>Add Event</span>
            </NavLink>

            <NavLink
              to="/admin/eventRegisterationInfo"
              className={({ isActive }) =>
                isActive
                  ? "each-route-in-admin-div active"
                  : "each-route-in-admin-div"
              }
            >
              <i className="fa-solid fa-clipboard-list icon-list"></i>
              <span>Registration Info</span>
            </NavLink>

          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">
          {/* your nested routes will render here */}
        </div>

      </div>
    )}
  </>
);
}

export default Admin
