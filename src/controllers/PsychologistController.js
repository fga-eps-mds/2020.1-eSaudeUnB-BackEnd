const generatePassword = require('password-generator');
const Psychologist = require('../models/Psychologist');

module.exports = {
    async store(req, res) {
        try {
            const password = generatePassword(8, false);
            const {
                name,
                lastName,
                email,
                specialization,
                bibliography,
                gender,
                bond,
            } = req.body;

            const psyUser = await Psychologist.findOne({ email });

            if (psyUser) {
                return res.status(200).json(psyUser);
            }

            const psychologist = await Psychologist.create({
                name,
                lastName,
                email,
                gender,
                bond,
                password,
                specialization,
                bibliography,
            });
            return res.status(201).json(psychologist);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    async index(req, res) {
        try {
            const users = await Psychologist.find();

            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.params;

            await Psychologist.deleteOne({ email });

            return res.status(200).json();
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    async update(req, res) {
        const { email, weekDay, restrict } = req.body;
        const psicology = await Psychologist.updateOne(
            { email },
            {
                $set: {
                    weekDay,
                },
                $push: {
                    restrict,
                },
            },
        ); return res.status(200).json(psicology);
    },
};
