const generatePassword = require('password-generator');
const Psychologist = require('../models/Psychologist');

module.exports = {
    async store(req, res) {
        try {
            const password = generatePassword(8, false);
            const {
                name, lastName, email, specialization,
                biography, gender, bond,
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
                biography,
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

            const {name, lastName, gender, bond, specialization, biography} = req.body;
            const {email} = req.params

            const user = await Psychologist.findOne({
                email
            }).exec();

            if (name) {
                user.name = name;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (email) {
                user.email = email;
            }
            if (gender) {
                user.gender = gender;
            }
            if (bond) {
                user.bond = bond;
            }
            if (specialization) {
                user.specialization = specialization;
            }
            if (biography) {
                user.biography = biography;
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
