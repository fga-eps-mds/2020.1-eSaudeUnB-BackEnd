const UserPatient = require('../models/UserPatient');

module.exports = {
    async store(req, res) {
        try {
            const {
                name, lastName, email, phone,
                password, gender, unbRegistration, bond,
            } = req.body;

            const user = await UserPatient.findOne({ email });

            if (user) {
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
            const user = await UserPatient.findOne({
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
            if (req.body.phone) {
                user.phone = req.body.phone;
            }
            if (req.body.unbRegistration) {
                user.unbRegistration = req.body.unbRegistration;
            }
            if (req.body.gender) {
                user.gender = req.body.gender;
            }
            if (req.body.bond) {
                user.bond = req.body.bond;
            }
            if (req.body.civilStatus) {
                user.civilStatus = req.body.civilStatus;
            }
            if (req.body.religion) {
                user.religion = req.body.religion;
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
