const WaitingList = require('../models/WaitingList');
const WaitinglistemailUtil = require('../config/Waitinglist_email');

module.exports = {
    async store(req, res) {
        try {
            const {
                emailPatient,
                patientScore,
            } = req.body;

            const waitingList = await WaitingList.create({
                emailPatient,
                patientScore,
            });
            const DB = await WaitingList.find().sort({ patientScore: -1 }).exec();
            const position = DB.findIndex((obj) => obj.emailPatient === emailPatient) + 1;
            await WaitinglistemailUtil.waitinglist(emailPatient, position);
            return res.status(201).json(waitingList);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const waitingLists = await WaitingList.find().sort({ patientScore: -1 }).exec();

            return res.status(200).json(waitingLists);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.params;

            await WaitingList.deleteOne({ emailPatient: email });

            return res.status(200).json();
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};
