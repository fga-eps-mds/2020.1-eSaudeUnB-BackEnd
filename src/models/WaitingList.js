const mongoose = require('mongoose');

const WaitingListSchema = new mongoose.Schema({
    emailPatient: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('WaitingList', WaitingListSchema);
