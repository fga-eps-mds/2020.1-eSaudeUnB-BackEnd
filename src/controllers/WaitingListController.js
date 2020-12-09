const WaitingList = require('../models/WaitingList');

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
