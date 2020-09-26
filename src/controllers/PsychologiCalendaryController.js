const { mongo, Mongoose } = require('mongoose');
const { update } = require('../models/Calendary');
const Calendary = require('../models/Calendary');
const { index } = require('./PatientController');
const Psychologist = require('../models/Psychologist');

module.exports = {
    async store(req, res) {
        try {
            const {
                Psychologist_id, date, Patient_id, hour,
            } = req.body;
            const Calendar = await Calendary.create(
                {
                    Psychologist_id,
                    date,
                    Patient_id,
                    hour,
                },
            );
            return res.status(200).json(Calendar);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    async index(req, res) {
        try {
            const Calendario = await Calendary.find();
            return res.status(200).json(Calendario);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    async update(req, res) {
        try {
            const {
                Psychologist_id, date, Patient_id, hour, id,
            } = req.body;
            const Calendar = await Calendary.update({ Psychologist_id, Patient_id },
                {
                    Psychologist_id,
                    date,
                    Patient_id,
                    hour,
                });

            return res.status(200).json(Calendar);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};
