const models = require('../models');

const UserPatient = models.Patient;

module.exports = {

    async show(req, res){
        
        try {
            const user = await UserPatient.findOne({
            where: {
                email: req.body.email
            }
        });

        if(user.password === req.body.password){
            return res.status(201).json(user);
        }
        else if (user.password != req.body.password){
            return res.status(400).json('Senha Incorreta');
        }
        
        
        return res.status(404).json('Usuário não encontrado');
        } catch(err) {
            return res.status(500).json({error: err.message});
        }
    }

}
