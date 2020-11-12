const mongoose = require('mongoose');

const WaitingListSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    namePatient: String,
    emailPatient: {
        type: String,
        required: true,
    },
}, { timestamps: true },
);

module.exports = mongoose.model('WaitingList', WaitingListSchema);