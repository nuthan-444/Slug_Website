const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    eventImage: {
        type: String,
    },

    eventTitle: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },

    eventShortDescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },

    eventDescription: {
        type: String,
        required: true,
        minlength: 10,
    },
    eventWhatsappGroup: {
        type: String,
        default: "https://chat.whatsapp.com/KedhgZ9lnFJAyw9DWF4llO",
        Select: false,
    },
    eventCategory: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        enum: ["Hackthon", "Session", "Work shop"]
    },
    eventRegStartDate: {
        type: Date,
        required: true
    },
    eventRegEndDate: {
        type: Date,
        required: true
    },
    eventStartDate: {
        type: Date,
        required: true,
    },

    eventEndDate: {
        type: Date,
        required: true,

    },

    eventMaxParticipants: {
        type: Number,
        required: true,
    },

    eventLocation: {
        type: String,
        trim: true,
        required: true,
    },

    eventCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    eventMode: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Offline"
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model("Event", eventSchema);