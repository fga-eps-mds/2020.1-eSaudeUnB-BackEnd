const Session = require('../models/Session');

module.exports = {

    async store(req, res) {
        try {
            const {
                mainComplaint, secondaryComplaint, complaintEvolution, professional
            } = req.body;

            const session = await Session.create({
                mainComplaint,
                secondaryComplaint,
                complaintEvolution,
                professional
            });

            return res.status(201).json(session);

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const sessions = await Session.find();

            return res.status(200).json(sessions);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {

            const sessions = await Session.find().sort({$natural:-1}).limit(4);

            return res.status(200).json(sessions);

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const { id, mainComplaint, secondaryComplaint, complaintEvolution, professional } = req.body;

            await Session.findByIdAndUpdate( id , {
                mainComplaint,
                secondaryComplaint,
                professional,
                complaintEvolution
            });

            const session = await Session.findById({ id });

            return res.status(200).json(session);

        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const id = req.body.id;

            const session = await Session.findByIdAndDelete(id);

            await Session.deleteOne({ id });

            return res.status(200).json(session);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    
};