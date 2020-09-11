const models = require('../models');
const UserPatient = models.Patient;

module.exports = {
    
    async store(req, res) {
    //Não funcionava se não tivesse await UserPatient.sync({force: true});
    //No entanto com essa função a tabela sempre resetava, não podendo salvar mais de 1 User
    //Depois de executar uma vez e retirar a função, funciona normalmente, mas talvez dê problema no futuro
        const user = await UserPatient.create(req.body);

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
