const models = require('../models');

const { Admin } = models;

module.exports = {

    async show(req, res) {
        try {
            const user = await Admin.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (user != null) {
                if (user.password === req.body.password) {
                    return res.status(201).json(user);
                }
                if (user.password !== req.body.password) {
                    return res.status(400).json('Senha Incorreta');
                }
            }

            return res.status(404).json('Usuário não encontrado');
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

};
