const uuid = require('uuid');
const UserPatient = require('../models/UserPatient');

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
        try{
        const {
            name, lastName, email, phone, unbRegistration, gender, bond, civilStatus, religion
        } = req.body;

        const user = await UserPatient.findOne({
           email: req.params.email
        }).exec();

        if(name){
           user.name = name; 
        }
        if(lastName){
            user.lastName = lastName; 
         }
         if(email){
            user.email = email; 
         }
         if(phone){
            user.phone = phone; 
         }
         if(unbRegistration){
            user.unbRegistration = unbRegistration; 
         }
         if(gender){
            user.gender = gender; 
         }
         if(bond){
            user.bond = bond; 
         }
         if(civilStatus){
            user.civilStatus = civilStatus; 
         }
         if(religion){
            user.religion = religion; 
         }
         await user.save();
        return res.status(200).json(user);
        }catch(err){
            return res.status(500).json({message: "falha ao dar o update"})
        }
    },

    async updatePassword(req,res) {
        try{
        const{
            password
        } = req.body

        const user = await UserPatient.findOne({
            email: req.params.email
         }).exec();

        user.password = password

        await user.save();
        return res.status(200).json(user);
        }catch(err){
            return res.status(500).json({message: "falha ao dar o update da senha"})
        }
    }

};