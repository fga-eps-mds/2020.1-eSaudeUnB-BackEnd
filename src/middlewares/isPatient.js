const Admin = require('../models/Admin');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    let user = await UserPatient.findOne({ email });
    if (user === null) {
        user = await Psychologist.findOne({ email });
        if (user === null) {
            user = await Admin.findOne({ email });
        }
    }
    try {
        if (user.bond === 'Psychologist' || !user.bond) {
            return res.status(401).json({ error: 'error in credential of access' });
        }
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' }); // test
    }
    return next();
};
