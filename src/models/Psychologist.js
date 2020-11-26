/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const PsychologistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        // select:false,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    bond: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
    },
    specialization: {
        type: String,
    },
    userImage: {
        type: Buffer,
        contentType: String,
        required: false,
    },
    weekDay: [
        {
            year: Number,
            day: Number,
            month: Number,
            weekDay: Number,
            from: String,
            to: String,
            duration: Number,
            appointment: [{
                time: String,
                scheduled: Boolean,
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserPatient' },
                name: String,
            }],
        },
    ],
});

module.exports = mongoose.model('Psychologist', PsychologistSchema);
