const express = require("express");
const { getUserDataController, loginController, creatingUserController, updateUserController, deleteUserController, verifyController} = require("../controllers/authController");
const router = express.Router();


// Get user data for profile
router.get("/:_id",getUserDataController);


// login router
router.post("/login",loginController);


//signup = creating 
router.post("/signup",creatingUserController);


// updatig user
router.put("/:id",updateUserController);


//delete user
router.delete("/:email",deleteUserController);


router.post("/verifyAccount",verifyController)

module.exports = router;