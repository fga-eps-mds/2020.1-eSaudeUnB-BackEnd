const Joi = require('joi');
const bcrypt = require('bcryptjs');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');
const transporter = require('../config/email.config');

const schemaCreate = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    phone: Joi.number().allow(''),

    gender: Joi.string().max(1).allow(''),

    civilStatus: Joi.string().allow('').allow(null),

    unbRegistration: Joi.string()
        .pattern(new RegExp('^[0-9]+$'))
        .min(8)
        .max(10)
        .allow(''),

    bond: Joi.string().allow(''),

    userImage: Joi.string().allow(''),

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

const schemaUpdate = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),

    phone: Joi.number().allow(''),

    gender: Joi.string().max(1).allow(''),

    religion: Joi.string().allow('').allow(null),

    civilStatus: Joi.string().allow('').allow(null),

    unbRegistration: Joi.string()
        .pattern(new RegExp('^[0-9]+$'))
        .min(8)
        .max(10)
        .allow(''),

    bond: Joi.string().allow(''),

    userImage: Joi.string().allow(''),

    race: Joi.string().allow(''),

    sexualOrientation: Joi.string().allow(''),

    children: Joi.string().allow('').allow(null),

    emergencyContactName: Joi.string().min(3).allow(''),

    emergencyContactPhone: Joi.number().allow(''),

    emergencyContactBond: Joi.string().min(3).allow(''),

    motherName: Joi.string().min(3).allow(''),

    fatherName: Joi.string().min(3).allow(''),

    affiliationPhone: Joi.number().allow(''),

    socialPrograms: Joi.string().allow('').allow(null),

    studentHouseResidence: Joi.string().allow('').allow(null),

    psychiatricFollowUp: Joi.string().allow('').allow(null),

    medication: Joi.string().allow('').allow(null),

    mainComplaint: Joi.string().allow('').allow(null),

}).options({ abortEarly: false });

module.exports = {
    async store(req, res) {
        try {
            const {
                name,
                lastName,
                email,
                phone,
                password,
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

            await transporter.sendMail({
                from: '"e-saude UnB" <esaudtest@gmail.com>',
                to: email,
                subject: 'Bem vindo ao E-saudeUNB',
                html: `<body style="justify-content: flex-start; columns: auto; align-items: center">
                    <img
                        src="https://svgshare.com/i/RUt.svg"
                        alt="Logo"
                        style="background-color: #0459ae; width: 500px; height: 50px"
                    />
                    <h1>Olá ${name} ,bem vindo ao E-SaúdeUNB</h1>
                    <p>
                        Seja bem vindo(a) à plataforma E-Saúde UNB. Seu email foi cadastrado
                        como Paciente.
                    </p>
                    <p>clique no Botão abaixo para acessar a plataforma</p>
                    <a
                        href="http://localhost:3000"
                        style="
                    background: none;
                    border: none;
                    font: 700 1rem Poppins;
                    color: #0459ae;
                    cursor: pointer;
                    "
                    >Clique Aqui</a
                    >
                </body>`
                ,
            });

            const encriptedPassword = bcrypt.hashSync(password, 8);

            const patient = await UserPatient.create({
                name,
                lastName,
                email,
                phone,
                password: encriptedPassword,
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

            const { error, value } = schemaUpdate.validate({
                name,
                lastName,
                email,
                phone,
                gender,
                unbRegistration,
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
            });

            if (error) {
                return res.status(203).json({ value, error });
            }

            const user = await UserPatient.findOne({
                email,
            }).exec();

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
                    user.password = password;
                    await user.save();
                    return res.status(200).json({
                        user,
                    });
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
};
