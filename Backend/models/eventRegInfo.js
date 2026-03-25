const mongoose = require('mongoose');

const eventInfoSchema = mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },

    registrationList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, {
    timestamps: true,
});


module.exports = mongoose.model("EventInfo", eventInfoSchema);