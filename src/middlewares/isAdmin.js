const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await Admin.findOne({ email });
    try {
        if (user.bond) {
            return res.status(401).json({ error: 'you are not admin user' });
        }
    } catch (err) {
        return res.status(401).json({ error: 'error in verify you credential of access' });
    }
    return next();
};
