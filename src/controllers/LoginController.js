const UserPatient = require('../models/UserPatient');

module.exports = {

    async show(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserPatient.findOne({ email });

            if (user) {
                if (user.password === password) {
                    return res.status(200).json(user);
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
