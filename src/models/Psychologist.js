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
            weekDay: Number,
            from: String,
            to: String,
        },
    ],
    restrict: [
        {
            year: Number,
            day: Number,
            month: Number,
        },
    ],
});

module.exports = mongoose.model('Psychologist', PsychologistSchema);
