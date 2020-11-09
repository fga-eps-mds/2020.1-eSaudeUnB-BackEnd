<<<<<<< HEAD
const WaitingList = require('../models/WaitingList');

module.exports = {
    async store(req, res) {
        try {
            const {
                email,
                emailPatient,
                namePatient,
            } = req.body;
=======
const { update } = require('../models/WaitingList');
const WaitingList = require('../models/WaitingList');
const { show } = require('./PatientController');

module.exports = {
    async store(req,res){
        try{
            const{
                email,
                emailPatient,
                namePatient
            } = req.body
>>>>>>> 1c5e3fa... feat: add waitingList structure

            const waitingList = await WaitingList.create({
                email,
                emailPatient,
                namePatient,
            });

            return res.status(201).json(waitingList);
<<<<<<< HEAD
        } catch (err) {
=======

        }catch(err){
>>>>>>> 1c5e3fa... feat: add waitingList structure
            return res.status(400).json({ error: err.message });
        }
    },

<<<<<<< HEAD
    async index(req, res) {
        try {
            const { email } = req.params;

            const waitingLists = await WaitingList.find({
                email,
            }).sort({ updatedAt: 1 }).exec();

            return res.status(200).json(waitingLists);
        } catch (err) {
=======
    async index(req,res){
        try{
            const email = req.params

            const waitingLists = await WaitingList.find({
                email: email
            }).exec()

            return res.status(200).json(waitingLists);
        }catch(err){
>>>>>>> 1c5e3fa... feat: add waitingList structure
            return res.status(400).json({ error: err.message });
        }
    },

<<<<<<< HEAD
    async destroy(req, res) {
        try {
            const { email } = req.params;

            await WaitingList.deleteOne({ emailPatient: email });
=======
    async destroy(req,res){
        try {
            const { email } = req.params;

            await WaitingList.deleteOne({ email });
>>>>>>> 1c5e3fa... feat: add waitingList structure

            return res.status(200).json();
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },
<<<<<<< HEAD
};
=======

    async update(req,res){
        try{
            const {email, patients} = req.body

            const waitingList = await WaitingList.findOne({
                email,
            }).exec();

            waitingList.patients = patients

            await waitingList.save();
            return res.status(200).json(waitingList);
        }catch(err){
            return res.status(500).json({ message: 'falha ao dar o update' });
        }
    }
}
>>>>>>> 1c5e3fa... feat: add waitingList structure
