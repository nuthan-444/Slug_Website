const USER = require("../models/user");
const EVENT = require("../models/events");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { eventRegistrationMessage } = require("../middleware/email");
const HACKATHON = require("../models/hackathon");





const addHackthonController = async (req, res) => {
  const { hackathonImage, hackathonTitle, hackathonDescription, hackathonTheme,
    hackathonRules, hackathonMaxMembers, hackathonPrice, 
    hackathonRegistrationStartDate, hackathonRegistrationEndDate,hackathonStartDate, 
    hackathonEndDate, hackathonMaxParticipants, hackathonLocation, hackathonStatus, hackathonSubmission, hackathonCreatedBy,
    hackathonMode } = req.body;

    if(!hackathonImage || !hackathonTitle || !hackathonDescription || !hackathonTheme ||
    !hackathonRules || !hackathonMaxMembers || !hackathonPrice || 
    !hackathonRegistrationStartDate || !hackathonRegistrationEndDate || !hackathonStartDate ||
    !hackathonEndDate || !hackathonMaxParticipants || !hackathonLocation || !hackathonStatus || !hackathonSubmission || !hackathonCreatedBy
    || !hackathonMode){
      return res.status(400).json({"status":false,message:"All fiels are must filled."});
    }

    try {

      const isPublisherAdmin = await USER.findById(hackathonCreatedBy);
      if (!isPublisherAdmin) {
            // fs.unlinkSync(eventImage.path);
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            // fs.unlinkSync(eventImage.path);
            return res.status(400).json({ status: false, message: "You are not admin." });

        }


      const createdHackathon = await HACKATHON.create({hackathonImage, hackathonTitle, hackathonDescription, hackathonTheme,
    hackathonRules, hackathonMaxMembers, hackathonPrice, 
    hackathonRegistrationStartDate, hackathonRegistrationEndDate,hackathonStartDate, 
    hackathonEndDate, hackathonMaxParticipants, hackathonLocation, hackathonStatus, hackathonSubmission, hackathonCreatedBy,
    hackathonMode});

    if(!createdHackathon) {
      return res.status(400).json({"status":false,message:"Failed to Add Hackathon"});
    }

      return res.status(201).json({"status":true,message:"Hackathon added successfully",createdHackathon:createdHackathon});
    

    } catch(error){
      console.log(error);
      return res.status(500).json({"status":false,message:"Server error"});
    }
}


const updateHackathonController = async(req,res) => {
  
}

module.exports = {
  addHackthonController,
}