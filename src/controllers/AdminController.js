const Admin = require('../models/Admin');

module.exports = {
    async store(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await Admin.findOne({ email });

            if (user) {
                return res.status(200).json('Usuário já cadastrado');
            }

            const adminUser = await Admin.create({
                name,
                email,
                password,
            });

            return res.status(201).json(adminUser);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};
