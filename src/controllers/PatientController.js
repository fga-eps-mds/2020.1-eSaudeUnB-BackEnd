const UserPatient = require('../models/UserPatient');

module.exports = {
    async store(req, res) {
        try {
            const {
                name,
                lastName,
                email,
                phone,
                password,
                gender,
                unbRegistration,
                bond,
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
            const { email } = req.body;
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
                name,
                lastName,
                email,
                phone,
                password,
                unbRegistration,
                gender,
                bond,
            } = req.body;

            await UserPatient.updateOne(
                { email },
                {
                    name,
                    lastName,
                    phone,
                    password,
                    gender,
                    unbRegistration,
                    bond,
                }
            );

            const user = await UserPatient.findOne({ email });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};
