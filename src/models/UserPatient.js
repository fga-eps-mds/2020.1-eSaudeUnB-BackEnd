const mongoose = require('mongoose');

const UserPatientSchema = new mongoose.Schema(
    {
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
        phone: {
            type: String,
            default: null,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            default: null,
            required: false,
        },
        unbRegistration: {
            type: String,
            default: null,
            required: false,
        },
        bond: {
            type: String,
            default: null,
            required: false,
        },
        civilStatus: {
            type: String,
            default: null,
            required: false,
        },
        religion: {
            type: String,
            default: null,
            required: false,
        },
        appointments: [
            {
                psychologist_id: String,
                psychologistName: String,
                weekDay: Number,
                time: String,
                duration: Number,
            },
        ],
        userImage: {
            type: Buffer,
            contentType: String,
            required: false,
        },
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],

    },
    { collection: 'patients' },
);

module.exports = mongoose.model('UserPatient', UserPatientSchema);
