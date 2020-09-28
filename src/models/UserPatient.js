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
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        unbRegistration: {
            type: String,
            default: false,
        },
        bond: {
            type: String,
            required: true,
        },
    },
    { collection: 'patients' },
);

module.exports = mongoose.model('UserPatient', UserPatientSchema);
