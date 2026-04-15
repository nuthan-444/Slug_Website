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
        
        { userData.role !== "user" ? 
        <>
            <div className='admin-routes-outer'>
                <div className='admin-outer-div'>
                    <div className='admin-route'>
                        <NavLink
                            to="/admin/eventform"
                            className={({ isActive }) => isActive ? "header-a active each-route-in-admin-div" : "header-a each-route-in-admin-div"}
                            style={{ fontSize: "15px" }}
                        >
                            <i className="fa-solid fa-plus" style={{
                                width: "20px", height: "20px", borderRadius: "50%", marginRight: "10px",
                                backgroundColor: "#00FF00", display: "flex", justifyContent: "center", alignItems: "center"
                            }}></i> Add Event
                        </NavLink>
                        <NavLink
                            to="/admin/eventRegisterationInfo"
                            className={({ isActive }) => isActive ? "header-a active each-route-in-admin-div" : "header-a each-route-in-admin-div"}
                            style={{ fontSize: "15px" }}
                        >
                            <i className="fa-solid fa-clipboard-list" style={{
                                width: "20px", height: "20px", borderRadius: "50%", marginRight: "10px",
                                backgroundColor: "#eeff02", color: "black", display: "flex", justifyContent: "center", alignItems: "center"
                            }}></i>   Event Registation Info
                        </NavLink>
                    </div>
                </div>
            </div>

        {/* for mobile */}
            <div className='admin-routes-outer-mobile'>
                <div className='admin-outer-div'>
                    <div className='admin-route'>
                        <NavLink
                            to="/admin/eventform"
                            className={({ isActive }) => isActive ? "header-a active each-route-in-admin-div" : "header-a each-route-in-admin-div"}
                            style={{ fontSize: "15px" }}
                        >
                            <i className="fa-solid fa-plus" style={{
                                width: "50px", height: "50px", borderRadius: "50%", marginRight: "0px",
                                backgroundColor: "#00FF00", display: "flex", justifyContent: "center", alignItems: "center"
                            }}></i>
                        </NavLink>
                        <NavLink
                            to="/admin/eventRegisterationInfo"
                            className={({ isActive }) => isActive ? "header-a active each-route-in-admin-div" : "header-a each-route-in-admin-div"}
                            style={{ fontSize: "15px" }}
                        >
                            <i className="fa-solid fa-clipboard-list" style={{
                                width: "50px", height: "50px", borderRadius: "50%",
                                backgroundColor: "#eeff02", color: "black", display: "flex", justifyContent: "center", alignItems: "center"
                            }}></i>
                        </NavLink>
                    </div>
                </div>
            </div></>
: <></>
}
        </>
    )
}

export default Admin
