const express = require("express");
const { verifyToken } = require("../util/JWT.Token"); 
const upload = require("../middleware/multer");
const { addHackthonController } = require("../controllers/hackthonController");
const router = express.Router();

router.post("/addHackathon",verifyToken,addHackthonController);




module.exports = router;