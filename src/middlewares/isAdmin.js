const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await Admin.findOne({ email });

    if(user.bond) {
        return res.status(401).json({ error: "fodase" });
    }
    return next();
};