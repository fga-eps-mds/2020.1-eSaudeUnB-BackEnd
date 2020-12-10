const generatePassword = require('password-generator');
const Joi = require('joi');
// remove coment when use bcrypt in psychologist
// const bcrypt = require('bcryptjs');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');
const PsychologistEmail = require('../config/Psychologist_email');
const Fgetpass = require('../config/ForgetPassword_email');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: false })
        .required(),

    specialization: Joi.string()
        .required(),

    biography: Joi.string()
        .allow('')
        .min(0)
        .max(300),

    gender: Joi.string()
        .allow('')
        .max(1)
        .required(),

    bond: Joi.string()
        .allow(''),

    phone: Joi.number()
        .allow(''),

    ForgetPassword: Joi.boolean()
        .allow(null)
        .allow(''),

    userImage: Joi.string()
        .allow(''),
}).options({ abortEarly: false });

const schemaUpdatePasswordPsy = Joi.object({
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

});

module.exports = {
    async store(req, res) {
        try {
            const password = generatePassword(8, false);
            const {
                name,
                lastName,
                email,
                specialization,
                biography,
                phone,
                gender,
                bond,
                userImage,
                ForgetPassword,
            } = req.body;

            const psyUser = await Psychologist.findOne({ email });
            const user = await UserPatient.findOne({ email });

            if (psyUser || user) {
                return res.status(200).json(psyUser);
            }

            const { error, value } = schema.validate({
                name,
                lastName,
                email,
                specialization,
                biography,
                phone,
                gender,
                bond,
                userImage,
                ForgetPassword,
            });

            if (error) {
                return res.status(203).json({ value, error });
            }

            // const encriptedPassword = bcrypt.hashSync(password, 8);

            const psychologist = await Psychologist.create({
                name,
                lastName,
                email,
                gender,
                bond,
                password,
                ForgetPassword: false,
                phone,
                specialization,
                biography,
                userImage,
            });

            await PsychologistEmail.PsyEmail(psychologist);
            return res.status(201).json(psychologist);
        } catch (err) {
            return res.status(400).json({ message: err.message }); // test
        }
    },

    async show(req, res) {
        try {
            const { email } = req.params;
            const user = await Psychologist.findOne({ email });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message }); // test
        }
    },

    async index(req, res) {
        try {
            const users = await Psychologist.find();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json({ message: err.message }); // test
        }
    },

    async destroy(req, res) {
        try {
            const { email } = req.params;

            await Psychologist.deleteOne({ email });

            return res.status(200).json('Psychologist Remove');
        } catch (err) {
            return res.status(400).json({ message: err.message }); // test
        }
    },

    async update(req, res) {
        try {
            const {
                name,
                lastName,
                gender,
                bond,
                phone,
                specialization,
                biography,
                ForgetPassword,
                userImage,
            } = req.body;

            const { email } = req.params;
            const user = await Psychologist.findOne({
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
            if (gender) {
                user.gender = gender;
            }
            if (bond) {
                user.bond = bond;
            }
            if (phone) {
                user.phone = phone; // test
            }
            if (specialization) {
                user.specialization = specialization;
            }
            if (biography) {
                user.biography = biography;
            }
            if (userImage) {
                user.userImage = userImage;
            }
            if (ForgetPassword) {
                user.ForgetPassword = ForgetPassword; // test
            }

            const { error, value } = schema.validate({
                name,
                lastName,
                email,
                gender,
                bond,
                phone,
                specialization,
                ForgetPassword,
                biography,
                userImage,
            });

            if (error) {
                return res.status(203).json({ value, error }); // test
            }
            await user.save();
            return res.status(200).json(user);
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao dar o update', err });
        }
    },

    async updatePassword(req, res) {
        try {
            const { oldPassword, password } = req.body;
            const user = await Psychologist.findOne({ email: req.params.email });
            if (user) {
                if (oldPassword === user.password) {
                    // const encriptedPassword = bcrypt.hashSync(password, 8);
                    const { error, value } = schemaUpdatePasswordPsy.validate({
                        password,
                    });
                    if (error) {
                        return res.status(203).json({ value, error });
                    }
                    user.password = password;
                    user.ForgetPassword = false;
                    await user.save();
                    return res.status(200).json({ user });
                }
                return res.status(400).json({ message: 'Senha Incorreta' }); // test
            }
            throw new Error({ err: 'Usuário não encontrado' });
        } catch (err) {
            return res
                .status(500)
                .json({ message: 'falha ao atualizar senha' });
        }
    },

    async ForgetPass(req, res) {
        try {
            const password = generatePassword(8, false);
            const user = await Psychologist.findOne({ email: req.params.email });
            if (user) {
                // const encriptedPassword = bcrypt.hashSync(password, 8);
                user.password = password; // encriptedPassword;
                user.ForgetPassword = true;
                await user.save();
                await Fgetpass.Fgetpassword(user, password);
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
