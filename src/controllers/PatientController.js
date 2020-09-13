const uuid = require('uuid');
const models = require('../models');

const UserPatient = models.Patient;

module.exports = {

    async store(req, res) {
        try {
            await UserPatient.sync({ alter: true });
            req.body.id = uuid.v4();
            const user = await UserPatient.create(req.body);
            await user.save();

            return res.json(user);
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

            return res.json(user);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const users = await UserPatient.findAll();
            return res.json(users);
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

        return res.json();
    },

    async update(req, res) {
        const {
            name, surname, email, phoneNumber, password, registration, gender, link,
        } = req.body;

        await UserPatient.update({
            name,
            surname,
            email,
            phoneNumber,
            password,
            registration,
            gender,
            link,
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

        return res.json(user);
    },

};
