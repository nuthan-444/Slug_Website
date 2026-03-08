const mongoose = require("mongoose");
const Hackathon = mongoose.Schema({
    hackathonImage: {
        type: String,
    },
    hackathonTitle: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true,
    },
    hackathonDescription: {
        type: String,
        required: true,
        minlength: 5,
    },
    hackathonTheme: {
        type: String,
        required: true
    },
    hackathonRules: {
        type: String,
    },
    hackathonMaxMembers: {
        type: Number,
        required: true,
        default: 4
    },
    hackathonPrice: {
        type: Number,
        require: true,
    },
    hackathonRegistrationStartDate: {
        type: Date,
        required: true,
    },
    hackathonRegistrationEndDate: {
        type: Date,
        required: true,
    },
    hackathonStartDate: {
        type: Date,
        required: true,
    },
    hackathonEndDate: {
        type: Date,
        required: true,
    },
    hackathonMaxParticipants: {
        type: Number,

    },
    hackathonLocation: {
        type: String,
        trim: true,
        required: true,
    },
    hackathonStatus: {
        type: String,
        enum: ["Upcoming", "Registration Open", "Ongoing", "Completed"],
        default: "Upcoming"
    },
    hackathonSubmission: {
        githubRepo: String,
        demoVideo: String,
        pptLink: String
    },
    hackathonCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    hackathonMode: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Offline"
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model("Hackathon", Hackathon);