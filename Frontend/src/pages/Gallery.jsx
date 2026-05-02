import { useEffect, useState } from "react";
import axios from "axios";
import "./style/gallery.css";
import Loading from '../components/Loading'
import Popup from "../components/Popup";
import { useContextAPI } from '../context/contextAPI'

const Gallery = () => {
  const [popupMessage, setPopupMessage] = useState("");
  const { token, userData } = useContextAPI();
  const [showLoading, setShowLoading] = useState(false);

  const [gallery, setGallery] = useState([
    // {
    //   "title": "Nature Photography Collection",
    //   "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id quidem quae error fugiat enim debitis nesciunt molestiae ab mollitia numquam. Dolorum ratione aspernatur natus ipsum non quo alias libero dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum cum nobis dolore rerum vero, quo, incidunt molestias inventore quas natus aut? Enim sed beatae doloribus quisquam? Itaque deleniti mollitia voluptate?",
    //   "imageUrl": "https://res.cloudinary.com/dy1ngw9ha/image/upload/v1775265663/events/babpomdsyxpdwgayqbpr.jpg",
    //   "pdfUrl": "https://example.com/pdfs/nature.pdf",
    //   "uploadedBy": "661f8c2a9b3c4a5d6e7f8a9b"
    // },
    // {
    //   "title": "City Life",
    //   "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id quidem quae error fugiat enim debitis nesciunt molestiae ab mollitia numquam. Dolorum ratione aspernatur natus ipsum non quo alias libero dignissimos. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum cum nobis dolore rerum vero, quo, incidunt molestias inventore quas natus aut? Enim sed beatae doloribus quisquam? Itaque deleniti mollitia voluptate?",
    //   "imageUrl": "https://res.cloudinary.com/dy1ngw9ha/image/upload/v1775265663/events/babpomdsyxpdwgayqbpr.jpg",
    //   "pdfUrl": "https://example.com/pdfs/city.pdf",
    //   "uploadedBy": "661f8c2a9b3c4a5d6e7f8a9c"
    // }
  ]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gallery/getAllGallery`); // update your endpoint
      if (response.data.status) {
        setGallery(response.data.galleryData);
      }

    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);




  if (loading) return <Loading />;




  const deleteGallery = async (_id, title) => {
    const confirmDelete = prompt(`Enter "${title}" to delete.`);

    if (title !== confirmDelete) {
      setPopupMessage("Enter Correct Title");
      return;
    }
    setShowLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/gallery/deleteGallery/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });


      setPopupMessage(response.data.message);
    } catch (error) {
      console.log(error.message);
      setPopupMessage(error.response?.data?.message || "Client error");
    } finally {
      setShowLoading(false);
    }
  }



  return (
    <center>
    <div className="gallery-wrapper">
      {popupMessage && (
        <Popup
          message={popupMessage}
          type="success"
          onClose={() => setPopupMessage("")}
        />
      )}
      {gallery.length > 0 ? [...gallery].reverse().map((item) => (
        <div key={item._id} className="gallery-row">

          {/* Left Image */}
          <div className="gallery-image-box">
            <img src={item.imageUrl} alt={item.title} />
          </div>

          {/* Right Content */}
          <div className="gallery-info">
            <h2>{item.title}</h2>
            <p>{item.description}</p>

            <div className="delete-more-details">
              <button
                className="details-btn"
                onClick={() => window.open(item.pdfUrl, "_blank")}

              >
                More Details --&gt;
              </button>
              {userData?.role !== "user" ?
                <div className="deleteEventDetailed" title="delete" style={{ backgroundColor: "#000000", color: "white" }} onClick={() => deleteGallery(item._id, item.title)} ><i className="fa-solid fa-trash"></i></div>
                : <></>
              }</div>
          </div>

        </div>
      ))
        : <></>}
    </div></center>
  );
};

export default Gallery;