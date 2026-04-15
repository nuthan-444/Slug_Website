// Signup.jsx
import { useEffect, useState } from "react";
import './style/loginsignup.css'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useContextAPI } from '../context/contextAPI'
import Home from "./Home";
import Loading from "../components/Loading";


const Signup = () => {

  const navigate = useNavigate();

  const {userData,setUserData,token,setToken,email,setEmail} = useContextAPI();
  const [showLoading, setShowLoading] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    name: "",
    srn:"",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");



  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
    setError("");
  };





  const handleSubmit = async(e) => {
    e.preventDefault();
    setShowLoading(true);


    if (!formData.email ||!formData.name || !formData.srn ||!formData.password ||!formData.confirmPassword) {
      return setError("All fields are required.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }


    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`,{name:formData.name,email:formData.email,srn:formData.srn,password:formData.password});
      if(response.data.status){
        setEmail(formData.email);
        navigate("/verifyAccount");
        // setUserData(response.data.userData);
        // setToken(response.data.token);
      } else {
        alert(response.data.message);
      }
      setShowLoading(false);
    }catch(error) {
      setShowLoading(false);
      alert(error.response?.data?.message || "Client error");
    }
    setError("");
  };



  return (
    <>
    {!token ?
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Enter your username"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="srn"
          placeholder="Enter your srn"
          value={formData.srn}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Signup</button>
        <p className="dont-have-account-have-an-account" onClick={() => navigate("/login")}>Already Have an Account ? Login </p>
      </form>
    </div>

    : <Home />
    }

      {showLoading ?
          <Loading />
          : <></>
      }
    </>
  );
};

export default Signup;