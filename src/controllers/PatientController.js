const models = require('../models');
const UserPatient = models.Patient;
const uuid = require('uuid');

module.exports = {
    
    async store(req, res) {
    //caso haja alguma alteração na tabela, deverá ser usado sync({alter: true});
    
    
    try {await UserPatient.sync({});
    req.body._id = uuid.v4();
    const user = await UserPatient.create(req.body);
    await user.save();

    return res.json(user);
    }
    catch(err){
        return res.status(401).json({error: err.message});
    }


},

    async show(req, res) {
        try {
            const user = await UserPatient.findAll({
                where: {
                    _id: req.params._id
                }
            });

            return res.json(user);
        } catch(err) {
            return res.status(500).json({error: err.message});
        }
    },

    async index(req, res) {
        try {
            const users = await UserPatient.findAll();
            return res.json(users);
        } catch(err) {
            return res.status(204).json({message: "nenhum usuario encontrado"});
        }
    },

    async destroy(req, res){
        await UserPatient.destroy({
            where:{
                _id: req.params._id,
            }
        });

        return res.json();
    },

    async update(req, res){
              
        await UserPatient.update({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            registration: req.body.registration,
            gender: req.body.gender,
            link: req.body.link,
        }, {
            where:{
                _id: req.params._id
            }
        });


        const user = await UserPatient.findAll({
            where: {
                _id: req.params._id
            }
        });
        
        return res.json(user);
    }

};
