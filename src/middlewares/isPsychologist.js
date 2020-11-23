const Psychologist = require('../models/Psychologist');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await Psychologist.findOne({ email });
    try {
        if (user.bond !== 'Psychologist' || !user.bond) {
            if (user.bond !== 'Nutritionist') {
                if (user.bond !== 'Care worker') {
                    return res.status(401).json({ error: 'you are not a psychologist,Nutritionist or Care worker ' });
                }
            }
        }
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' });
    }
    return next();
};
