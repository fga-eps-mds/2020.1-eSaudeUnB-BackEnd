const Psychologist = require('../models/Psychologist');

module.exports = {
    async update(req, res) {
        try {
            const { email, weekDay, restrict } = req.body;
            if (weekDay) {
                const psicology = await Psychologist.updateOne(
                    { email },
                    {
                        $set: { weekDay },
                    },
                );
                return res.status(200).json(psicology);
            }
            if (restrict) {
                const psicology = await Psychologist.updateOne(
                    { email },
                    {
                        $set: { restrict },
                    },
                );
                return res.status(200).json(psicology);
            }
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    async index(req, res) {
        try {
            const { email } = req.body;
            const psicology = await Psychologist.findOne({ email });
            return res.status(200).json(psicology.weekDay);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
    async show(req, res) {
        try {
            const { email } = req.body;
            const psychologist = await Psychologist.findOne({ email });
            return res.status(200).json(psychologist.restrict);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
};
