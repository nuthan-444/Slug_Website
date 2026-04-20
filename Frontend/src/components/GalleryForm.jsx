import { useState } from "react";
import axios from "axios";
import "./style/GalleryForm.css";
import { useContextAPI } from '../context/contextAPI'
import Admin from "../pages/Admin";
import Popup from "./Popup";
import Loading from '../components/Loading'
import { useNavigate } from "react-router-dom";

const GalleryForm = () => {

  const { userData, setUserData, token, setToken } = useContextAPI();
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pdfUrl: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // image file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // preview (optional but useful)
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setPopupMessage("");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("pdfUrl", formData.pdfUrl);
      data.append("galleryImage", image); // 🔥 only image file

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/gallery/createGallery`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.data.status) {
        navigate("/gallery");
      } else {
      console.log(error.response?.data?.message);
      }

      // reset
      setFormData({ title: "", description: "", pdfUrl: "" });
      setImage(null);
      setPreview(null);

    } catch (error) {
      console.log(error);
      setPopupMessage(error.response?.data?.message || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="gallery-form-container">
      <div>
        <Admin />
      </div>

      <form onSubmit={handleSubmit} className="gallery-form">
        <h2>Add Gallery</h2>
        {/* Image Upload */}
        <p>Attach photo</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />


        {/* PDF URL */}
        <input
          type="text"
          name="pdfUrl"
          placeholder="Enter PDF URL"
          value={formData.pdfUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Gallery"}
        </button>

        {message && <p className="form-message">{message}</p>}
        { loading ?
        <Loading /> : <></>
        }
        </form>
      {popupMessage && (
        <Popup
          message={popupMessage}
          type="success"
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
};

export default GalleryForm;