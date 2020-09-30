const generatePassword = require('password-generator');
const Psychologist = require('../models/Psychologist');

module.exports = {
    async store(req, res) {
        try {
            const password = generatePassword(8, false);
            const {
                name, lastName, email, specialization,
                bibliography, gender, bond,
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

    async show(req, res) {
        try {
            const { email } = req.params;
            const user = await Psychologist.findOne({ email });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
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
        try {
            const user = await Psychologist.findOne({
                email: req.params.email,
            }).exec();

            if (req.body.name) {
                user.name = req.body.name;
            }
            if (req.body.lastName) {
                user.lastName = req.body.lastName;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.gender) {
                user.gender = req.body.gender;
            }
            if (req.body.bond) {
                user.bond = req.body.bond;
            }
            if (req.body.specialization) {
                user.specialization = req.body.specialization;
            }
            if (req.body.bibliography) {
                user.bibliography = req.body.bibliography;
            }
            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'falha ao dar o update' });
        }
    },

    async updatePassword(req, res) {
        try {
            const { password } = req.body;

            const user = await Psychologist.findOne({
                email: req.params.email,
            }).exec();

            user.password = password;

            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao atualizar senha' });
        }
    },
};
