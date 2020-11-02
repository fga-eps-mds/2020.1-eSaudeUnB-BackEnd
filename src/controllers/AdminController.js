const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const authConfig = require('../config/auth.config');

module.exports = {
    async store(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await Admin.findOne({ email });

            if (user) {
                return res.status(409).json('Usuário já cadastrado');
            }

            const encriptedPassword = bcrypt.hashSync(password, 8);

            const adminUser = await Admin.create({
                name,
                email,
                password: encriptedPassword,
            });

            return res.status(201).json(adminUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async show(req, res) {
        try {
            const { email, password } = req.body;
            const user = await Admin.findOne({ email }).select('+password');

            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({ email: user.email }, authConfig.secret, {
                        expiresIn: 86400,
                    });

                    return res.status(200).json({
                        user,
                        accessToken: token,
                    });
                }
                if (await !bcrypt.compare(password, user.password)) {
                    return res.status(400).json('Senha Incorreta');
                }
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res.status(404).json(err);
        }
    },
};
