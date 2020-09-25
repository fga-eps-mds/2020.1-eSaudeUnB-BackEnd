const mongoose = require('mongoose');

<<<<<<< HEAD
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
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
=======
const UserPatientSchema = new mongoose.Schema({
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

    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }], // referenciando o schema session para puxar os dados
>>>>>>> 4416b03... refactor: update SessionController

    },
    { collection: 'patients' }
);

module.exports = mongoose.model('UserPatient', UserPatientSchema);
