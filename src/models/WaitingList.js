const mongoose = require('mongoose');

const WaitingListSchema = new mongoose.Schema({
    email: {
        type: String,
        unique:true,
        required: true,
    },
    namePatient: String,
    emailPatient: {
        type: String,
        unique:true,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('WaitingList', WaitingListSchema);