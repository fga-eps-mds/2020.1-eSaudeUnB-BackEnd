/* eslint-disable linebreak-style */
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');

module.exports = {
    async store(req, res) {
        try {
            const {
                name, lastName, email, phone,
                password, gender, unbRegistration, bond,
            } = req.body;

            const user = await UserPatient.findOne({ email });
            const psyUser = await Psychologist.findOne({ email });

            if (user || psyUser) {
                return res.status(200).json(user);
            }

            const patient = await UserPatient.create({
                name,
                lastName,
                email,
                phone,
                password,
                gender,
                unbRegistration,
                bond,
            });

            return res.status(201).json(patient);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { email } = req.params;
            const user = await UserPatient.findOne({ email });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const users = await UserPatient.find();

            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.body;

            await UserPatient.deleteOne({ email });

            return res
                .status(200)
                .json({ message: 'Usuário deletado com sucesso!' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {
            const {
                name, lastName, phone, unbRegistration, gender, bond,
                civilStatus, religion,
            } = req.body;

            const { email } = req.params;

            const user = await UserPatient.findOne({
                email,
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
            if (phone) {
                user.phone = phone;
            }
            if (unbRegistration) {
                user.unbRegistration = unbRegistration;
            }
            if (gender) {
                user.gender = gender;
            }
            if (bond) {
                user.bond = bond;
            }
            if (civilStatus) {
                user.civilStatus = civilStatus;
            }
            if (religion) {
                user.religion = religion;
            }
            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'falha ao dar o update' });
        }
    },

    async updatePassword(req, res) {
        try {
            const {
                password,
            } = req.body;

            const user = await UserPatient.findOne({
                email: req.params.email,
            }).exec();

            user.password = password;

            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'falha ao dar o update da senha' });
        }
    },
};
