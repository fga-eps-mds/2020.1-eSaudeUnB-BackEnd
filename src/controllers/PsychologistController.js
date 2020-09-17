const uuid = require('uuid');
const models = require('../models');
const { destroy } = require('./PatientController');

const Psychologist = models.Psychologist;

module.exports = {
    async store(req, res){
        await Psychologist.sync();
        const id = uuid.v4();
        
        const {name, lastName, password, email} = req.body;

        await Psychologist.create({
            id,
            name,
            lastName,
            email,
            password
        });

        return res.status(201).json(req.body);
        
    },

    async index(req, res){
        const users = await Psychologist.findAll();
        
        return res.status(200).json(users);
    },

    async destroy(req, res){
        await Psychologist.destroy({
            where: {
                id: req.params.id,
            },
        });

        return res.status(200).json();
    },
}