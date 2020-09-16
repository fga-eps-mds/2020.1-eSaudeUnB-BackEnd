const uuid = require('uuid');
const models = require('../models');

const UserPatient = models.Patient;

module.exports = {

    async store(req, res) {
        try {
            await UserPatient.sync();
            const id = uuid.v4();

            const {
                name, lastName, email, phone, password, gender, unbRegistration, bond,
            } = req.body;

            await UserPatient.create({
                id,
                name,
                lastName,
                email,
                phone,
                password,
                gender,
                unbRegistration,
                bond,
            });

            return res.status(201).json(req.body);
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const user = await UserPatient.findAll({
                where: {
                    id: req.params.id,
                },
            });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const users = await UserPatient.findAll();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(204).json({ message: 'nenhum usuario encontrado' });
        }
    },

    async destroy(req, res) {
        await UserPatient.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json();
    },

    async update(req, res) {
        const {
            name, lastName, email, phone, password, unbRegistration, gender, bond,
        } = req.body;

        await UserPatient.update({
            name,
            lastName,
            email,
            phone,
            password,
            gender,
            unbRegistration,
            bond,
        }, {
            where: {
                id: req.params.id,
            },
        });

        const user = await UserPatient.findAll({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json(user);
    },

};
