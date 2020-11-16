const Psychologist = require('../models/Psychologist');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await Psychologist.findOne({ email });
    try {
        if (user.bond !== 'Psychologist' || !user.bond) {
            return res.status(401).json({ error: 'you are not a psychologist' });
        }
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' });
    }
    return next();
};
