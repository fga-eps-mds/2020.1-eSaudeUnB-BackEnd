const uuid = require('uuid');
const models = require('../models');

const UserPatient = models.Patient;

module.exports = {

    async store(req, res) {
        try {

            const {
                name, lastName, email, password
            } = req.body;

            await UserPatient.create({
                name,
                lastName,
                email,
                password,

            });

            return res.status(201).json(req.body);
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const user = await UserPatient.findOne({
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
            name, lastName, email, phone, unbRegistration, gender, bond, civilStatus, religion
        } = req.body;

        await UserPatient.update({
            name,
            lastName,
            email,
            phone,
            gender,
            unbRegistration,
            bond,
            civilStatus,
            religion
        }, {
            where: {
                id: req.params.id,
            },
        });

        const user = await UserPatient.findOne({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json(user);
    },

    async updatePassword(req,res) {
        const{
            password
        } = req.body

        await UserPatient.updateOne({email: req.params.email}, {$set: { password: password}})

        const user = await UserPatient.findOne({
            where: {
                email: req.params.email,
            },
        });

        return res.status(200).json(user);
    }

};