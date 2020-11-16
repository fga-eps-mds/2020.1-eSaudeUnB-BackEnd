const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({

    mainComplaint: {
        type: String,
        required: true,
    },

    secondaryComplaint: {
        type: String,
    },

    complaintEvolution: {
        type: String,
    },

    professional: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Session', SessionSchema);
