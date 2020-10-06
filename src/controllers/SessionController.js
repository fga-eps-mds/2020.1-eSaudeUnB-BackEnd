const Session = require('../models/Session');
const UserPatient = require('../models/UserPatient');

module.exports = {

    async store(req, res) {
        try {
            const { email } = req.body;

            const {
                mainComplaint,
                secondaryComplaint,
                complaintEvolution,
                professional,
            } = req.body;

            const user = await UserPatient.findOne({ email });

            if (user) {
                const session = await Session.create({
                    mainComplaint,
                    secondaryComplaint,
                    complaintEvolution,
                    professional,
                });
                const updatedSessions = user.sessions;
                updatedSessions.push(session.id);
                await UserPatient.updateOne({ email }, { $set: { sessions: updatedSessions } });
                return res.status(201).json(user);
            }

            return res.status(404).json('Usuário não encontrado');
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const { email } = req.params;

            const user = await UserPatient.findOne({ email });
            if (user) {
                const sessionsIds = user.sessions;
                const sessions = await Session.find({
                    _id: {
                        $in: sessionsIds,
                    },
                });
                return res.status(200).json(sessions);
            }
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { email } = req.params;

            const user = await UserPatient.findOne({ email });

            if (user) {
                const sessionsIds = await user.sessions.slice(-4);
                const sessions = await Session.find({
                    _id: {
                        $in: sessionsIds,
                    },
                });
                return res.status(200).json(sessions);
            }

            return res.status(404).json('Usuário não encontrado');
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const {
                id, mainComplaint, secondaryComplaint, complaintEvolution, professional,
            } = req.body;

            await Session.findByidAndUpdate(id, {
                mainComplaint,
                secondaryComplaint,
                professional,
                complaintEvolution,
            });

            const session = await Session.findById(id);

            return res.status(200).json(session);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.params;

            const user = await UserPatient.findOne({ email });

            const { id } = req.body;

            if (user) {
                const session = await Session.findById(id);
                await Session.findByIdAndRemove(id);

                const index = user.sessions.indexOf(id);
                user.sessions.splice(index, 1);
                user.save();

                return res.status(200).json(session);
            }
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

};
