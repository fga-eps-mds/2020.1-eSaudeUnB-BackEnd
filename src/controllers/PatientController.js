const models = require('../models');
const UserPatient = models.Patient;
const uuid = require('uuid');

module.exports = {
    
    async store(req, res) {
    //caso haja alguma alteração na tabela, deverá ser usado sync({alter: true});
    
    
    await UserPatient.sync();
    req.body._id = uuid.v4();
    const user = await UserPatient.create(req.body);
    await user.save();

    return res.json(user);
    },

    async show(req, res) {
        const user = await UserPatient.findAll({
            where: {
                id: req.params.id
            }
        });

        return res.json(user);
    },

    async index(req, res) {
        const user = await UserPatient.findAll();

        return res.json(user);
    },

    async destroy(req, res){
        await UserPatient.destroy({
            where:{
                id: req.params.id,
            }
        });

        return res.json({message: "User Deleted"});
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
                id: req.params.id
            }
        });

        return res.json({message: "Updated Successfully"});
    }

};
