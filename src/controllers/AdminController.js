const uuid = require('uuid');
const models = require('../models');

const Admin = models.Admin;

module.exports = {
    async store(req, res){
        await Admin.sync();
        const id = uuid.v4();

        const {name, email, password} = req.body;

        await Admin.create({
            id,
            name,
            email,
            password
        });

        return res.status(201).json(req.body);
    }
}