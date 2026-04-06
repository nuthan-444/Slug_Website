const USER = require("../models/user");
const EVENT = require("../models/events");
const EVENTREGINFO = require("../models/eventRegInfo");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { eventRegistrationMessage } = require("../middleware/email");
const mongoose = require('mongoose');

// for user to get all events
const getDetailedEventsController = async (req, res) => {
    const eventID = req.params._id;
    const userID = req.user._id;
    try {
        const getEvent = await EVENT.findById(eventID).populate("eventCreatedBy", "name email");
        const eventInfo = await EVENTREGINFO.findOne({ eventId: eventID });
        const totalRegistrations = eventInfo?.registrationList.length || 0;
        let isUserRegistered = await EVENTREGINFO.exists({ eventId: eventID, registrationList: userID });
        isUserRegistered = isUserRegistered ? true : false;

        if (!getEvent) {
            return res.status(400).json({ status: false, message: "Event Not Found" });
        }
        return res.status(200).json({ status: true, message: "Event fetched successfully", eventData: { getEvent, totalRegistrations, isUserRegistered } });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server error", error: error });
    }
}


const getAllEventsController = async (req, res) => {
    try {
        const getAllEvents = await EVENT.find().select("-eventDescription -eventParticipantsList -eventMaxParticipants -eventLocation").populate("eventCreatedBy", "name email");

        if (getAllEvents.length === 0) {
            return res.status(400).json({ status: false, message: "No events exists" });
        }

        return res.status(200).json({ status: true, message: "Events fetched successfully", allEvents: getAllEvents });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server error", error: error });
    }
}



const registrationForEventController = async (req, res) => {
    const event_id = req.params.event_id;
    const user_id = req.user._id;


    if (!user_id) {
        return res.status(400), json({ status: false, message: "User id is not provided" });
    }

    try {
        const userData = await USER.findById(user_id);
        if (!userData) {
            return res.status(404).json({ status: false, message: "Account not found" });
        }

        const updateRegration = await EVENTREGINFO.findOneAndUpdate({ eventId: event_id }, { $addToSet: { registrationList: user_id } }, { returnDocument: "after", runValidators: true });
        const eventData = await EVENT.findById(event_id).select("eventTitle eventStartDate eventLocation eventWhatsappGroup");
        if (!updateRegration) {
            return res.status(400).json({ status: false, message: "Failed to Register." });
        }

        //Sending email
        eventRegistrationMessage(userData.email, userData.name, eventData.eventTitle, eventData.eventStartDate, eventData.eventLocation,eventData.eventWhatsappGroup);
        return res.status(200).json({ status: true, message: "Register Successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Server error.", error: error });
    }
}



const registrationCancelForEventController = async (req, res) => {
    const event_id = req.params.event_id;
    const user_id = req.user._id;
    if (!user_id) {
        return res.status(400).json({
            status: false, message: "User ID is required",
        });
    }

    try {
        const userData = await USER.findById(user_id);
        if (!userData) {
            return res.status(404).json({
                status: false, message: "Account not found",
            });
        }

        const updatedRegistrationCancel = await EVENTREGINFO.findOneAndUpdate({eventId: new mongoose.Types.ObjectId(event_id)}, { $pull: { registrationList: user_id } }, { returnDocument: "after", runValidators: true });

        if (!updatedRegistrationCancel) {
            return res.status(400).json({
                status: false, message: "Failed to cancel registration.",
            });
        }

        return res.status(200).json({ status: true, message: "Registration cancelled successfully.", });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Server error.", error: error });
    }
};



// only for admin adding events
const addEventController = async (req, res) => {
    const { eventTitle, eventShortDescription, eventDescription, eventCategory, eventRegStartDate, eventRegEndDate, eventStartDate, eventEndDate, eventMaxParticipants, eventLocation, eventCreatedBy, eventMode } = req.body;
    const eventImage = req.file;

    // console.log( eventTitle,eventShortDescription, eventDescription, eventCategory,eventRegStartDate,eventRegEndDate, eventStartDate, eventEndDate, eventMaxParticipants, eventLocation, eventCreatedBy, eventMode )
    if (!eventImage || !eventTitle || !eventShortDescription || !eventDescription || !eventCategory || !eventRegStartDate || !eventRegEndDate || !eventStartDate || !eventEndDate || !eventMaxParticipants || !eventLocation || !eventCreatedBy) {
        return res.status(400).json({ status: false, message: "All fields are required." });
    }


    try {
        const isPublisherAdmin = await USER.findById(eventCreatedBy);
        if (!isPublisherAdmin) {
            fs.unlinkSync(eventImage.path);
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            fs.unlinkSync(eventImage.path);
            return res.status(400).json({ status: false, message: "You are not admin." });

        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(eventImage.path, {
            folder: "events",
        });

        if (!uploadResult) { return res.status(400).json({ status: false, message: "failed to upload image" }) }

        // Delete local file after upload
        fs.unlinkSync(eventImage.path);

        const addEvent = await EVENT.create({ eventImage: uploadResult.secure_url, eventTitle, eventShortDescription, eventDescription, eventCategory, eventRegStartDate, eventRegEndDate, eventStartDate, eventEndDate, eventMaxParticipants, eventLocation, eventCreatedBy, eventMode });

        if (!addEvent) {
            return res.status(400).json({ status: false, message: "Failed to add." });
        }



        // creating in event registration info model
        const createObjOfEventRegInfo = await EVENTREGINFO.create({ eventId: addEvent._id });

        return res.status(201).json({ status: true, message: "Event Added Successfully.", addEvent });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server error", error: error });
    }
}



// only for admin updating events
const updateEventController = async (req, res) => {
    const updatedData = req.body;
    try {
        const isPublisherAdmin = await USER.findById(updatedData.eventCreatedBy);
        if (!isPublisherAdmin) {
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            return res.status(400).json({ status: false, message: "You are not admin." });
        }

        const updatedEvent = await EVENT.findByIdAndUpdate(updatedData._id, updatedData, { returnDocument: "after", runValidators: true });
        if (!updatedEvent) {
            return res.status(400).json({ status: false, message: "Failed to Update." });
        }
        return res.status(200).json({ status: true, message: "Successfully Updated", updatedEvent: updatedEvent });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server error", error: error });
    }
}



// only for admin deleting events
const deleteEventController = async (req, res) => {
    const event_id = req.params._id;
    const remover_id = req.user._id;

    if (!event_id) {
        return res.status(400).json({ status: false, message: "Didn't receive Event id." });
    }

    try {
        const isPublisherAdmin = await USER.findById(remover_id);
        if (!isPublisherAdmin) {
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            return res.status(400).json({ status: false, message: "You are not admin." });
        }

        const deleteEvent = await EVENT.findByIdAndDelete(event_id);

        if (!deleteEvent) {
            return res.status(404).json({ status: false, message: "Event Not Found." });
        }

        return res.json({ status: true, message: "Successfully deleted." }).status(204);
    } catch (error) {
        return res.status(500).json({ status: false, message: "Server error", error: error });
    }
}



const getAllUserDataWhoAreRegisteredForParticularEventController = async (req, res) => {
    const eventId = req.params._id;
    const getterID = req.user._id;
    
    if (!eventId || !getterID) {
        return res.status(400).json({ status: false, message: "event id is required" });
    }

    try {
        const getter = await USER.findById(getterID);

        if (!getter) {
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (getter.role !== process.env.ADMIN_STRING) {
            return res.status(400).json({ status: false, message: "You are not admin." });
        }

        const eventParticipantsData = await EVENTREGINFO.findOne({eventId:eventId}).populate("registrationList", "name email srn");

        if (!eventParticipantsData) {
            return res.status(404).json({ status: false, message: "Event Not Found" });
        }

        return res.status(200).json({ status: true, message: "Got the Data", eventParticipantsData: eventParticipantsData });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Server error", error: error });
    }
}



module.exports = {
    getDetailedEventsController,
    getAllEventsController,
    registrationForEventController,
    registrationCancelForEventController,
    addEventController,
    updateEventController,
    deleteEventController,
    getAllUserDataWhoAreRegisteredForParticularEventController
}