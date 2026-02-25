const USER = require("../models/user");
const EVENT = require("../models/events");


// for user to get all events
const getAllEventsController = async (req, res) => {

    try {
        const getAllEvents = await EVENT.find().populate("eventCreatedBy", "name email");

        if (getAllEvents.length === 0) {
            return res.status(400).json({ status: false, message: "No events exists" });
        }

        return res.status(200).json({ status: true, message: "Events fetched successfully", allEvents: getAllEvents });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Server error" });
    }
}


const addEventController = async (req, res) => {
    const { eventImage, eventTitle, eventDescription, eventStartDate, eventEndDate, eventParticipantsList, eventMaxParticipants, eventLocation, isEventActive, eventCreatedBy, eventMode } = req.body;

    if (!eventImage || !eventTitle || !eventDescription || !eventStartDate || !eventEndDate || !eventMaxParticipants || !eventLocation || !eventCreatedBy) {
        return res.status(400).json({ status: false, message: "All fields are required." });
    }


    try {
        const isPublisherAdmin = await USER.findById(eventCreatedBy);
        if (!isPublisherAdmin) {
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            return res.status(400).json({ status: false, message: "You are not admin." });
        }


        const addEvent = await EVENT.create({ eventImage, eventTitle, eventDescription, eventStartDate, eventEndDate, eventParticipantsList, eventMaxParticipants, eventLocation, isEventActive, eventCreatedBy, eventMode });

        if (!addEvent) {
            return res.status(400).json({ status: false, message: "Failed to add." });
        }

        return res.status(201).json({ status: true, message: "Event Added Successfully.", addEvent });


    } catch (error) {
        
        return res.status(500).json({ status: false, message: "Server error" });
    }
}




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

        const updatedEvent = await EVENT.findByIdAndUpdate(updatedData._id,updatedData,{returnDocument: "after",runValidators: true}) ;
        if(!updatedEvent) {
            return res.status(400).json({status:false,message:"Failed to Update."});
        }
        return res.status(200).json({status:true,message:"Successfully Updated",updatedEvent:updatedEvent});
    } catch(error) {
        return res.status(500).json({status:false,message:"Server error"});
    }
}


const deleteEventController = async(req,res) => {
    const event_id = req.params._id;
    const remover_id = req.user._id;

    if(!event_id) {
        return res.status(400).json({ status: false, message: "Didn't receive Event id." });
    }

    try{
        const isPublisherAdmin = await USER.findById(remover_id);
        if (!isPublisherAdmin) {
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            return res.status(400).json({ status: false, message: "You are not admin." });
        }

        const deleteEvent = await EVENT.findByIdAndDelete(event_id);

        if(!deleteEvent) {
            return res.status(404).json({status:false,message:"Event Not Found."});
        }

        return res.json({status:true,message:"Successfully deleted."}).status(204);
    } catch(error) {
        return res.status(500).json({status:false,message:"Server error"});
    }
}



module.exports = {
    getAllEventsController,
    addEventController,
    updateEventController,
    deleteEventController
}