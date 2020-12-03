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
            select: false,
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
            default: 'user',
            required: false,
        },
        civilStatus: {
            type: String,
            default: null,
            required: false,
        },
        race: {
            type: String,
            default: null,
            required: false,
        },
        sexualOrientation: {
            type: String,
            default: null,
            required: false,
        },
        children: {
            type: String,
            default: null,
            required: false,
        },
        emergencyContactName: {
            type: String,
            default: null,
            required: false,
        },
        emergencyContactPhone: {
            type: String,
            default: null,
            required: false,
        },
        emergencyContactBond: {
            type: String,
            default: null,
            required: false,
        },
        motherName: {
            type: String,
            default: null,
            required: false,
        },
        fatherName: {
            type: String,
            default: null,
            required: false,
        },
        affiliationPhone: {
            type: String,
            default: null,
            required: false,
        },
        socialPrograms: {
            type: String,
            default: null,
            required: false,
        },
        studentHouseResidence: {
            type: String,
            default: null,
            required: false,
        },
        psychiatricFollowUp: {
            type: String,
            default: null,
            required: false,
        },
        medication: {
            type: String,
            default: null,
            required: false,
        },
        mainComplaint: {
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
        score: {
            type: Number,
            default: 0,
            required: false,
        },
        canSchedule:{
            type: Boolean,
            default: false,
            required: false,
        },
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],

    },
    { collection: 'patients' },
);

module.exports = mongoose.model('UserPatient', UserPatientSchema);
