const { assert } = require('joi');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const UserPatient = require('../models/UserPatient');

module.exports = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid Token' });

        req.userEmail = decoded.email;
        const { email } = decoded.email;
        const users = UserPatient.findOne('www@email.com');
        if (users.bond === 'Psychologist' || users.bond !== 'patient') {
            console.log('testou e saiu 401');
            console.log(users.paths);
            return res.status(401).json({ errror: 'This is a patient route, unauthorized' });
        }
        return res.status(200).json({ ok: true });
    });
};
