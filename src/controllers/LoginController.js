const jwt = require('jsonwebtoken');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');

const authConfig = require('../config/auth.config');

module.exports = {
    async showUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserPatient.findOne({ email });

            if (user) {
                if (user.password === password) {
                    const token = jwt.sign(
                        { email: user.email },
                        authConfig.secret,
                        {
                            expiresIn: 86400,
                        },
                    );

                    return res.status(200).json({
                        user,
                        accessToken: token,
                    });
                }
                return res.status(400).json({ message: 'Senha Incorreta' });
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res.status(404).json(err);
        }
    },

    async showPsy(req, res) {
        try {
            const { email, password } = req.body;

            const user = await Psychologist.findOne({ email });

            if (user) {
                if (user.password === password) {
                    const token = jwt.sign(
                        { email: user.email },
                        authConfig.secret,
                        {
                            expiresIn: 86400,
                        },
                    );

                    return res.status(200).json({
                        user,
                        accessToken: token,
                    });
                }
                return res.status(400).json({ message: 'Senha Incorreta' });
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res.status(404).json(err);
        }
    },
};
