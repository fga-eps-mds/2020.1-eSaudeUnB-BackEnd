const Psychologist = require('../models/Psychologist');

module.exports = async (req, res, next) => {
    const email = req.userEmail;
    const user = await Psychologist.findOne({ email });

    if(user.bond !== "Psychologist") {
        return res.status(401).json({ error: "fodase" });
    }
    return next();
};