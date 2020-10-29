const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(authHeader, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json({ error: 'Invalid Token' });

        req.userEmail = decoded.email;
        return next();
    });

}