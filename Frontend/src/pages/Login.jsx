// Login.jsx
import { useState } from "react";
import './style/loginsignup.css'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useContextAPI } from '../context/contextAPI'
import Home from "./Home";
import Loading from "../components/Loading";
import Popup from "../components/Popup";


const Login = () => {
  const navigate = useNavigate();

  const { userData, setUserData, token, setToken } = useContextAPI();
  const [showLoading, setShowLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);

    if (!formData.email || !formData.password) {
      setShowLoading(false)
      return setError("All fields are required");
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email: formData.email, password: formData.password });
      if (response.data.status) {
        navigate("/");
        setUserData(response.data.userData);
        setToken(response.data.token);
      } else {
        alert(response.data.message);
      }
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      console.log(error)
      setPopupMessage(error.response?.data?.message || "Client error");
    }

    setError("");
  };

  return (
    <>
      {!token ?
        <div className="auth-container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Login</button>
            <p className="dont-have-account-have-an-account" onClick={() => navigate("/signup")}>Don't Have an Account ? Create One</p>
          </form>
        </div>

        : <Home />

      }

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

    </>
  );
};

export default Login;