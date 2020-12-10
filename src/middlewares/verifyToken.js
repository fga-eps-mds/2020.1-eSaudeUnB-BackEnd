/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' }); // test
        }

        jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Invalid Token' });
            req.userEmail = decoded.email;
            return next();
        });
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' });
    }
};
