const express = require("express");
const {getAllGalleryController,createGallery,deleteGallery} = require("../controllers/galleryController");
const { verifyToken } = require("../util/JWT.Token"); 
const upload = require("../middleware/multer")
const router = express.Router();


// for user and admin [Getting all events]
router.get("/getAllGallery",getAllGalleryController);


// Getting Single Event details by id
router.post("/createGallery",verifyToken,upload.single("galleryImage"),createGallery);


// deleting a single gallery
router.delete("/deleteGallery/:_id",verifyToken,deleteGallery);



module.exports = router;