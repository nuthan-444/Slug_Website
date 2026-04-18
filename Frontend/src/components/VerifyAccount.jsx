import { useState } from "react";
import "./style/VerifyAccount.css";
import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useContextAPI } from "../context/contextAPI";


const VerifyAccount = () => {

  const [otpValue, setOtpValue] = useState("");
  const { userData, setUserData, token, setToken, email, setEmail } = useContextAPI();
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();



  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      setPopupMessage("Please enter complete OTP");
      return;
    }


    const otpCode = Number(otpValue);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/verifyAccount`, { email, otpCode });
      if (response.data.status) {
        navigate("/");
        setUserData(response.data.userData);
        setToken(response.data.token);
        setEmail(undefined);
      }
    } catch (error) {
      navigate("/signup");
      console.log(error);
      setPopupMessage(error.response?.data?.message || "Client error");
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify Your Account</h2>
        <p>Enter the 6-digit OTP sent to your email</p>

        <OTPInput length={6} onComplete={setOtpValue} />

        <button className="verify-btn" onClick={handleVerify}>
          Verify Account
        </button>

        <p className="resend-text">
          Didn't receive code? <span>Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;