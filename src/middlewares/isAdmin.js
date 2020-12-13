const Admin = require('../models/Admin');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    try {
        let user = await Admin.findOne({ email });
        if (user === null) {
            user = await UserPatient.findOne({ email });
            if (user === null) {
                user = await Psychologist.findOne({ email });
            }
        }
        if (user.bond) {
            return res.status(401).json({ error: 'you are not admin user' }); // test
        }
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' }); // test
    }
    return next();
};
