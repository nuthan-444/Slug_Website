import { useEffect } from "react";
import "./style/Popup.css";

const Popup = ({ message, type = "success", onClose, duration = 2000 }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`popup-container ${type}`}>
      {message}
    </div>
  );
};

export default Popup;