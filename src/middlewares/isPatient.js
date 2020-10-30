const UserPatient = require('../models/UserPatient');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await UserPatient.findOne({ email });

    if(user.bond === "Psychologist" || !user.bond) {
        return res.status(401).json({ error: "fodase" });
    }
    return next();
};