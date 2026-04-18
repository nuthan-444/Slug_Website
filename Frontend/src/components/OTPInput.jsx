import { useRef, useState } from "react";
import "./style/OTPInput.css";

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move forward
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // complete check
    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // move back on empty backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    while (newOtp.length < length) newOtp.push("");

    setOtp(newOtp);

    // focus last filled
    const lastIndex = newOtp.findIndex((d) => d === "");
    inputsRef.current[lastIndex === -1 ? length - 1 : lastIndex]?.focus();

    if (newOtp.every((digit) => digit !== "")) {
      onComplete?.(newOtp.join(""));
    }
  };

  const handleFocus = (index) => {
    inputsRef.current[index]?.select();
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"   // ✅ mobile keyboard
          pattern="[0-9]*"
          maxLength="1"
          value={digit}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OTPInput;