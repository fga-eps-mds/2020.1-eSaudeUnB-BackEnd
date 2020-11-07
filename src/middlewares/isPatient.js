const UserPatient = require('../models/UserPatient');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await UserPatient.findOne({ email });
    try {
        if (user.bond === 'Psychologist' || !user.bond) {
            return res.status(401).json({ error: 'error in credential of access' });
        }
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' });
    }
    return next();
};
