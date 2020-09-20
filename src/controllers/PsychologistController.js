const uuid = require('uuid');
const generatePassword = require('password-generator');
const models = require('../models');

const { Psychologist } = models;

module.exports = {
    async store(req, res) {
        await Psychologist.sync();
        const id = uuid.v4();
        const password = generatePassword(8, false);
        const {
            name, lastName, email, specialization, bibliography, gender, bond,
        } = req.body;

        await Psychologist.create({
            id,
            name,
            lastName,
            email,
            gender,
            bond,
            password,
            specialization,
            bibliography,
        });

        return res.status(201).json(req.body);
    },

    async index(req, res) {
        const users = await Psychologist.findAll();

        return res.status(200).json(users);
    },

    async destroy(req, res) {
        await Psychologist.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json();
    },
};
