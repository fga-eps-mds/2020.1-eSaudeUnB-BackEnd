const Joi = require('joi');
const bcrypt = require('bcryptjs');
const generatePassword = require('password-generator');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');
const PatientEmailUtil = require('../config/Patient_email');
const FgetpassUtil = require('../config/ForgetPassword_email');

const schemaCreate = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    ForgetPassword: Joi.boolean()
        .allow(null)
        .allow(''),

    phone: Joi.number().allow(''),

    gender: Joi.string().allow(''),

    civilStatus: Joi.string().allow('').allow(null),

    unbRegistration: Joi.string()
        .pattern(new RegExp('^[0-9]+$'))
        .min(8)
        .max(10)
        .allow(''),

    bond: Joi.string().allow(''),

    userImage: Joi.string().allow('').allow(null),

    race: Joi.string().allow('').allow(null),

    sexualOrientation: Joi.string().allow('').allow(null),

    children: Joi.string().allow('').allow(null),

    emergencyContactName: Joi.string().allow('').allow(null),

    emergencyContactPhone: Joi.number().allow('').allow(null),

    emergencyContactBond: Joi.string().allow('').allow(null),

    motherName: Joi.string().allow('').allow(null),

    fatherName: Joi.string().allow('').allow(null),

    affiliationPhone: Joi.number().allow('').allow(null),

    socialPrograms: Joi.string().allow('').allow(null),

    studentHouseResidence: Joi.string().allow('').allow(null),

    psychiatricFollowUp: Joi.string().allow('').allow(null),

    medication: Joi.string().allow('').allow(null),

    mainComplaint: Joi.string().allow('').allow(null),

}).options({ abortEarly: false });

const schemaAllRequired = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),

    phone: Joi.number().required(),

    gender: Joi.string().required(),

    civilStatus: Joi.string().required(),

    unbRegistration: Joi.string().pattern(new RegExp('^[0-9]+$')).min(8).max(10)
        .required(),

    bond: Joi.string().required(),

    userImage: Joi.string().allow(''),

    race: Joi.string().required(),

    sexualOrientation: Joi.string().required(),

    children: Joi.string().required(),

    emergencyContactName: Joi.string().min(3).required(),

    emergencyContactPhone: Joi.number().required(),

    emergencyContactBond: Joi.string().min(3).required(),

    motherName: Joi.string().min(3).required(),

    fatherName: Joi.string().min(3).required(),

    affiliationPhone: Joi.number().required(),

    socialPrograms: Joi.string().required(),

    studentHouseResidence: Joi.string().required(),

    psychiatricFollowUp: Joi.string().required(),

    medication: Joi.string().required(),

    mainComplaint: Joi.string().required(),

});

const schemaUpdate = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),

    phone: Joi.number().allow('').allow(null),

    gender: Joi.string().allow('').allow(null),

    ForgetPassword: Joi.boolean()
        .allow(null)
        .allow(''),

    civilStatus: Joi.string().allow('').allow(null),

    unbRegistration: Joi.string().pattern(new RegExp('^[0-9]+$')).min(8).max(10)
        .allow('').allow(null),

    bond: Joi.string().allow('').allow(null),

    userImage: Joi.string().allow('').allow(null),

    race: Joi.string().allow('').allow(null),

    sexualOrientation: Joi.string().allow('').allow(null),

    children: Joi.string().allow('').allow(null),

    emergencyContactName: Joi.string().min(3).allow('').allow(null),

    emergencyContactPhone: Joi.number().allow('').allow(null),

    emergencyContactBond: Joi.string().min(3).allow('').allow(null),

    motherName: Joi.string().min(3).allow('').allow(null),

    fatherName: Joi.string().min(3).allow('').allow(null),

    affiliationPhone: Joi.number().allow('').allow(null),

    socialPrograms: Joi.string().allow('').allow(null),

    studentHouseResidence: Joi.string().allow('').allow(null),

    psychiatricFollowUp: Joi.string().allow('').allow(null),

    medication: Joi.string().allow('').allow(null),

    mainComplaint: Joi.string().allow('').allow(null),

}).options({ abortEarly: false });

const schemaUpdatePassword = Joi.object({
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

module.exports = {
    async store(req, res) {
        try {
            const {
                name,
                lastName,
                email,
                phone,
                password,
                ForgetPassword,
                gender,
                civilStatus,
                unbRegistration,
                bond,
                userImage,
                race,
                sexualOrientation,
                children,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactBond,
                motherName,
                fatherName,
                affiliationPhone,
                socialPrograms,
                studentHouseResidence,
                psychiatricFollowUp,
                medication,
                mainComplaint,
            } = req.body;

            const user = await UserPatient.findOne({ email });
            const psyUser = await Psychologist.findOne({ email });

            if (user || psyUser) {
                return res
                    .status(409)
                    .json({ message: 'Usuário já cadastrado' });
            }

            const { error, value } = schemaCreate.validate({
                name,
                lastName,
                email,
                phone,
                password,
                ForgetPassword,
                gender,
                civilStatus,
                unbRegistration,
                bond,
                userImage,
                race,
                sexualOrientation,
                children,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactBond,
                motherName,
                fatherName,
                affiliationPhone,
                socialPrograms,
                studentHouseResidence,
                psychiatricFollowUp,
                medication,
                mainComplaint,
            });

            if (error) {
                return res.status(203).json({ value, error });
            }

            const encriptedPassword = bcrypt.hashSync(password, 8);

            const patient = await UserPatient.create({
                name,
                lastName,
                email,
                phone,
                password: encriptedPassword,
                ForgetPassword: false,
                gender,
                civilStatus,
                unbRegistration,
                bond,
                userImage,
                race,
                sexualOrientation,
                children,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactBond,
                motherName,
                fatherName,
                affiliationPhone,
                socialPrograms,
                studentHouseResidence,
                psychiatricFollowUp,
                medication,
                mainComplaint,
            });

            await PatientEmailUtil.PatientEmail(patient);

            return res.status(201).json(patient);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const { email } = req.params;
            const user = await UserPatient.findOne({ email });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async index(req, res) {
        try {
            const users = await UserPatient.find();

            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.body;

            await UserPatient.deleteOne({ email });

            return res
                .status(200)
                .json({ message: 'Usuário deletado com sucesso!' });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    async update(req, res) {
        try {
            const {
                name,
                lastName,
                phone,
                unbRegistration,
                ForgetPassword,
                gender,
                bond,
                civilStatus,
                religion,
                userImage,
                race,
                sexualOrientation,
                children,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactBond,
                motherName,
                fatherName,
                affiliationPhone,
                socialPrograms,
                studentHouseResidence,
                psychiatricFollowUp,
                medication,
                mainComplaint,
            } = req.body;

            const { email } = req.params;

            const { error: error1, value: value1 } = schemaUpdate.validate({
                name,
                lastName,
                email,
                phone,
                gender,
                unbRegistration,
                ForgetPassword,
                bond,
                civilStatus,
                // religion,
                userImage,
                race,
                sexualOrientation,
                children,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactBond,
                motherName,
                fatherName,
                affiliationPhone,
                socialPrograms,
                studentHouseResidence,
                psychiatricFollowUp,
                medication,
                mainComplaint,
            });

            if (error1) {
                return res.status(203).json({ value1, error1 });
            }

            const { error: error2, value: value2 } = schemaAllRequired.validate({
                name,
                lastName,
                email,
                phone,
                gender,
                unbRegistration,
                bond,
                civilStatus,
                // religion,
                userImage,
                race,
                sexualOrientation,
                children,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactBond,
                motherName,
                fatherName,
                affiliationPhone,
                socialPrograms,
                studentHouseResidence,
                psychiatricFollowUp,
                medication,
                mainComplaint,
            });

            const user = await UserPatient.findOne({
                email,
            }).exec();

            if (!error2) {
                user.canSchedule = true;
            }

            if (name) {
                user.name = name;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (email) {
                user.email = email;
            }
            if (phone) {
                user.phone = phone;
            }
            if (unbRegistration) {
                user.unbRegistration = unbRegistration;
            }
            if (gender) {
                user.gender = gender;
            }
            if (bond) {
                user.bond = bond;
            }
            if (civilStatus) {
                user.civilStatus = civilStatus;
            }
            if (religion) {
                user.religion = religion;
            }
            if (userImage) {
                user.userImage = userImage;
            }
            if (race) {
                user.race = race;
            }
            if (sexualOrientation) {
                user.sexualOrientation = sexualOrientation;
            }
            if (children) {
                user.children = children;
            }
            if (emergencyContactName) {
                user.emergencyContactName = emergencyContactName;
            }
            if (emergencyContactPhone) {
                user.emergencyContactPhone = emergencyContactPhone;
            }
            if (emergencyContactBond) {
                user.emergencyContactBond = emergencyContactBond;
            }
            if (motherName) {
                user.motherName = motherName;
            }
            if (fatherName) {
                user.fatherName = fatherName;
            }
            if (affiliationPhone) {
                user.affiliationPhone = affiliationPhone;
            }
            if (socialPrograms) {
                user.socialPrograms = socialPrograms;
            }
            if (studentHouseResidence) {
                user.studentHouseResidence = studentHouseResidence;
            }
            if (psychiatricFollowUp) {
                user.psychiatricFollowUp = psychiatricFollowUp;
            }
            if (medication) {
                user.medication = medication;
            }
            if (mainComplaint) {
                user.mainComplaint = mainComplaint;
            }

            if (ForgetPassword) user.ForgetPassword = ForgetPassword;

            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'falha ao dar o update' });
        }
    },

    async updateSchedule(req, res) {
        try {
            const { appointments } = req.body;

            const user = await UserPatient.findOne({
                email: req.params.email,
            });

            user.appointments = appointments;

            await user.save();

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'falha ao dar o update' });
        }
    },

    async updatePassword(req, res) {
        try {
            const { oldPassword, password } = req.body;
            const user = await UserPatient.findOne({
                email: req.params.email,
            }).select('+password');
            if (user) {
                if (await bcrypt.compare(oldPassword, user.password)) {
                    const { error, value } = schemaUpdatePassword.validate({
                        password,
                    });
                    if (error) {
                        return res.status(203).json({ value, error });
                    }
                    const encriptedPassword = bcrypt.hashSync(password, 8);
                    user.password = encriptedPassword;
                    user.ForgetPassword = false;
                    await user.save();
                    return res.status(200).json({ user });
                }
                return res.status(400).json({ message: 'Senha Incorreta' });
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao dar o update da senha' });
        }
    },

    async ForgetPass(req, res) {
        try {
            const password = generatePassword(8, false);
            const user = await UserPatient.findOne({
                email: req.params.email,
            });
            if (user) {
                const encriptedPassword = bcrypt.hashSync(password, 8);
                user.password = encriptedPassword;
                user.ForgetPassword = true;
                await user.save();
                await FgetpassUtil.Fgetpassword(user, password);
                return res.status(200).json({ user });
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao dar o gerar nova senha' });
        }
    },
};
