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
        //1
        race: {
            type: String,
            default: null,
            required: false,
        },
        //2
        sexualOrientation: {
            type: String,
            default: null,
            required: false,
        },
        //3
        children: {
            type: String,
            default: null,
            required: false,
        },
        //4
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
        //5
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
        //6
        socialPrograms: {
            type: String,
            default: null,
            required: false,
        },
        //7
        studentHouseResidence: {
            type: String,
            default: null,
            require: false,
        },
        //8
        psychiatricFollowUp: {
            type: String,
            default: null,
            require: false,
        },
        //9
        medication: {
            type: String,
            default: null,
            require: false,
        },
        //10
        mainComplaint: {
            type: String,
            default: null,
            require: false,
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
